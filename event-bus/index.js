const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());
app.post("/events", (req, res) => {
  const event = req.body;
  console.log("event>>>>>>>>>", event);

  axios.post("http://posts-clusterip-srv:4000/events", event).catch((err) => {
    console.log("http://posts-clusterip-srv:4000/events",err.message);
  });
  axios.post("http://comments-srv:4001/events", event).catch((err) => {
    console.log("http://comments-srv:4001/events",err.message);
  });
  axios.post("http://query-srv:4002/events", event).catch((err) => {
    console.log("http://query-srv:4002/events",err.message);
  });
  axios.post("http://moderation-srv:4003/events", event).catch((err) => {
    console.log("http://moderation-srv:4003/events", err.message);
  });
  res.send({status: "OK"});
});

app.listen(4005, () => {
  console.log("Listening to port 4005");
});
