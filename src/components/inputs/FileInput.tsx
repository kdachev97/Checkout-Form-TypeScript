import Dropzone from 'react-dropzone';
import {
  Controller,
  FieldValues,
  RegisterOptions,
  useFormContext,
} from 'react-hook-form';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import CloudUpload from '@mui/icons-material/CloudUpload';
import DeleteIcon from '@mui/icons-material/Delete';
import InsertDriveFile from '@mui/icons-material/InsertDriveFile';

interface FileInputProps {
  name: string;
  dataCy?: string;
  defaultValue?: string;
  rules?: Omit<RegisterOptions<FieldValues, string>, 'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'> | undefined;
}

const FileInput = ({
  name,
  rules,
  dataCy,
  defaultValue,
}: FileInputProps) => {
  const {
    control,
  } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      defaultValue={defaultValue}
      render={({
        field: { onChange, value, ...field },
        fieldState: { invalid, error },
      }) => (
        <FormControl
          fullWidth
          data-cy={dataCy}
          sx={{
            marginTop: '15px',
            marginBottom: '15px',
          }}
        >
          <Dropzone
            {...field}
            onDrop={(acceptedFile) => {
              onChange(acceptedFile[0]);
            }}
            multiple={false}
          >
            {({ getRootProps, getInputProps }) => (
              <Paper
                variant="outlined"
                {...getRootProps()}
                sx={{
                  backgroundColor: '#eee',
                  textAlign: 'center',
                  cursor: 'pointer',
                  color: '#333',
                  padding: '10px',
                  border: '1.5px solid',
                  borderRadius: '10px',
                }}
              >
                <CloudUpload
                  sx={{
                    marginTop: '16px',
                    color: '#888',
                    fontSize: '42px',
                  }}
                />
                <input
                  {...getInputProps()}
                  name={name}
                />
                <Typography>
                  Drag and drop files here or click to select files.*
                </Typography>
              </Paper>
            )}
          </Dropzone>
          {value !== null && (
            <Box
              sx={{
                display: 'flex',
                marginTop: '15px',
              }}
              data-cy="file-attached"
            >
              <InsertDriveFile />
              <Typography>{value?.name}</Typography>
              <DeleteIcon
                sx={{
                  cursor: 'pointer',
                  marginLeft: 'auto',
                }}
                data-cy="delete-file"
                onClick={() => onChange(null)}
              />
            </Box>
          )}
          {error && (
            <FormHelperText
              error={invalid}
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

FileInput.defaultProps = {
  rules: {},
  dataCy: '',
  defaultValue: null,
};

export default FileInput;
