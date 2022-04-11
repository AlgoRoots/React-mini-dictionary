import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import styled, { ThemeProvider } from "styled-components";
import "./App.css";

// redux
import { useSelector, useDispatch } from "react-redux";
import { loadWordsFB } from "./redux/modules/words";

// components
import Home from "./pages/Home";
import Form from "./pages/Form";
import Bookmark from "./pages/Bookmark";
import Header from "./components/Header";
import { db } from "./firebase";
import { collection, getDoc, getDocs, addDoc } from "firebase/firestore";

// style
import GlobalStyles from "./styled/GlobalStyles";
import theme from "./styled/theme";

function App() {
  const dispatch = useDispatch();
  const [count, setCount] = useState(0);

  React.useEffect(() => {
    dispatch(loadWordsFB());
  }, []);
  //NotFound넣기
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Header />
      <Container>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/word/add/*" element={<Form />} />
          <Route path="/word/:id/edit" element={<Form />} />
          <Route path="/bookmark" element={<Bookmark />} />
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
