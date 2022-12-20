const express = require("express");
const app = express();
const { proxy, scriptUrl } = require("rtsp-relay")(app);
const cors = require("cors");

const handler = proxy({
  url: `rtsp://franka107:ggej9db6@192.168.1.40:554/stream1`,
  verbose: true,
});

app.use(cors());
// the endpoint our RTSP uses
app.ws("/api/stream", handler);

app.use("/", express.static(__dirname));
// this is an example html page to view the stream

app.get("/", function (req, res) {
  console.log(scriptUrl);
  res.sendFile(__dirname + "/assets/_index.html");
});

app.get("/sketch.js", function (req, res) {
  console.log(scriptUrl);
  res.sendFile(__dirname + "/assets/sketch.js");
});

app.listen(2000);
console.log("listen on 2000");
