const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = process.env.PORT || 3000;
const publicDir = path.join(__dirname, "..", "public");

let mensagens = [
  {
    id: 1,
    nome: "Exemplo inicial",
    vaga: "Vaga A01",
    mensagem: "Reserva cadastrada para demonstrar o GET /mensagens.",
    dataCriacao: new Date().toISOString()
  }
];

function sendJson(response, statusCode, data) {
  response.writeHead(statusCode, {
    "Content-Type": "application/json; charset=utf-8",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type"
  });
  response.end(JSON.stringify(data, null, 2));
}

function sendFile(response, filePath) {
  const extension = path.extname(filePath).toLowerCase();
  const contentTypes = {
    ".html": "text/html; charset=utf-8",
    ".css": "text/css; charset=utf-8",
    ".js": "application/javascript; charset=utf-8"
  };

  fs.readFile(filePath, (error, content) => {
    if (error) {
      sendJson(response, 404, { erro: "Arquivo nao encontrado." });
      return;
    }

    response.writeHead(200, {
      "Content-Type": contentTypes[extension] || "text/plain; charset=utf-8"
    });
    response.end(content);
  });
}

function readRequestBody(request) {
  return new Promise((resolve, reject) => {
    let body = "";

    request.on("data", (chunk) => {
      body += chunk;

      if (body.length > 1_000_000) {
        request.destroy();
        reject(new Error("Corpo da requisicao muito grande."));
      }
    });

    request.on("end", () => resolve(body));
    request.on("error", reject);
  });
}

async function handleMensagens(request, response) {
  if (request.method === "OPTIONS") {
    sendJson(response, 200, {});
    return;
  }

  if (request.method === "GET") {
    sendJson(response, 200, {
      total: mensagens.length,
      mensagens
    });
    return;
  }

  if (request.method === "POST") {
    try {
      const body = await readRequestBody(request);
      const data = JSON.parse(body || "{}");

      if (!data.nome || !data.vaga || !data.mensagem) {
        sendJson(response, 400, {
          erro: "Informe nome, vaga e mensagem para cadastrar a reserva."
        });
        return;
      }

      const novaMensagem = {
        id: mensagens.length + 1,
        nome: String(data.nome).trim(),
        vaga: String(data.vaga).trim(),
        mensagem: String(data.mensagem).trim(),
        dataCriacao: new Date().toISOString()
      };

      mensagens.push(novaMensagem);

      sendJson(response, 201, {
        mensagem: "Reserva cadastrada com sucesso.",
        dados: novaMensagem
      });
    } catch (error) {
      sendJson(response, 400, {
        erro: "JSON invalido ou requisicao mal formada."
      });
    }

    return;
  }

  sendJson(response, 405, { erro: "Metodo nao permitido." });
}

function handleStaticFiles(request, response) {
  const requestedPath = request.url === "/" ? "/index.html" : request.url;
  const safePath = path.normalize(requestedPath).replace(/^(\.\.[/\\])+/, "");
  const filePath = path.join(publicDir, safePath);

  if (!filePath.startsWith(publicDir)) {
    sendJson(response, 403, { erro: "Acesso negado." });
    return;
  }

  sendFile(response, filePath);
}

const server = http.createServer((request, response) => {
  const url = new URL(request.url, `http://${request.headers.host}`);

  if (url.pathname === "/mensagens") {
    handleMensagens(request, response);
    return;
  }

  if (url.pathname === "/status") {
    sendJson(response, 200, {
      sistema: "Sistema de Reserva de Vagas",
      status: "online"
    });
    return;
  }

  handleStaticFiles({ ...request, url: url.pathname }, response);
});

server.listen(PORT, () => {
  console.log(`Servidor iniciado em http://localhost:${PORT}`);
  console.log("API REST disponivel em GET/POST http://localhost:3000/mensagens");
});
