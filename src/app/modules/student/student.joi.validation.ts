import Joi from 'joi';

const userNameValidationSchema = Joi.object({
  firstName: Joi.string().trim().max(10).required().messages({
    'string.max': 'Too many eggs',
    'any.required': 'First name is required',
  }),
  middleName: Joi.string().optional(),
  lastName: Joi.string().trim().max(10).required().messages({
    'string.max': 'Too many eggs',
    'any.required': 'Last name is required',
  }),
});

const guardianValidationSchema = Joi.object({
  fatherName: Joi.string().required().messages({
    'any.required': 'Father name is required',
  }),
  fatherOccupation: Joi.string().required().messages({
    'any.required': 'Father occupation is required',
  }),
  fatherContactNo: Joi.string().required().messages({
    'any.required': 'Father contact number is required',
  }),
  motherName: Joi.string().required().messages({
    'any.required': 'Mother name is required',
  }),
  motherOccupation: Joi.string().required().messages({
    'any.required': 'Mother occupation is required',
  }),
  motherContactNo: Joi.string().required().messages({
    'any.required': 'Mother contact number is required',
  }),
});

const localGuardianValidationSchema = Joi.object({
  name: Joi.string().required().messages({
    'any.required': 'Local guardian name is required',
  }),
  occupation: Joi.string().required().messages({
    'any.required': 'Local guardian occupation is required',
  }),
  contactNo: Joi.string().required().messages({
    'any.required': 'Local guardian contact number is required',
  }),
  address: Joi.string().required().messages({
    'any.required': 'Local guardian address is required',
  }),
});

// Main schema
const studentValidationSchema = Joi.object({
  id: Joi.string().required().messages({
    'any.required': 'Student ID is required',
  }),
  name: userNameValidationSchema.required().messages({
    'any.required': 'Name is required',
  }),
  gender: Joi.string().valid('male', 'female', 'other').required().messages({
    'any.only': '{#value} is not valid',
    'any.required': 'Gender is required',
  }),
  dateOfBirth: Joi.string().optional(),
  email: Joi.string().email().required().messages({
    'string.email': '{#value} is not valid',
    'any.required': 'Email is required',
  }),
  contactNo: Joi.string().required().messages({
    'any.required': 'Contact number is required',
  }),
  emergencyContactNo: Joi.string().required().messages({
    'any.required': 'Emergency contact number is required',
  }),
  bloodGroup: Joi.string()
    .valid('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-')
    .optional()
    .messages({
      'any.only': '{#value} is not a valid blood group',
    }),
  presentAddress: Joi.string().required().messages({
    'any.required': 'Present address is required',
  }),
  permanentAddress: Joi.string().required().messages({
    'any.required': 'Permanent address is required',
  }),
  guardian: guardianValidationSchema.required().messages({
    'any.required': 'Guardian information is required',
  }),
  localGuardian: localGuardianValidationSchema.required().messages({
    'any.required': 'Local guardian information is required',
  }),
  profileImg: Joi.string().optional(),
  isActive: Joi.string().valid('active', 'blocked').default('active').messages({
    'any.only': '{#value} is not a valid status',
  }),
});


// export default studentValidationSchema;