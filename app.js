const express = require("express");
require("dotenv").config();
const app = express();
const port = process.env.PORT;
const pictureViewer = require("./public/routes/pics");

app.use(express.json());

app.use("/", express.static(__dirname + "/public/spanish"));
app.use("/en", express.static(__dirname + "/public/english"));
app.use("/pics", express.static(__dirname + "/public/routes/pics"));

app.get("/pics", (req, res) => {
  const iframeHtml = pictureViewer(process.env.MEMZO_IFRAME);

  res.send(iframeHtml);
});

app.use("/assets", express.static(__dirname + "/public/assets"));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
