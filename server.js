import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;
const API_URL = "http://localhost:4000";

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

// Route to render main page
app.get("/", async (req, res) => {
  try {
    const response = await axios.get(`${API_URL}/tasks`);
    const result = response.data;
    console.log(result)
    res.render("index.ejs", {tasks: result});
  } catch (error) {
    res.status(500).json({ message: "Error fetching posts" });
  }
});

app.get("/tasks/:id", async (req, res) => {
  const id = parseInt(req.body.id);
  try{
    const response = await axios.get(`${API_URL}/tasks/${id}`);
    const result = response.data;
    res.render("edit.ejs");
  } catch (error) {
    res.status(404).render()
  }
});

app.post("/tasks/posts", async (req, res) => {
  try {
    const response = await axios.post(`${API_URL}/tasks`, {
      task: req.body.task,
      dueDate: req.body.dueDate,
    });
    const result = response.data;
    res.render("index.ejs")
  } catch {
    res.status(500).render();
  }
});

app.post("tasks/edit/:id", async (req,res) => {
  const id = req.params.id;
  const task = req.body.task;
  const dueDate = req.body.dueDate;
  const status = req.body.status;

  try {
    const response = await axios.put(`${API_URL}/tasks/${id}`, {
      task: task,
      dueDate: dueDate,
      status: status,
     });
     const result = response.data;
     res.render();
  } catch (error) {
    console.error("Failed to update task", error.message);
  }
});

app.post("tasks/delete/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const response = await axios.delete(`${API_URL}/tasks/${id}`);
  } catch (error) {
    console.error("Failed to delete task", error.message);
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

