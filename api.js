import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 4000;

const tasks = [
{
  id: 1,
  task: "Get Rich",
  dueDate: "2024-11-24",
  status: "false",
},
];

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get("/tasks", (req, res)=> {
  res.json(tasks);
});

app.get("/tasks/:id", (req, res) => {
  const id = req.params.id
  const task = tasks.find(task => task.id === parseInt(id));
  if (!task) {
    res.json(task);
  }else {
    res
      .status(404)
      .json({error: `No task found wiith id: ${id}`})
  }
});

app.post("/tasks", (req, res) => {
  const index = tasks.length;
  const newTask = {
    id: index + 1,
    task: req.body.task,
    dueDate: req.body.dueDate,
    status: "false",
  };
  tasks.push(newTask);
  res.json(tasks[index]);
});

app.put("/tasks/:id", (req, res) => {
  const id = parseInt(req.params.id)
  const index = tasks.findIndex(task => task.id === id);
  if (index > -1) {
    const updateTask = {
      id: id,
      title: req.body.task || tasks[index].title,
      dueDate: req.body.dueDate || tasks[index].dueDate,
      status: req.body.status || tasks[index].status,
    };
    tasks[index] = updateTask;
    res.json(tasks[index]);
  } else {
    res
      .status(404)
      .json({error: `No task with id: ${id} `});
  }
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
    .json({error: `No task found with id: ${id}`});
  } 
});

app.listen(port, () => {
  console.log(`API running port ${port}`);
});






