const express = require('express');
const mongoose = require('mongoose');
const app = express();
app.use(express.json());

mongoose.connect('mongodb://mongodb:27017/studentDB', { useNewUrlParser: true, useUnifiedTopology: true });

const studentSchema = new mongoose.Schema({
  studentCode: String,
  firstName: String,
  lastName: String,
  telNumber: String
});

const Student = mongoose.model('Student', studentSchema);

// Create
app.post('/api/students', async (req, res) => {
  const student = new Student(req.body);
  await student.save();
  res.send(student);
});

// Read
app.get('/api/students', async (req, res) => {
  const students = await Student.find();
  res.send(students);
});

// Update
app.put('/api/students/:id', async (req, res) => {
  const student = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.send(student);
});

// Delete
app.delete('/api/students/:id', async (req, res) => {
  await Student.findByIdAndDelete(req.params.id);
  res.send({ message: 'Student deleted' });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
