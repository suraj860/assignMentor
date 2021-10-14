require("dotenv").config();
const express = require("express");
const service = require("./services/men_stud_services")
const db = require("./mongo");
const Port = process.env.PORT || 5000;
const app = express();


const cors = require("cors")

async function connection() {
  await db.connect();

  app.use(cors());
  app.use(express.json());

  //different routes to get data

  app.get("/mentors", service.getMentors);

  app.get("/students", service.getStudents);

  app.post("/create_mentor", service.create_mentor);

  app.post("/create_student", service.create_student);

  app.put("/assign_student/:id/:studid", service.assign_student);

  app.put("/change_mentor/:id/:studid",service.change_mentor);

  app.listen(Port, () => {
    console.log(`suraj your server is running at ${Port}`);
  });
}

connection();
