import { RouterProvider } from "react-router";
import { router } from "./routes";
import { StockProvider } from "./contexts/StockContext";

const App = () => {
  return (
    <StockProvider>
      <RouterProvider router={router} />
    </StockProvider>
  );
};

export default App;
