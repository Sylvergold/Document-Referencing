const studentModel = require("../model/studentModel")
const schoolModel  = require("../model/schoolModel")

exports.createStudent =async(req,res)=>{
    try{

        const id =req.params.id

        const school =await schoolModel.findById(id)

        const creatStudent = new studentModel(req.body)

        creatStudent.school= school

        await creatStudent.save()
          school.StudentInfo.push(creatStudent) 

          await school.save()
          
        res.status(200).json({messsage:'New student created successfully.', data:creatStudent})

    }catch(err){
        res.status(500).json(err.message)
    }
}

// Function to get a single student by ID
exports.getOneStudent = async (req, res) => {
    try {
        // Retrieve the student ID from request parameters
        const studentId = req.params.id;
        // Find the student by ID
        const student = await studentModel.findById(studentId);

        if (!student) {
            return res.status(404).json({ message: 'Student not found.' });
        }

        res.status(200).json({ data: student });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Function to get all students
exports.getAllStudent = async (req, res) => {
    try {
        const students = await studentModel.find({});
        res.status(200).json({ data: students });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deleteStudent = async (req, res) => {
    try {
        const studentId = req.params.id;

        // Find the student to be deleted
        const student = await studentModel.findById(studentId);

        if (!student) {
            return res.status(404).json({ message: 'Student not found.' });
        }

        // Find the school associated with the student
        const school = await schoolModel.findById(student.school);

        if (school) {
            // Remove the student reference from the school's StudentInfo array
            school.StudentInfo.pull(studentId);
            await school.save();
        }

        // Delete the student
        await studentModel.findByIdAndDelete(studentId);

        res.status(200).json({ message: 'Student deleted successfully.' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};