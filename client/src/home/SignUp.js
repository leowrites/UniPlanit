import React, { useEffect, useState } from 'react';
import { Formik, Form } from 'formik';
import * as yup from 'yup';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Autocomplete from '@mui/material/Autocomplete';
import useAuth from 'context/auth';
import { useImg } from 'hooks/api/hooks';
import Loading from 'components/Loading';

const signupSchema = yup.object().shape({
  email: yup.string().email().required(),
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  password: yup
    .string()
    .required()
    .matches(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
      'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character'
    ),
  confirmPassword: yup
    .string()
    .test('passwords-match', 'Passwords must match', function (value) {
      return this.parent.password === value;
    }),
  university: yup.string().required(),
});

const SignUp = () => {
  const { authenticate, err } = useAuth();
  const [imgUrl, loadImg] = useImg();
  const [isLoading, setIsLoading] = useState(true);

  // useImg()
  // .then(res => setImgUrl(res))

  useEffect(() => {
    loadImg().then(() => {
      setIsLoading(false);
    });
    // eslint-disable-next-line
  }, []);

  return isLoading ? (
    <Loading />
  ) : (
    <div
      style={{
        backgroundImage: imgUrl && `url(${imgUrl})`,
        display: 'flex',
        height: '100vh',
        backgroundSize: 'cover',
      }}
    >
      <Container maxWidth="xs">
        <Box
          sx={{
            backgroundColor: 'white',
            borderRadius: 5,
            p: 5,
            mt: 5,
          }}
        >
          <Formik
            initialValues={{
              email: '',
              firstName: '',
              lastName: '',
              password: '',
              confirmPassword: '',
              university: 'uoft',
            }}
            validationSchema={signupSchema}
            onSubmit={(values, { setSubmitting }) => {
              setSubmitting(true);
              authenticate('register', values);
              setTimeout(() => {
                setSubmitting(false);
              }, 1000);
            }}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              setFieldValue,
              handleSubmit,
              isSubmitting,
            }) => (
              <Form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Typography variant="h3">Sign up</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      onChange={handleChange}
                      value={values.firstName}
                      fullWidth
                      id="firstName"
                      label="First Name"
                      name="firstName"
                      autoComplete="first-name"
                      error={errors.firstName ? true : false}
                      helperText={errors.firstName && 'First name is required'}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      onChange={handleChange}
                      value={values.lastName}
                      fullWidth
                      id="lastName"
                      label="Last Name"
                      name="lastName"
                      error={errors.lastName ? true : false}
                      helperText={errors.lastName && 'Last name is required'}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      onChange={handleChange}
                      value={values.email}
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                      error={errors.email ? true : false}
                      helperText={
                        errors.email && touched.email && 'Email is required'
                      }
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Autocomplete
                      fullWidth
                      options={['uoft', 'uvic']}
                      name="university"
                      id="university"
                      label="University"
                      onChange={(e, value) => {
                        setFieldValue('university', value);
                      }}
                      value={values.university}
                      renderInput={(params) => {
                        return (
                          <TextField
                            name="university"
                            label="University"
                            {...params}
                          />
                        );
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      onChange={handleChange}
                      value={values.password}
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      autoComplete="new-password"
                      error={errors.password ? true : false}
                      helperText={errors.password}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      name="confirmPassword"
                      label="Confirm Password"
                      type="password"
                      id="confirmpassword"
                      autoComplete="new-password"
                      onChange={handleChange}
                      error={errors.confirmPassword ? true : false}
                      helperText={
                        errors.confirmPassword && 'Password must match'
                      }
                    />
                  </Grid>
                  <Grid item xs={12}>
                    {err ? <Typography>{err}</Typography> : ''}
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      disabled={isSubmitting}
                      type="submit"
                      variant="contained"
                      sx={{ width: '50%' }}
                    >
                      Sign Up
                    </Button>
                  </Grid>
                </Grid>
              </Form>
            )}
          </Formik>
        </Box>
      </Container>
    </div>
  );
};

export default SignUp;
