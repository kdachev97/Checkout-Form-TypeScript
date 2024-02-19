import React, { Fragment, useState } from 'react';
import {
  FormProvider,
  SubmitHandler,
  useForm,
} from 'react-hook-form';
import axios from 'axios';
import type { AlertColor } from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import AutocompleteInput from '@/components/inputs/AutocompleteInput';
import BooleanInput from '@/components/inputs/BooleanInput';
import DateInput from '@/components/inputs/DateInput';
import FileInput from '@/components/inputs/FileInput';
import SelectInput from '@/components/inputs/SelectInput';
import TextInput from '@/components/inputs/TextInput';
import Snackbar from '@/components/snackbar/Snackbar';
import {
  optionsAutocomplete,
  optionsSelectInput,
} from '@/utils/options';
import image from '../../public/image.png';

interface FormInputs {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  whiskey: string;
  quantity: string;
  address: string;
  ageVerified: boolean;
  date: Date;
  city: string;
  file: File;
}

const emailRegExp = /\S+@\S+\.\S+/;
const phoneRegExp = /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const Home = () => {
  const methods = useForm<FormInputs>();
  const { handleSubmit, watch, reset } = methods;
  const watchAgeVerified = watch('ageVerified');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState<AlertColor>('error');
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const defaultValues = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    whiskey: '',
    quantity: '',
    address: '',
    ageVerified: false,
    date: undefined,
    city: '',
    file: undefined
  };

  const formSubmitHandler: SubmitHandler<FormInputs> = async (data: FormInputs) => {
    const { quantity, date } = data;
    const parsedQuantity = parseInt(quantity, 10);
    const formatDate = date.toLocaleDateString();
    const formData = {
      ...data,
      quantity: parsedQuantity,
      date: formatDate,
    };
    try {
      await axios.post('/api/purchase', formData);
      setSnackbarSeverity('success');
      setSnackbarMessage('Form submitted successfully!');
    } catch (error) {
      setSnackbarSeverity('error');
      setSnackbarMessage('Form submission failed!');
    } finally {
      setSnackbarOpen(true);
    }
  };
  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const validateDate = (value: string) => {
    const selectedDate = new Date(value);
    const currentDate = new Date();
    if (selectedDate < currentDate) {
      return 'Please select a date after today';
    }

    return undefined;
  };

  const inputStyle = {
    padding: '0 8px',
    '& fieldset': {
      border: '1.5px solid',
      borderRadius: '10px',
    },
  };

  const boxStyle = {
    border: '2px solid #000000',
    borderRadius: '10px',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    margin: '30px',
    padding: '20px',
    backgroundImage: `url(${image.src})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  };

  const handleReset = () => {
    reset(defaultValues);
  }

  return (
    <Box
      sx={boxStyle}
    >
      <FormProvider {...methods}>
        <form
          onSubmit={handleSubmit(formSubmitHandler)}
          noValidate
        >
          <Grid
            container
          >
            <Grid
              item
              xs={12}
              sm={6}
              sx={inputStyle}
            >
              <TextInput
                name="firstName"
                label="First Name"
                dataCy="first-name-input"
                required
                rules={{
                  required: 'First Name is a required field',
                }}
              />
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
              sx={inputStyle}
            >
              <TextInput
                name="lastName"
                label="Last Name"
                dataCy="last-name-input"
                required
                rules={{
                  required: 'Last Name is a required field',
                }}
              />
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
              sx={inputStyle}
            >
              <TextInput
                name="email"
                label="Email"
                dataCy="email-input"
                required
                rules={{
                  required: 'Email is a required field',
                  pattern: {
                    value: emailRegExp,
                    message: 'Entered value does not match email format',
                  },
                }}
              />
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
              sx={inputStyle}
            >
              <TextInput
                name="phone"
                label="Phone"
                dataCy="phone-input"
                required
                rules={{
                  required: 'Phone is a required field',
                  pattern: {
                    value: phoneRegExp,
                    message: 'Entered value does not match phone format',
                  },
                }}
              />
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
              sx={inputStyle}
            >
              <SelectInput
                name="whiskey"
                label="Whiskey"
                dataCy="whiskey-input"
                options={optionsSelectInput}
                required
                rules={{ required: 'Whiskey is a required field' }}
              />
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
              sx={inputStyle}
            >
              <TextInput
                name="quantity"
                label="Quantity"
                type="number"
                dataCy="quantity-input"
                required
                rules={{
                  required: 'Quantity is a required field',
                  min: {
                    value: 3,
                    message: 'Quantity cannot be less than 3',
                  },
                }}
              />
            </Grid>
            <Grid
              item
              xs={12}
              sx={inputStyle}
            >
              <TextInput
                name="address"
                label="Address"
                multiline
                dataCy="address-input"
                required
                rules={{ required: 'Address is a required field' }}
              />
            </Grid>
            <Grid
              item
              xs={12}
            >
              <BooleanInput
                name="ageVerified"
                label="I verify that I am over 18 years old!"
                dataCy="ageVerified-input"
                required
                rules={{
                  required: 'Age Verification is a required field',
                }}
              />
            </Grid>
            {watchAgeVerified && (
              <Fragment>
                <Grid
                  item
                  xs={12}
                  sm={6}
                  sx={inputStyle}
                >
                  <DateInput
                    name="date"
                    label="Date"
                    dataCy="date-input"
                    required
                    rules={{
                      required: 'Date of delivery is a required field',
                      validate: validateDate,
                    }}
                    disablePast
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={6}
                  sx={inputStyle}
                >
                  <AutocompleteInput
                    name="city"
                    label="City"
                    options={optionsAutocomplete}
                    dataCy="city-input"
                    required
                    rules={{
                      required: 'City of delivery is a required field',
                    }}
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  sx={inputStyle}
                >
                  <FileInput
                    name="file"
                    dataCy="file-input"
                    rules={{ required: 'A file is required' }}
                  />
                </Grid>
              </Fragment>

            )}
            <Grid
              item
              sx={{
                marginTop: '20px',
                marginLeft: 'auto',
                marginRight: 'auto',
              }}
            >
              <Button
                type="submit"
                variant="outlined"
                data-cy="submit-button"
                sx={{
                  backgroundColor: 'black',
                  color: 'white',
                  '&:hover': {
                    backgroundColor: 'inherit',
                    color: 'black',
                  },
                  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                  borderRadius: '10px',
                }}
              >
                Submit
              </Button>
              <Button
                variant="outlined"
                sx={{
                  marginLeft: '30px',
                  marginRight: 'auto',
                  backgroundColor: 'black',
                  color: 'white',
                  '&:hover': {
                    backgroundColor: 'inherit',
                    color: 'black',
                  },
                  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                  borderRadius: '10px',
                }}
                onClick={handleReset}
              >Reset</Button>
            </Grid>
          </Grid>
        </form>
      </FormProvider>
      <Snackbar
        open={snackbarOpen}
        severity={snackbarSeverity}
        message={snackbarMessage}
        handleClose={handleCloseSnackbar}
      />
    </Box>
  );
};

export default Home;
