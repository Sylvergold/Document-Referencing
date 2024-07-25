const router =require("express").Router()

const {createSchool, getASchool, getAllSchool} =require("../controller/schoolController")
const {createStudent, getAllStudent, getOneStudent, deleteStudent} = require("../controller/studentController")

router.post("/school", createSchool)
router.get("/school/:id",getASchool)
router.get("/school", getAllSchool)
router.post("/student/:id", createStudent)
router.get("/student:id", getOneStudent)
router.get("/student", getAllStudent)
router.delete("/student/:id", deleteStudent)


module.exports= router