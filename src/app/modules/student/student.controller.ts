import  { Request, Response } from 'express';
import { StudentServices } from './student.service';
import { ZodError, z } from "zod";
import studentValidationSchema from './student.validation';

// import Joi from 'joi';
// import validator from 'validator';
// import studentValidationSchema from './student.validation';

const createStudent = async (req: Request, res: Response) => {
  try {



    const { student: studentData } = req.body;

    // data validation using joi
    // const { error, value } = studentValidationSchema.validate(studentData);

    // data validation using zod
    const zodParsedData = studentValidationSchema.parse(studentData)

    const result = await StudentServices.createStudentIntoDB(zodParsedData);
    // console.log({ error }, { value });

    // if (error) {
    //   console.error('Validation error:', error.details);
    // } else {
    //   console.log('Valid data:', value);
    // }

    // if(error){
    //   res.status(500).json({
    //     success: false,
    //     message: 'Something went wrong',
    //     error: error.details,
    //   });
    // }else{
    //   console.log('Valid data:', value);

    // }

    

    res.status(200).json({
      success: true,
      message: 'Student is created succesfully',
      data: result,
    });
  } catch (err:any) {
    // console.log(err);
    res.status(500).json({
      success: false,
      message: err.message || 'Something went wrong',
      ZodError: err,
    });
  }
};

const getAllStudents = async (req: Request, res: Response) => {
  try {
    const result = await StudentServices.getAllStudentsFromDB();

    res.status(200).json({
      success: true,
      message: 'Students are retrieved succesfully',
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};

const getSingleStudent = async (req: Request, res: Response) => {
  try {
    //only with student id, not objectId
    const { studentId } = req.params;
    // if we want to get with using objectId
    // const { objectId } = req.params;

    const result = await StudentServices.getSingleStudentFromDB(studentId);
    // if we want to get with using objectId
    // const result = await StudentServices.getSingleStudentFromDB(objectId);

    res.status(200).json({
      success: true,
      message: 'Student is retrieved succesfully',
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};

export const StudentControllers = {
  createStudent,
  getAllStudents,
  getSingleStudent,
};
