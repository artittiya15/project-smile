const express = require("express");
const app = express();
app.use(express.static("public"));
const axios = require("axios");

app.get("/bi-member", (req, res) => {
  axios.get('https://wegivmerchantapp.firebaseapp.com/exam/bi-member-day-2020-04-01.json')
      .then((response) => {
          res.json(response.data)
      })
      .catch(console.log)
      .then(() => console.log('done'));
});

app.listen(3500);
