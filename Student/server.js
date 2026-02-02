const express = require("express");
const fs = require("fs");

const app = express();
app.use(express.json());

const file = "students.json";

app.get("/student", (req, res) => {
  const data = fs.readFileSync(file, "utf-8");
  const students = JSON.parse(data);
  res.json(students);
});

app.get("/student/:id", (req, res) => {
  const data = fs.readFileSync(file, "utf-8");
  const students = JSON.parse(data);

  let student = null;

  for (let i = 0; i < students.length; i++) {
    if (students[i].id == req.params.id) {
      student = students[i];
      break;
    }
  }

  if (student === null) {
    res.status(404).json({ message: "Student not found" });
    return;
  }

  res.json(student);
});

app.post("/student", (req, res) => {
  const data = fs.readFileSync(file, "utf-8");
  const students = JSON.parse(data);

  students.push(req.body);

  fs.writeFileSync(file, JSON.stringify(students, null, 2));
  res.status(201).json({ message: "Student added" });
});

app.put("/student/:id", (req, res) => {
  const data = fs.readFileSync(file, "utf-8");
  const students = JSON.parse(data);

  let found = false;

  for (let i = 0; i < students.length; i++) {
    if (students[i].id == req.params.id) {
      students[i] = req.body;
      found = true;
      break;
    }
  }

  if (found === false) {
    res.status(404).json({ message: "Student not found" });
    return;
  }

  fs.writeFileSync(file, JSON.stringify(students, null, 2));
  res.json({ message: "Student updated" });
});

app.delete("/student/:id", (req, res) => {
  const data = fs.readFileSync(file, "utf-8");
  const students = JSON.parse(data);

  let newStudents = [];
  let deleted = false;

  for (let i = 0; i < students.length; i++) {
    if (students[i].id == req.params.id) {
      deleted = true;
    } else {
      newStudents.push(students[i]);
    }
  }

  if (deleted === false) {
    res.status(404).json({ message: "Student not found" });
    return;
  }

  fs.writeFileSync(file, JSON.stringify(newStudents, null, 2));
  res.json({ message: "Student deleted" });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});