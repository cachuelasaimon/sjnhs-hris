/* eslint-disable no-console */
import React, { useState } from 'react';

import { Button, Grid, Paper, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import * as z from 'zod';

import { Add, collections } from '~/utils';

// Define the schema using zod
const formDataSchema = z.object({
  nameOfSchool: z.string().nonempty({ message: 'Name of School is required' }),
  degreeCourse: z.string().nonempty({ message: 'Degree/Course is required' }),
  periodFrom: z.string().nonempty({ message: 'Period From is required' }),
  periodTo: z.string().nonempty({ message: 'Period To is required' }),
  unitsEarned: z.string().nonempty({ message: 'Units Earned is required' }),
  yearGraduated: z.string().nonempty({ message: 'Year Graduated is required' }),
  scholarship: z.string().optional(),
});

const initialFormData = {
  nameOfSchool: '',
  degreeCourse: '',
  periodFrom: '',
  periodTo: '',
  unitsEarned: '',
  yearGraduated: '',
  scholarship: '',
};

const PersonalDataSheetForm: React.FC = () => {
  const [formData, setFormData] = useState({
    elementary: [initialFormData],
    secondary: [initialFormData],
    vocational: [initialFormData],
    college: [initialFormData],
    graduateStudies: [initialFormData],
  });

  const navigate = useNavigate();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    category: keyof typeof formData,
    index: number,
    field: keyof typeof initialFormData
  ) => {
    const { value } = e.target;
    const newFormData = { ...formData };
    newFormData[category][index] = {
      ...newFormData[category][index],
      [field]: value,
    };
    setFormData(newFormData);
  };

  const handleAdd = (category: keyof typeof formData) => {
    const newFormData = { ...formData };
    newFormData[category].push(initialFormData);
    setFormData(newFormData);
  };

  const handleRemove = (category: keyof typeof formData, index: number) => {
    const newFormData = { ...formData };
    newFormData[category].splice(index, 1);
    setFormData(newFormData);
  };

  const validateData = (data: any) => {
    const categories = Object.keys(data) as (keyof typeof formData)[];
    for (const category of categories) {
      for (const entry of data[category]) {
        const result = formDataSchema.safeParse(entry);
        if (!result.success) {
          alert(`Validation error in ${category}: ${result.error.message}`);
          return false;
        }
      }
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateData(formData)) {
      return;
    }
    await onSubmit(formData);
  };

  const onSubmit = async (values: any) => {
    console.log(values); // Debugging line
    try {
      await Add({
        collectionRef: collections.employees.string,
        data: values,
      });
      alert('Saved successfully');
    } catch (error) {
      console.error('Error saving other info:', error);
      alert('Failed to save other info');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ padding: '20px' }}>
      <Grid container spacing={2}>
        {Object.entries(formData).map(([category, fields]) => (
          <Grid item xs={12} key={category}>
            <Paper style={{ padding: '20px', marginBottom: '20px' }}>
              <Typography variant='h6' style={{ textTransform: 'capitalize' }}>
                {category}
              </Typography>
              {fields.map((field, index) => (
                <Grid container spacing={2} key={index}>
                  <Grid item xs={12}>
                    <TextField
                      name={`${category}[${index}].nameOfSchool`}
                      label='Name of School'
                      fullWidth
                      value={field.nameOfSchool}
                      onChange={(e) =>
                        handleChange(
                          e,
                          category as keyof typeof formData,
                          index,
                          'nameOfSchool'
                        )
                      }
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      name={`${category}[${index}].degreeCourse`}
                      label='Degree/Course'
                      fullWidth
                      value={field.degreeCourse}
                      onChange={(e) =>
                        handleChange(
                          e,
                          category as keyof typeof formData,
                          index,
                          'degreeCourse'
                        )
                      }
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      name={`${category}[${index}].periodFrom`}
                      label='Period From'
                      type='date'
                      fullWidth
                      value={field.periodFrom}
                      onChange={(e) =>
                        handleChange(
                          e,
                          category as keyof typeof formData,
                          index,
                          'periodFrom'
                        )
                      }
                      InputLabelProps={{ shrink: true }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      name={`${category}[${index}].periodTo`}
                      label='Period To'
                      type='date'
                      fullWidth
                      value={field.periodTo}
                      onChange={(e) =>
                        handleChange(
                          e,
                          category as keyof typeof formData,
                          index,
                          'periodTo'
                        )
                      }
                      InputLabelProps={{ shrink: true }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      name={`${category}[${index}].unitsEarned`}
                      label='Highest Level/Units Earned'
                      fullWidth
                      value={field.unitsEarned}
                      onChange={(e) =>
                        handleChange(
                          e,
                          category as keyof typeof formData,
                          index,
                          'unitsEarned'
                        )
                      }
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      name={`${category}[${index}].yearGraduated`}
                      label='Year Graduated'
                      type='number'
                      fullWidth
                      value={field.yearGraduated}
                      onChange={(e) =>
                        handleChange(
                          e,
                          category as keyof typeof formData,
                          index,
                          'yearGraduated'
                        )
                      }
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      name={`${category}[${index}].scholarship`}
                      label='Scholarship/Academic Honors Received'
                      fullWidth
                      value={field.scholarship}
                      onChange={(e) =>
                        handleChange(
                          e,
                          category as keyof typeof formData,
                          index,
                          'scholarship'
                        )
                      }
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      onClick={() =>
                        handleRemove(category as keyof typeof formData, index)
                      }
                      variant='contained'
                      color='secondary'
                      style={{ marginTop: '10px' }}
                      disabled={fields.length === 1}
                    >
                      Remove
                    </Button>
                  </Grid>
                </Grid>
              ))}
              <Button
                onClick={() => handleAdd(category as keyof typeof formData)}
                variant='contained'
                color='primary'
                style={{ marginTop: '10px' }}
              >
                Add
              </Button>
            </Paper>
          </Grid>
        ))}
        <Grid item xs={12}>
          <Button type='submit' variant='contained' color='primary'>
            Save
          </Button>
          <Button
            onClick={() =>
              setFormData({
                elementary: [initialFormData],
                secondary: [initialFormData],
                vocational: [initialFormData],
                college: [initialFormData],
                graduateStudies: [initialFormData],
              })
            }
            variant='contained'
            color='secondary'
            style={{ marginLeft: '10px' }}
          >
            Clear
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default PersonalDataSheetForm;
