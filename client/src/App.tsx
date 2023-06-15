import { BrowserRouter } from "react-router-dom";
import AppRouter from "./components/AppRouter";
import { AuthContext } from "./context/authContext";
import { useAuth } from "./hooks/useAuth";
import NavBar from "./components/NavBar";
import { GlobalStyle } from "./GlobalStyle";

function App() {
  const auth = useAuth();

  return (
    <BrowserRouter>
      <GlobalStyle />
      <AuthContext.Provider value={auth}>
        <NavBar />
        <AppRouter />
      </AuthContext.Provider>
    </BrowserRouter>
  );
}

export default App;