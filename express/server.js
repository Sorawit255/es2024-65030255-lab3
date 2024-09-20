const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://mongo:27017/studentDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Define Student schema
const studentSchema = new mongoose.Schema({
    studentCode: String,
    firstName: String,
    lastName: String,
    telNumber: String,
});

const Student = mongoose.model('Student', studentSchema);

// CRUD Routes
app.post('/students', async (req, res) => {
    const student = new Student(req.body);
    await student.save();
    res.status(201).send(student);
});

app.get('/students', async (req, res) => {
    const students = await Student.find();
    res.send(students);
});

app.put('/students/:id', async (req, res) => {
    const student = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.send(student);
});

app.delete('/students/:id', async (req, res) => {
    await Student.findByIdAndDelete(req.params.id);
    res.status(204).send();
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
