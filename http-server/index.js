const http = require("http");
const fs = require("fs");
const minimist = require("minimist");

const args = minimist(process.argv.slice(2));
const port = args.port || 3000;

let homeContent = "";
let projectContent = "";
let registrationContent = "";

fs.readFile("./home.html", "utf8", (err, home) => {
  if (err) throw err;
  homeContent = home;

  fs.readFile("./project.html", "utf8", (err, project) => {
    if (err) throw err;
    projectContent = project;

    fs.readFile("./registration.html", "utf8", (err, registration) => {
      if (err) throw err;
      registrationContent = registration;

      http.createServer((request, response) => {
        let url = request.url;

        switch (url) {
          case "/project":
            response.writeHead(200, { "Content-Type": "text/html" });
            response.write(projectContent);
            break;
          case "/registration":
            response.writeHead(200, { "Content-Type": "text/html" });
            response.write(registrationContent);
            break;
          default:
            response.writeHead(200, { "Content-Type": "text/html" });
            response.write(homeContent);
        }

        response.end();
      }).listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
      });
    });
  });
});
