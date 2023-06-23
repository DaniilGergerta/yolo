import React from "react";
import "./styles/colors.scss";
import "./styles/styles.scss";
import Home from "./pages/Home";
import Header from "./components/Header";

const App = () => {
  return (
    <>
      <Header />
      <Home />
    </>
  );
};

export default App;
