
<html>
<head>
  <title>Cat Facts</title>
</head>
<body>

  <h1>🐱 Random Cat Facts</h1>
  <div id="facts"></div>

  <script>
    // API URL
    const apiUrl = 'https://catfact.ninja/facts?limit=5';

    fetch(apiUrl)
      .then(res => res.json())
      .then(data => {
         document.getElementById('facts').innerHTML = data.data[0].fact; });
  </script>

</body>
</html>











const express = require('express');
const Joi = require('joi');
const app = express();

app.use(express.json());

let fruits = [
  { id: 1, name: 'Apple' },
  { id: 2, name: 'Banana' },
  { id: 3, name: 'Kiwi' }
];

// GET all fruits
app.get('/api/fruits', (req, res) => res.send(fruits));

// GET fruit by id
app.get('/api/fruits/:id', (req, res) => {
  const fruit = fruits.find(f => f.id === parseInt(req.params.id));
  if (!fruit) return res.status(404).send("Fruit not found");
  res.send(fruit);
});

// POST new fruit
app.post('/api/fruits', (req, res) => {
  const schema = Joi.object({ name: Joi.string().min(3).required() });
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const fruit = { id: fruits.length + 1, name: req.body.name };
  fruits.push(fruit);
  res.send(fruit);
});

// PUT update fruit
app.put('/api/fruits/:id', (req, res) => {
  const fruit = fruits.find(f => f.id === parseInt(req.params.id));
  if (!fruit) return res.status(404).send("Fruit not found");

  const schema = Joi.object({ name: Joi.string().min(3).required() });
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  fruit.name = req.body.name;
  res.send(fruit);
});

// DELETE fruit
app.delete('/api/fruits/:id', (req, res) => {
  const index = fruits.findIndex(f => f.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).send("Fruit not found");

  const deleted = fruits.splice(index, 1);
  res.send(deleted[0]);
});

// Start server
const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}`));
