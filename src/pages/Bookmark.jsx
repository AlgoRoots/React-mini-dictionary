import React from "react";
import styled, { css } from "styled-components";
import { Link } from "react-router-dom";
import { BsFillBookmarkFill } from "react-icons/bs";
import { useSelector } from "react-redux";
import WordCard from "../components/WordCard";

const Bookmark = (props) => {
  const words = useSelector((state) => state.words.word_list);
  console.log(words);
  return (
    <div>
      <React.StrictMode>
        <Cards>
          {words
            .filter((word) => word.bookmark)
            .map((word, idx) => {
              return <WordCard key={word.id} word_obj={word} />;
            })}
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

export default Bookmark;
