import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 4000;

const tasks = [
  {
    id: 1,
    task: "Build a Weather App",
    dueDate: "2024-11-24",
    status: "false",
  },
  {
    id: 2,
    task: "Learn Web3 Basics",
    dueDate: "2024-11-30",
    status: "false",
  },
  {
    id: 3,
    task: "Develop a REST API for Task Manager",
    dueDate: "2024-12-05",
    status: "false",
  },
  {
    id: 4,
    task: "Practice SQL Queries",
    dueDate: "2024-12-10",
    status: "false",
  },
  {
    id: 5,
    task: "Complete JavaScript DSA Challenges",
    dueDate: "2024-12-15",
    status: "false",
  },
];

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get("/tasks", (req, res)=> {
  res.json(tasks);
});

app.get("/tasks/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = tasks.findIndex(task => task.id === id);
  res.json(tasks[index]);
});

app.post("/tasks/add", (req, res) => {
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

app.patch("/tasks/edit/:id", (req, res) => {
  const id = parseInt(req.params.id)
  const index = tasks.findIndex(task => task.id === id);
  if (index > -1) {
    tasks[index].task = req.body.task || tasks[index].task;
    tasks[index].dueDate = req.body.dueDate || tasks[index].dueDate;
    res.json(tasks[index]);
  } else {
    res
      .status(404)
      .json({error: `No task with id: ${id} `});
  }
});

app.delete("/tasks/delete/:id", (req, res) => {
  const id = parseInt(req.params.id); 
  const index = tasks.findIndex(task => task.id === id); 
  
  console.log(`ID to delete: ${id}, Found index: ${index}`);
  
  if (index > -1) {
    console.log(`Deleted task: ${JSON.stringify(tasks[index])}`);
    tasks.splice(index, 1); 
    res.sendStatus(200); 
  } else {
    res.status(404).json({ error: `No task found with id: ${id}` });
  }
});

app.listen(port, () => {
  console.log(`API running on port ${port}`);
});






