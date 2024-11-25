import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;
const API_URL = "localhost:4000"

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", async (req, res) => {
  try {
    const response = await axios.get(`${API_URL}/tasks`);
    const result = response.data;
    res.render();
  } catch (error) {
    res.status(500).render();
  }
});

app.get("/tasks/:id", async (req, res) => {
  const id = parsInt(req.body.id);
  try{
    const response = await axios.get(`${API_URL}/${id}`);
    const result = response.data;
    res.render();
  } catch (error) {
    res.status(404).render()
  }
});

app.post("tasks/posts", async (req, res) => {
  try {
    const response = await axios.put(`${API_URL}/tasks`, {
      title: req.body.title,
      description: req.body.description,
      dueDate: req.body.dueDate
    });
    const result = response.data;
    res.render()
  } catch {
    res.status(500).render();
  }
});

app.post("tasks/edit/:id", async (req,res) => {
  const id = req.params.id;
  const title = req.body.title;
  const description = req.body.description;
  const dueDate = req.body.dueDate;

  try {
    const response = await axios.put(`${API_URL}/tasks/${id}`, {
      title: title,
      description: description,
      dueDate: dueDate,
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

