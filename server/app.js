const express =  require("express");
const { mongoConnect } = require ("./config/db");
const UserRoute = require ("./routes/userroute");
const cors = require ("cors");
const dotenv = require ("dotenv");

dotenv.config();
const app = express();
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());
mongoConnect();
app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);
app.use("/userapi", UserRoute());
app.get("/", (req, res) => {
  res.send({
    code: 200,
  });
});
app.listen(process.env.PORT || 3001, () => {
  console.log(`Listning ${process.env.PORT}`);
});
