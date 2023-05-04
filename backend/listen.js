const app = require("./server");
const { db } = require("./db/db");

const { PORT = 4000 } = process.env;

app.listen(PORT, () => {
  db.sync({ force: false });
  console.log(`Listening at http://localhost:${PORT}`);
});
