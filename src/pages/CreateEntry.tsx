import {Box, Paper, TextField, Button, Input} from "@mui/material";
import * as yup from 'yup';
import {useFormik} from "formik";
import { collection, addDoc } from "firebase/firestore";
import { db, storage } from '../config/firebase';
import {useCallback, useState} from "react";
import Skeleton from '@mui/material/Skeleton';
import {useNavigate} from "react-router-dom";
import {useDropzone} from "react-dropzone";
import { ref, uploadBytes } from "firebase/storage";

const CreateEntry = () => {
  const [loading, setLoading] = useState(false);
  const validationSchema = yup.object({
    title: yup.string('Enter title'),
    description: yup.string('Description'),
  });
  const [imageId, setImageId] = useState<string | null>(null);
  const navigate = useNavigate();

  const formik = useFormik({
    validationSchema: validationSchema,
    initialValues: {
      title: '',
      description: '',
      date: new Date().toISOString().slice(0, 10),
    },
    onSubmit: async (values) => {
      try {
        setLoading(true);
        const docRef = await addDoc(collection(db, 'milestones'), {
          title: values.title,
          description: values.description,
          date: values.date,
          image: imageId
        });
        setLoading(false);
        navigate('/');
      } catch (e) {
        console.log(e);
      }
    }
  });

  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length === 1) {
      const storageRef = ref(storage, `memories/${acceptedFiles[0].path}`);
      uploadBytes(storageRef, acceptedFiles[0]).then((res) => {
        setImageId(res?.metadata?.fullPath);
      });
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, maxFiles: 1 });
  const containerStyle = {
    background: '#dadada',
    width: 250,
    height: 250,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 50,
    textAlign: 'center',
  }

  return (
    <Paper>
      <Box margin={4}>
        {loading ? <Skeleton variant="rectangular" width={210} height={118} /> : (<form onSubmit={formik.handleSubmit}>
          <div style={containerStyle} {...getRootProps()}>
            <input {...getInputProps()} />
            {isDragActive ? <p>Drop the files here ...</p> : <p>Drag 'n' drop some files here, or click to select files</p>}
          </div>
          <TextField
            fullWidth
            label="Title"
            name={'title'}
            type="text"
            value={formik.values.title}
            onChange={formik.handleChange}
            margin={'normal'}
          />
          <TextField
            fullWidth
            label="Description"
            type="text"
            name={'description'}
            value={formik.values.description}
            margin={'normal'}
            onChange={formik.handleChange}
          />
          <TextField
            label="Date"
            type="date"
            name={'date'}
            value={formik.values.date}
            margin={'normal'}
            onChange={formik.handleChange}
          />
          <Box marginY={2} paddingY={2}>
            <Button fullWidth type="submit" variant="contained">Publish Milestone</Button>
          </Box>
        </form>)}
      </Box>
    </Paper>
  );
};

export default CreateEntry;