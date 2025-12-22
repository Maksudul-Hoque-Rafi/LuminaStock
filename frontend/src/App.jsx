import { RouterProvider } from "react-router";
import { router } from "./routes";
import { StockProvider } from "./contexts/StockContext";
import { AuthContextProvider } from "./contexts/AuthContext";

const App = () => {
  return (
    <AuthContextProvider>
      <StockProvider>
        <RouterProvider router={router} />
      </StockProvider>
    </AuthContextProvider>
  );
};

export default App;
