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
    res.render("index.ejs", {tasks: result});
  } catch (error) {
    res.status(500).json({ message: "Error fetching posts" });
  }
});

// Render page to add new task
app.get("/tasks/new", (req, res) => {
  res.render("edit.ejs");
})

// Get task by id
app.get("/tasks/:id", async (req, res) => {
  const id = req.params.id;
  try{
    const response = await axios.get(`${API_URL}/tasks/${id}`);
    const result = response.data;
    res.render("edit.ejs", {edit: result});
  } catch (error) {
    res.status(404).render()
  }
});

// Add new task
app.post("/tasks/add", async (req, res) => {
  console.log(req.body)
  try {
    const response = await axios.post(`${API_URL}/tasks/add`, {
      task: req.body.task,
      dueDate: req.body.dueDate,
    });
    const result = response.data;
    console.log(result);
    res.redirect("/")
  } catch {
    res.status(500).render();
  }
});

// Edit a task
app.post("/tasks/edit/:id", async (req,res) => {
  const id = req.params.id;
  try {
    const response = await axios.patch(`${API_URL}/tasks/edit/${id}`, req.body);
     const result = response.data;
     console.log(result);
     res.redirect("/");
  } catch (error) {
    console.error("Failed to update task", error.message);
  }
});

// Delete a task 
app.post("/tasks/delete/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const response = await axios.delete(`${API_URL}/tasks/${id}`);
    const result = response.data;
    console.log(result);
    res.redirect("/");
  } catch (error) {
    console.error("Failed to delete task", error.message);
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

