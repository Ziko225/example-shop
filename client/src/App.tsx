import { BrowserRouter } from "react-router-dom";
import AppRouter from "./components/AppRouter";
import { AuthContext } from "./context/AuthContext";
import { useAuth } from "./hooks/useAuth";
import NavBar from "./components/NavBar";
import { GlobalStyle } from "./GlobalStyle";
import { ShoppingCartContext } from "./context/ShoppingCartContext";
import useShoppingCart from "./hooks/useShoppingCart";

function App() {
  const auth = useAuth();
  const shoppingCart = useShoppingCart();

  return (
    <BrowserRouter>
      <GlobalStyle />
      <AuthContext.Provider value={auth}>
        <ShoppingCartContext.Provider value={shoppingCart}>
          <NavBar />
          <AppRouter />
        </ShoppingCartContext.Provider>
      </AuthContext.Provider>
    </BrowserRouter>
  );
}

export default App;