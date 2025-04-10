import express from "express";

const app = express();
const port = 3000;

app.use(express.json());

let teaData = [];
let nextId = 1;

// use to add the teas name,price to the teaData array in this opretaion
app.post("/teas", (req, res) => {
  const { name, price } = req.body;
  const newtea = { id: nextId++, name, price };
  teaData.push(newtea);
  res.status(201).send(newtea);
});

// to display the enterd teas in the teaData
app.get("/teas", (req, res) => {
  res.status(200).send(teaData);
});

// get the tea with the specific id
app.get("/teas/:id", (req, res) => {
  const tea = teaData.find((t) => t.id === parseInt(req.params.id));
  if (!tea) {
    return res.status(404).send("not found");
  }
  res.status(200).send(tea);
});


// update tea
app.put("/teas/:id", (req, res) => {
  const tea = teaData.find((t) => t.id === parseInt(req.params.id));
  if (!tea) {
    return res.status(404).send("not found");
  }
  const { name, price } = req.body;
  tea.name = name;
  tea.price = price;
  res.status(200).send(tea);
});

// delete data
app.delete("teas/:id", (req, res) => {
  const index = teaData.findIndex((t) => t.id === parseInt(req.params.id));
  if (index === -1) {
    return res.status(404).send("not found");
  }
  teaData.splice(index, 1);
  return res.status(204).send("delete");
});

app.listen(port, () => {
  console.log(`Server is runnnig at port:${port}........`);
});
