import {ReactElement, useEffect} from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import GoogleIcon from '@mui/icons-material/Google';
import Typography from '@mui/material/Typography';
import {useNavigate} from "react-router-dom";
import {useAuth} from "../providers/AuthProvider.tsx";
const Login = (): ReactElement => {
  const navigate = useNavigate();
  const { currentUser, googleLogin } = useAuth();

  useEffect(() => {
    if (currentUser) {
      navigate('/');
    }
  }, [currentUser]);

  return (
    <>
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Button type="button" onClick={googleLogin}>
          <Typography>Login with </Typography>
          <GoogleIcon />
        </Button>
      </Box>
    </>
  );
};

export default Login;