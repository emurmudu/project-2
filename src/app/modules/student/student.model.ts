import { Schema, model } from 'mongoose';

import {
  StudentMethods,
  StudentModel,
  TGuardian,
  TLocalGuardian,
  TStudent,
  TUserName,
} from './student.interface';
import bcrypt from "bcrypt";
import config from '../../config';

// sub schema
const userNameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    trim: true, // formats both side spaces
    required: [true, 'First name is required'],
    maxlength: [10, 'Too many eggs'],
    // custom validation, value=firstName
  },
  middleName: {
    type: String,
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required'],
    // validation with validator npm
  },
});

// sub schema
const guardianSchema = new Schema<TGuardian>({
  fatherName: {
    type: String,
    required: true,
  },
  fatherOccupation: {
    type: String,
    required: true,
  },
  fatherContactNo: {
    type: String,
    required: true,
  },
  motherName: {
    type: String,
    required: true,
  },
  motherOccupation: {
    type: String,
    required: true,
  },
  motherContactNo: {
    type: String,
    required: true,
  },
});

// sub schema
const localGuardianSchema = new Schema<TLocalGuardian>({
  name: {
    type: String,
    required: true,
  },
  occupation: {
    type: String,
    required: true,
  },
  contactNo: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
});

// main schema
const studentSchema = new Schema<TStudent, StudentModel>({
  id: { type: String, required: true, unique: true },
  password: { type: String, required: true, unique: true, maxlength:[20, 'Password can not be more than 20 charecters'] },
  name: {
    type: userNameSchema,
    required: true,
  },
  gender: {
    type: String,
    enum: {
      values: ['male', 'female', 'other'],
      // message: "The gender field can only be one of the following :  'male', 'female', 'other',"
      message: '{VALUE} is not valid',
    },
    required: true,
  },
  dateOfBirth: { type: String },
  email: {
    type: String,
    required: true,
    unique: true,
    // validate: {
    //   validator: (value: string) => validator.isEmail(value),
    //   message: '{VALUE} is not valid',
    // },
  },
  contactNo: { type: String, required: true },
  emergencyContactNo: { type: String, required: true },
  bloodGroup: {
    type: String,
    enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
  },
  presentAddress: { type: String, required: true },
  permanentAddress: { type: String, required: true },
  guardian: {
    type: guardianSchema,
    required: true,
  },
  localGuardian: {
    type: localGuardianSchema,
    required: true,
  },
  profileImg: { type: String },
  isActive: {
    type: String,
    enum: ['active', 'blocked'],
    default: 'active',
  },
});


studentSchema.pre('save', async function(next){
  // console.log(this, 'pre hook: we will save data')
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  user.password = await bcrypt.hash(user.password, Number(config.bcrypt_salt_rounds));
  next();
});



studentSchema.post('save', function(){
  console.log(this, 'post hook: we have saved data')
})



// creating a custom static method

studentSchema.statics.isUserExists = async function(id:string){
  const existingUser = await Student.findOne({id});
  return existingUser;
}


// creating custom instance method
// studentSchema.methods.isUserExists = async function (id: string){
//   const existingUser = await Student.findOne({id})
//   return existingUser;
// }

//model
export const Student = model<TStudent, StudentModel>('Student', studentSchema);
