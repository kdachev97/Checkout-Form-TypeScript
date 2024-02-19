import {
  Controller,
  FieldValues,
  RegisterOptions,
  useFormContext,
} from 'react-hook-form';
import FormControl from '@mui/material/FormControl';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

interface DateInputProps {
  name: string;
  label: string;
  dataCy?: string;
  defaultValue?: string;
  required?: boolean;
  rules?: Omit<RegisterOptions<FieldValues, string>, 'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'> | undefined;
  disablePast?: boolean;
}

const DateInput = ({
  name,
  label,
  rules,
  disablePast,
  dataCy,
  defaultValue,
}: DateInputProps) => {
  const {
    control,
  } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      defaultValue={defaultValue}
      render={({ field, fieldState: { error, invalid } }) => (
        <FormControl
          fullWidth
          data-cy={dataCy}
          sx={{
            marginTop: '15px',
            marginBottom: '15px',
          }}
        >
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              {...field}
              label={label}
              disablePast={disablePast}
              slotProps={{
                textField: {
                  error: invalid,
                  required: !!rules?.required,
                  helperText: error?.message,
                  sx: {
                    '& .MuiInputBase-root': {
                      backgroundColor: '#eee',
                    }
                  },
                },
              }}
            />
          </LocalizationProvider>
        </FormControl>
      )}
    />

  );
};

DateInput.defaultProps = {
  rules: {},
  disablePast: false,
  dataCy: '',
  defaultValue: null,
  required: false,
};

export default DateInput;
