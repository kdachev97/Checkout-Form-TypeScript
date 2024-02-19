import {
  Controller,
  FieldValues,
  RegisterOptions,
  useFormContext,
} from 'react-hook-form';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

interface SelectOptions {
  value: string;
  label: string;
}

interface SelectInputProps {
  name: string;
  label: string;
  dataCy?: string;
  defaultValue?: string;
  required?: boolean;
  rules?: Omit<RegisterOptions<FieldValues, string>, 'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'> | undefined;
  options: SelectOptions[];
}

const SelectInput = ({
  name,
  label,
  options,
  rules,
  defaultValue,
  dataCy,
}: SelectInputProps) => {
  const {
    control,
  } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      defaultValue={defaultValue}
      render={({ field: { value, onChange, ...field }, fieldState: { error, invalid } }) => (
        <FormControl
          fullWidth
        >
          <InputLabel
            sx={{
              marginTop: '15px',
              marginBottom: '15px',
            }}
            error={invalid}
            required={!!rules?.required}
          >
            {label}
          </InputLabel>
          <Select
            {...field}
            onChange={e => onChange(e.target.value)}
            value={value}
            label={label}
            data-cy={dataCy}
            fullWidth
            error={invalid}
            sx={{
              marginTop: '15px',
              marginBottom: '0px',
              backgroundColor: '#eee',
            }}
          >
            {options.map((option) => (
              <MenuItem
                key={option.value}
                value={option.value}
              >
                {option.label}
              </MenuItem>
            ))}
          </Select>
          {error && (
            <FormHelperText
              data-cy='select-input-helper-text'
              sx={{
                color: '#d32f2f',
                marginLeft: '15px',
              }}
            >
              {error?.message}
            </FormHelperText>
          )}
        </FormControl>
      )}
    />
  );
};

SelectInput.defaultProps = {
  rules: {},
  defaultValue: '',
  dataCy: '',
  required: false,
};

export default SelectInput;
