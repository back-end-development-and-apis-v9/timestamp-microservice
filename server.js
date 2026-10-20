import express from "express";
import cors from "cors";

const app = express();

app.use(cors({ optionsSuccessStatus: 200 }));

app.use(express.static("public"));

app.get("/", (_req, res) => {
  res.sendFile(import.meta.dirname + "/views/index.html");
});

// Do not change code above this line

function buildResponse(date) {
  if (Number.isNaN(date.getTime())) {
    return { error: "Invalid Date" };
  }
  return { unix: date.getTime(), utc: date.toUTCString() };
}

app.get("/api", (req, res) => {
  res.json(buildResponse(new Date()));
});

app.get("/api/:date", (req, res) => {
  const { date } = req.params;

  const parsed = /^-?\d+$/.test(date)
    ? new Date(Number(date))
    : new Date(date);

  res.json(buildResponse(parsed));
});


const PORT = 8000;
const listener = app.listen(PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
