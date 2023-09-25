import http from "node:http";

function doOnRequest(request, response) {
  response.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
  response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  response.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization"
  );
  console.log("we got a request!");
  response.writeHead(200, { "Content-Type": "text/html" });
  setTimeout(() => {
    response.end("DANCING");
  }, 5000);
}

const server = http.createServer(doOnRequest);

server.listen(3002);
