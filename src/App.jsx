import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import styled, { ThemeProvider } from "styled-components";
import "./App.css";

// components
import Home from "./pages/Home";
import Header from "./components/Header";

// style
import GlobalStyles from "./styled/GlobalStyles";
import theme from "./styled/theme";

function App() {
  const [count, setCount] = useState(0);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Header />
      <Container>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/word/add" element={<Form />} /> */}
        </Routes>
      </Container>
    </ThemeProvider>
  );
}

const Container = styled.div`
  background-color: #f1f3f4;
  ${({ theme }) => theme.device.tablet} {
  }
  ${({ theme }) => theme.device.desktop} {
  }
`;

export default App;
