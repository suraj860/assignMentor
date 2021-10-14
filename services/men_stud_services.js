const { ObjectId } = require("bson");

const db = require("../mongo");

const services = {

  //get the mentors data and display all the students assigned to him
  async getMentors(req, res) {
    try {
      const response = await db.mentors.find().toArray();
      res.status(200).send(response);
    } catch (err) {
      res.status(500).send(err);
    }
  },

  //get the students data
  async getStudents(req, res) {
    try {
      const response = await db.students.find().toArray();
      res.status(200).send(response);
    } catch (err) {
      res.status(500).send(err);
    }
  },

  //create a new mentor
  async create_mentor(req, res) {
    try {

      //inserting a new mentor information into the database
      const { insertedId: _id } = await db.mentors.insertOne(req.body);
      res.send({ ...req.body, _id });

    } catch (err) {
      res.status(500).send(err);

    }
  },

  //create a new student

  async create_student(req, res) {
    try {

      //inserting a new student information in the database
      const { insertedId: _id } = await db.students.insertOne(req.body);
      res.send({ ...req.body, _id });
    } catch (err) {
      res.status(500).send(err);
    }

  },

  //assign a student to each mentor
  async assign_student(req, res) {
    try {

      //update mentors data ,assign a student to a particular
      // mentor with the help of his id
      const response = await db.mentors.findOneAndUpdate(
        { _id: ObjectId(req.params.id) },
        {
          //push the student info and its id in the students array
          $push: {
            students: { ...req.body, _id: ObjectId(req.params.studid) },
          },
        },
        { returnDocument: "after" }
      );

      //delete student from student database once mentor is assigned to him
      db.students.deleteOne({ _id: ObjectId(req.params.studid) });

      res.send(response.value);
    } catch (err) {
      res.status(500).send(err);
    }
  },

  //change student mentor

  async change_mentor(req, res) {
    try {
        
      //delete the student from mentors database
      const response = await db.mentors.findOneAndUpdate(
        { _id: ObjectId(req.params.id) },
        { $pull: { students: { _id: ObjectId(req.params.studid) } } },
        { returnDocument: "after" }
      );
      // ...req.body , _id: ObjectId(req.params.studid)
      //insert the deleted student into back to student databse
      //so we can assign a new mentor to him
      db.students.insertOne({ ...req.body, _id: ObjectId(req.params.studid) });
      res.send(response.value);
    } catch (err) {
      res.status(500).send(err);
    }
  },
};

module.exports = services;
