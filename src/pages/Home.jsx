import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

//redux
import { useSelector } from "react-redux";

import styled from "styled-components";
import { TiPlus } from "react-icons/ti";

// components & elements
import WordCard from "../components/WordCard";
import Button from "../elements/Button";

const Home = (props) => {
  const words = useSelector((state) => state.words.word_list);

  return (
    <div>
      <React.StrictMode>
        <Cards>
          {words.map((word, idx) => {
            return <WordCard key={word.id} word_obj={word} />;
          })}
        </Cards>
        <Link to="/word/add">
          <Button is_add>
            <Plus />
          </Button>
        </Link>
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

const Plus = styled(TiPlus)`
  font-size: 28px;
`;

const ItemStyle = styled.div`
  padding: 16px;
  margin: 8px;
  background-color: aliceblue;
`;
export default Home;
