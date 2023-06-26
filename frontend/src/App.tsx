import { Suspense, lazy } from "react";
import type { FC } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import RootLayout from "components/RootLayout";

import "./styles/colors.scss";
import "./styles/styles.scss";

const Home = lazy(() => import("./pages/Home"));
const Order = lazy(() => import("pages/Order"));

const App: FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<RootLayout />}>
          <Route
            path="/home"
            element={
              <Suspense>
                <Home />
              </Suspense>
            }
          />
          <Route
            path="/receipt"
            element={
              <Suspense>
                <Order />
              </Suspense>
            }
          />
          <Route path="/" element={<Navigate to="/home" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
