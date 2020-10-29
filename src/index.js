const app = require("express")();
const bodyParser = require("body-parser");
const upload = require("multer")();
const chalk = require("chalk");
const yargs = require("yargs");

// Middleware
app.use(require("cookie-parser")());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(upload.array());

// Router
const router = require("./router.js");
app.use("/movies", router);

const argv = yargs
  .option("port", {
    alias: "p",
    description: "The port to listen on",
    type: "number",
    default: 3000,
  })
  .help()
  .alias("help", "h").argv;

if (argv.port.toString().match(/^[0-9]{1,4}$/)) {
  var port = argv.port;
} else {
  console.log(
    chalk.red("Invalid port number, provide a number between 0 and 65536")
  );
  var port = 3000;
}

(async () => {
  app.listen(port);
  console.log("Server listening on port " + port.toString());
})();
