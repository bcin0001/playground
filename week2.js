//impporting built in packages http and fs, and assigning them to variables
let http = require("http");
let fs = require("fs");

//using the http package, create a server: the function takes in two params: request and response
http.createServer(function (request, response) {
    //printing a strng statement to the console, including the requested url
    console.log("REQUEST ", request.url);
    let filePath = "." + request.url;
    if (filePath === "./") {
      filePath = "./index.html";
    }
    fs.readFile(filePath, function (error, content) {
      if (error) {
        fs.readFile("./404.html", function (error, content) {
          response.writeHead(404, { // file not found
            "Content-Type": "text/html",
          });
          response.end(content, "utf-8");
        });
      } else {
        response.writeHead(200, { // All OK
          "Content-Type": "text/html",
        });
        response.end(content, "utf-8");
      }
    });
  })
  .listen(8080);
console.log("Server running at http://127.0.0.1:8080/");