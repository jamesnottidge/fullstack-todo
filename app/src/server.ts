import * as http from "node:http";
import { IncomingMessage, ServerResponse } from "http";
import { newTask, editTask } from "./tasks";
import { Task } from "./types";

function isTask(data: any): data is Task {
  // Implement your type checking logic here
  // For example, check if the required properties exist
  return (
    typeof data === "object" &&
    typeof data.task === "string" &&
    typeof data.completed === "boolean" &&
    typeof data.id === "number"
  );
}

function doOnRequest(request: IncomingMessage, response: ServerResponse) {
  response.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
  response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  response.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization"
  );
  console.log("we got a request!");
  const { method, url } = request;
  if (method === "POST" && url === "/task") {
    let body: any = [];
    request
      .on("data", (chunk) => {
        body.push(chunk);
        console.log("body", body);
      })
      .on("end", async () => {
        body = JSON.parse(body);
        console.log("me", body);
        try {
          const jsonData = body;
          if (isTask(jsonData)) {
            // The parsed JSON is valid and matches the Task type
            const sendBack = await newTask(jsonData);
            response.writeHead(200, { "Content-Type": "text/html" });
            response.end(JSON.stringify(sendBack));
          } else {
            // The parsed JSON is not a valid Task

            response.statusCode = 403;
            response.statusMessage = "Not a Valid Task";
            response.end();
          }
        } catch (error) {
          // Handle JSON parsing errors here
          console.log(error);
          response.statusCode = 400;
          response.statusMessage = "Invalid JSON";
          response.end();
        }
      });
  } 
  else if(method==="PUT" && url==="/task"){
    let body: any = [];
   request
      .on("data", (chunker) => {
        body.push(chunker);
        console.log("body", body);
      })
      .on("end", async () => {
        body = JSON.parse(body);
        console.log("me", body);
   try {
     const jsonData = body;
     if (isTask(jsonData)) {
       // The parsed JSON is valid and matches the Task type
       const sendBack = await editTask(jsonData);
       response.writeHead(200, { "Content-Type": "text/html" });
       response.end(JSON.stringify(sendBack));
     } else {
       // The parsed JSON is not a valid Task
       response.statusCode = 403;
       response.statusMessage = "Not a Valid Task";
       response.end();
     }
   } catch (error) {
     // Handle JSON parsing errors here
     console.log(error);
     response.statusCode = 400;
     response.statusMessage = "Invalid JSON";
     response.end();
   }
    } );

  }
  else {
    setTimeout(() => {
      response.end("DANCING");
    }, 5000);
  }
}

const server = http.createServer(doOnRequest);

server.listen(3002);
