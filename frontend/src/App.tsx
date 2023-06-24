import "./styles/colors.scss";
import "./styles/styles.scss";
import { Home } from "./pages/Home";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import RootLayout from "components/RootLayout";
import Order from "components/Order";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<RootLayout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/receipt" element={<Order />} />
          <Route path="/" element={<Navigate to="/home" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
