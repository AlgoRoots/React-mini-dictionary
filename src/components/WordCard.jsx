// 힘스향 component에 ref를 사용하여 넘기고 싶을 때 사용한다.
// 함수형 컴포넌트는 인스턴스가 없어서 ref속성을 사용할 수 없다.
// https://merrily-code.tistory.com/121

import React, { forwardRef } from "react";
import styled, { css } from "styled-components";
import { Link } from "react-router-dom";

// react = icons

//redux
import { useDispatch } from "react-redux";
import { addBookMarkFB, deleteWordFB } from "../redux/modules/words";

// react = icons
import {
  BsFillBookmarkFill,
  BsThreeDotsVertical,
  BsX,
  BsBookmark,
} from "react-icons/bs";
import { TiTickOutline, TiTick, TiEdit, TiTimes } from "react-icons/ti";
import { MdModeEdit } from "react-icons/md";
import { IconBase } from "react-icons/lib";

// elements
import Button from "../elements/Button";

// 함수형 컴포넌트를 forwardRef를 통해 Home에 보낸것 ref인자전달 매개변수?
const WordCard = forwardRef(({ word_obj }, ref) => {
  // const word_lists = useSelector((state) => state.words.word_list);
  // console.log(word_lists);
  const dispatch = useDispatch();

  // 북마크 체크 toggle함수
  const toggleCheck = (word) => {
    dispatch(addBookMarkFB(word));
  };

  // 단어 삭제 함수
  const deleteCard = (id) => {
    dispatch(deleteWordFB(id));
  };
  // ES6 구조분해 할당 . 가독성 높임
  const { word, tag, meaning, detail, id, bookmark } = word_obj;
  return (
    // 여기서 ref보냄
    //  // location.state. 이용했음 line 49
    <Card ref={ref} bookmark={`${bookmark}`}>
      <CardHeader>
        <Title>
          <h1>{word}</h1>
          <p>#{tag}</p>
        </Title>
        <div>
          <button onClick={() => toggleCheck(word_obj)}>
            {bookmark ? <AfterCheck /> : <BeforeCheck />}
          </button>

          <Link to={`/word/${id}/edit`} state={{ word_obj }}>
            <Edit bookmark={`${bookmark}`} />
          </Link>
          <button onClick={() => deleteCard(id)}>
            <Delete bookmark={`${bookmark}`} />
          </button>
        </div>
      </CardHeader>
      <WordArea bookmark={`${bookmark}`}>{meaning}</WordArea>

      <Button
        text="more detail"
        _onClick={() => {
          window.open(`${detail}`);
        }}
        bookmark={`${bookmark}`}
      ></Button>
    </Card>
  );
});

const Card = styled.article`
  ${({ bookmark, theme }) => {
    const { colors, device } = theme;
    return css`
      min-height: 100%;
      display: flex;
      flex-direction: column;

      position: relative;
      top: 0;
      width: 100%;
      height: 250px;
      border-radius: 10px;
      background-color: ${colors.white};
      transition: 300ms eash-in-out;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
      overflow: hidden;
      ${device.tablet} {
        width: calc((100% - 20px) / 3);
      }

      ${device.desktop} {
        width: calc((100% - (20px * 2)) / 5);
      }

      &:hover {
        top: -2px;
        box-shadow: 0 4px 5px rgba(0, 0, 0, 0.2);
      }
    `;
  }}
`;

const CardHeader = styled.div`
  ${({ theme }) => {
    const { colors, device, fontSizes } = theme;
    return css`
      background-color: ${colors.green};
      padding: 1rem;
      width: 100%;
      background-size: cover;
      display: flex;
      justify-content: space-between;
      font-size: ${fontSizes.xl};
      color: ${colors.white};
      font-weight: 600;
    `;
  }}
`;

const Title = styled.div`
  ${({ theme }) => {
    const { colors, device, fontSizes } = theme;
    return css`
      & > p {
        font-size: ${fontSizes.xs};
        padding-top: 0.5rem;
      }
    `;
  }}
`;
const BtnBox = styled.div`
  position: absolute;
  top: 15px;
  right: 15px;
  padding: 20px;
  display: flex;
  align-items: center;
`;

const WordArea = styled.div`
  ${({ theme }) => {
    const { colors, device, fontSize } = theme;
    return css`
      display: flex;
      flex-direction: column;
      flex: 1;
      padding: 1rem;
    `;
  }}
`;

const BeforeCheck = styled(TiTickOutline)`
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.fontSizes.xl};
`;

const AfterCheck = styled(BsFillBookmarkFill)`
  color: ${({ theme }) => theme.colors.darkGrey};
  font-size: ${({ theme }) => theme.fontSizes.xl};
`;

const Icons = css`
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.fontSizes.xl};
`;

const Edit = styled(TiEdit)`
  ${Icons}
`;
const Delete = styled(TiTimes)`
  ${Icons}
`;

export default WordCard;
