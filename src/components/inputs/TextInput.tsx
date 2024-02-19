import {
  Controller,
  FieldValues,
  RegisterOptions,
  useFormContext,
} from 'react-hook-form';
import TextField from '@mui/material/TextField';

interface TextInputProps {
  name: string;
  label: string;
  type?: string;
  dataCy?: string;
  defaultValue?: string;
  multiline?: boolean;
  required?: boolean;
  rules?: Omit<RegisterOptions<FieldValues, string>, 'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'> | undefined;
}
const TextInput = ({
  name,
  label,
  type,
  dataCy,
  defaultValue,
  multiline,
  rules,
}: TextInputProps) => {
  const {
    control,
  } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      defaultValue={defaultValue}
      render={({ field, fieldState: { invalid, error } }) => (
        <TextField
          {...field}
          label={label}
          variant="outlined"
          fullWidth
          required={!!rules?.required}
          autoComplete="off"
          data-cy={dataCy}
          InputProps={{
            sx: {
              backgroundColor: '#eee',
            },
          }}
          sx={{
            marginTop: '15px',
            marginBottom: '15px',
          }}
          type={type}
          multiline={multiline}
          error={invalid}
          helperText={error && error?.message}
        />
      )}
    />
  );
};

TextInput.defaultProps = {
  multiline: false,
  type: 'text',
  rules: {},
  dataCy: '',
  defaultValue: '',
  required: false,
};

export default TextInput;
