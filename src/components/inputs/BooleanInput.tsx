import {
  Controller,
  useFormContext,
  RegisterOptions,
  FieldValues,
} from 'react-hook-form';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';

interface BooleanInputProps {
  name: string;
  label: string;
  defaultValue?: boolean;
  dataCy?: string;
  required?: boolean;
  rules?: Omit<RegisterOptions<FieldValues, string>, 'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'> | undefined;
}

const BooleanInput = ({
  name,
  label,
  rules,
  dataCy,
  defaultValue,
}: BooleanInputProps) => {
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
        <FormControl
          fullWidth
        >
          <FormControlLabel
            label={label}
            sx={{
              marginTop: '15px',
              marginLeft: '0px',
            }}
            control={(
              <Checkbox
                {...field}
                required={!!rules?.required}
                checked={!!field.value}
                data-cy={dataCy}
              />
            )}
          />
          {error && (
            <FormHelperText
              error={invalid}
              sx={{
                color: '#d32f2f',
                marginLeft: '20px',
              }}
            >
              {error && error?.message}
            </FormHelperText>
          )}
        </FormControl>
      )}
    />
  );
};

BooleanInput.defaultProps = {
  rules: {},
  defaultValue: false,
  dataCy: '',
  required: false,
};

export default BooleanInput;
