const express = require("express");
const route = require("./routes/index.route");
const cors = require("cors");

const app = express();
const port = 8000;

app.use(express.json());
app.use(cors());

route(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
