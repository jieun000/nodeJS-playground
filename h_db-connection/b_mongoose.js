var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// 스키마 객체 생성
const personSchema = new Schema({
    name: String,
    age: Number,
    email: { type: String, required: true }
})

module.exports = mongoose.model('Person', personSchema); // people로 생성됨



const express = require('express');
const bodyParser = require('body-parser');
const Person = require('./b_mongoose');

mongoose.set("strictQuery", false);

const app = express();
app.use(bodyParser.json());
app.listen(3000, async() => {
    console.log("Server started");
    const mongodbUri = "mongodb+srv://<아이디>:<패스워드>@<클러스터정보>";

    mongoose
        .connect(mongodbUri, { useNewUrlParser: true })
        .then(console.log("Connected to MongoDB"));
})

// 모든 person 데이터 출력
app.get("/person", async(req, res) => {
    const person = await Person.find({});
    res.send(person);
})

// 특정 이메일로 person 찾기
app.get("/person/:email", async(req, res) => {
    const person = await Person.findOne({ email: req.params.email });
    res.send(person);
})

// person 데이터 추가
app.post("/person", async(req, res) => {
    const person = new Person(req.body);
    await person.save();
    res.send(person);
})

// person 데이터 수정
app.put("/person/:email", async(req, res) => {
    const person = await Person.findOneAndUpdate(
        { email: req.params.email },
        { $set: req.body },
        { new: true }
    );
    console.log(person);
    res.send(person);
})

// person 데이터 삭제
app.delete("/person/:email", async(req, res) => {
    await Person.deleteMany({ email: req.params.email });
    res.send({ sucess: true });
})