import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import { Container, createTheme, ThemeProvider } from '@mui/material';
import { routes } from "./routes";
import {AuthProvider} from "./providers/AuthProvider";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar.tsx";

function App() {
  const theme = createTheme({});

  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
          <Router>
            <Routes>
              {routes.map((route) => (
                <Route
                  key={route.key}
                  path={route.path}
                  element={(
                    <ProtectedRoute>
                      <Navbar />
                      <Container>
                        <route.component />
                      </Container>
                    </ProtectedRoute>
                  )}
                />
              ))}
            </Routes>
          </Router>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
