import {
  Controller,
  FieldValues,
  RegisterOptions,
  useFormContext,
} from 'react-hook-form';
import Autocomplete from '@mui/material/Autocomplete';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import TextField from '@mui/material/TextField';

interface AutocompleteOptions {
  value: string;
  label: string;
}

interface AutocompleteInputProps {
  name: string;
  label: string;
  dataCy?: string;
  defaultValue?: string;
  required?: boolean;
  rules?: Omit<RegisterOptions<FieldValues, string>, 'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'> | undefined;
  options: AutocompleteOptions[];
}

const AutocompleteInput = ({
  name,
  label,
  rules,
  options,
  dataCy,
  defaultValue,
}: AutocompleteInputProps) => {
  const {
    control,
  } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      defaultValue={defaultValue}
      render={({ field: { onChange, ...field }, fieldState: { error, invalid } }) => (
        <FormControl fullWidth>
          <Autocomplete
            {...field}
            options={options}
            data-cy={dataCy}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            onChange={(_, optionValue: AutocompleteOptions) => {
              onChange(optionValue?.value);
            }}
            renderInput={(
              params,
            ) => (
              <TextField
                {...params}
                required={!!rules?.required}
                label={label}
                sx={{
                  marginTop: '15px',
                  backgroundColor: '#eee',
                }}
                error={invalid}
              />
            )}
          />
          {error && (
            <FormHelperText
              error={invalid}
              sx={{
                color: '#d32f2f',
                marginLeft: '15px',
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

AutocompleteInput.defaultProps = {
  rules: {},
  dataCy: '',
  defaultValue: '',
  required: false,
};

export default AutocompleteInput;
