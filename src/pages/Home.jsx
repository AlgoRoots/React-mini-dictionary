import React, { useState, useEffect } from "react";
import { BsWordpress } from "react-icons/bs";
import styled from "styled-components";

// components
import WordCard from "../components/WordCard";

const Home = (props) => {
  return (
    <div>
      <React.StrictMode>
        <Cards>
          <WordCard />
          <WordCard />
          <WordCard />
          <WordCard />
          <WordCard />
          <WordCard />
          <WordCard />
        </Cards>
      </React.StrictMode>
    </div>
  );
};

const Cards = styled.div`
  margin: 100px auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  gap: 20px;
  width: 100%;
  padding: 50px 0;
`;

export default Home;
