import { BrowserRouter } from "react-router-dom";
import AppRouter from "./components/AppRouter";
import { AuthContext } from "./context/authContext";
import useAuth from "./hooks/useAuth";

function App() {
  const auth = useAuth();

  return (
    <BrowserRouter>
      <AuthContext.Provider value={auth}>
        <AppRouter />
      </AuthContext.Provider>
    </BrowserRouter>
  );
}

export default App;