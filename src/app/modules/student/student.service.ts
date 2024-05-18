import { Student } from './student.model';
import { TStudent } from './student.interface';

const createStudentIntoDB = async (studentData: TStudent) => {
  if (await Student.isUserExists(studentData.id)) {
    throw new Error('Euser already exists');
  }

  const result = await Student.create(studentData); // built in static method

  // const student = new Student(studentData); // built in insttance method by mongoose
  // if(await student.isUserExists(studentData.id)){
  //   throw new Error('Euser already exists');
  // }
  // const result = await student.save();

  return result;
};

const getAllStudentsFromDB = async () => {
  const result = await Student.find();
  return result;
};

// only with student id, not objectId
const getSingleStudentFromDB = async (id: string) => {
  const result = await Student.findOne({ id });
  return result;
};

// const getSingleStudentFromDB = async (objectId: string) => {
//   const result = await StudentModel.findOne({ objectId });
//   return result;
// };

export const StudentServices = {
  createStudentIntoDB,
  getAllStudentsFromDB,
  getSingleStudentFromDB,
};
