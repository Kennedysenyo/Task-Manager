import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 4000;

const tasks = [];

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get("/tasks", (req, res)=> {
  res.json(tasks);
});

app.get("/tasks/:id", (req, res) => {
  const task = tasks.find(task => task.id === parseInt(req.params.id));
  res.json(task);
});

app.post("/tasks", (req, res) => {
  const index = tasks.length;
  const newTask = {
    id: index + 1,
    title: req.body.title,
    description: req.body.description,
    dueDate: req.body.dueDate,
  };
  tasks.push(newTask);
  res.json(tasks[index]);
});

app.put("/tasks/:id", (req, res) => {
  const index = tasks.findIndex(task => task.id === id);
  const updateTask = {
    id: parseInt(req.params.id),
    title: req.body.title || tasks[index].title,
    description: req.body.description || tasks[index].description,
    dueDate: req.body.dueDate || tasks[index].dueDate
  };
  tasks[index] = updateTask;
  res.json(tasks[index]);
});

app.delete("/tasks/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = tasks.findIndex(task => task.id === id);
  if (index > -1) {
    tasks.splice(index, 1);
    res.sendStatus(200);
  }else {
    res
    .sendStatus(404)
    .json(`No task found with id: ${id}`);
  } 
});

app.listen(port, () => {
  console.log(`API running port ${port}`);
});






