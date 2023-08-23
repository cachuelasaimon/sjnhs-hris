import * as Yup from 'yup';

import { BaseSchema } from '~/types';

export const addressValidation = Yup.object({
  userId: Yup.string(),
  fullName: Yup.string()
    .max(70, 'Maximum amount of text reached')
    .required('Required')
    .nullable(),
  contactNumber: Yup.string()
    .min(11, 'Please provide a valid phone number')
    .required('Required')
    .nullable(),
  line1: Yup.string()
    .max(92, 'Maximum amount of text reached')
    .required('Required')
    .nullable(),
  line2: Yup.string().max(92, 'Maximum amount of text reached').nullable(),
  state: Yup.string().required('Required').nullable(),
  country: Yup.string()
    .max(55, 'Maximum amount of text reached')
    .required('Required')
    .nullable(),
  zip: Yup.string()
    .max(9, 'Maximum amount of text reached')
    .required('Required')
    .nullable(),
  city: Yup.string()
    .max(60, 'Maximum amount of text reached')
    .required('Required')
    .nullable(),
});

export type IAddress = Yup.InferType<typeof addressValidation> & BaseSchema;
