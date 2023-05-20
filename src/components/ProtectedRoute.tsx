import { useEffect } from "react";
import {
  useNavigate
} from 'react-router-dom';
import {useAuth} from "../providers/AuthProvider.tsx";

const ProtectedRoute = ({ children }) => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (!currentUser) {
      return navigate('/login');
    }
  }, [currentUser]);

  return children;
};

export default ProtectedRoute;