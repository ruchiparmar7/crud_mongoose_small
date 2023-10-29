const express = require("express");
const connectDB = require("./dbmongo");
const mongoose = require("mongoose");
const app = express();
connectDB();
app.use(express.static(__dirname));
app.use(express.json());

const Schema = mongoose.Schema;

const t1 = new Schema(
  {
    id: Number,
    name: String,
    address: String,
  },
  { collection: "task" }
);

const alltask = mongoose.model("task", t1);

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index24.html");
});

app.get("/data", async function (req, res) {
  const d1 = await alltask.find();
  res.json(d1);
});

app.post("/addtask", async (req, res) => {
  const newdata = new alltask(req.body);
  await newdata.save();
  res.sendStatus(200);
});

app.delete("/deltask/:id", async function (req, res) {
  const itemId = req.params.id;
  await alltask.findOneAndDelete({ _id: itemId });
  res.json({ message: "Item deleted successfully" });
});

app.put("/edit/:id", async function (req, res) {
  const itemID = req.params.id;
  const rec = await alltask.findById({ _id: itemID });
  if (rec) {
    res.json(rec);
  }
});

app.put("/update", async (req, res) => {
  const id = req.body._id;

  const updatedData = {
    id: req.body.id,
    name: req.body.name,
    address: req.body.address,
  };

  const result = await alltask
    .findByIdAndUpdate(id, updatedData, { new: true })
    .then(() => {
      res.status(200).json("Record Updated");
    })
    .catch((err) => console.log(err));
});

app.listen(8081, function () {
  console.log("Server is running on port ");
});
