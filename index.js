require("dotenv").config();
const http = require("http");
const app = require("./src/app");

const server = http.createServer(app);

const port = process.env.PORT;

server.listen(port, () => {
  console.log(`server Started at http://localhost:${port}`);
});
