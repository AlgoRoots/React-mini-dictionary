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
import { BsFillBookmarkFill } from "react-icons/bs";
import { TiTimes } from "react-icons/ti";
import { AiTwotoneEdit } from "react-icons/ai";

// elements
import Button from "../elements/Button";

// React 컴포넌트에서 ref prop을 사용하려면 React에서 제공하는 forwardRef()라는 함수를 사용해야 합니다.
//  React 컴포넌트를 forwardRef()라는 함수로 감싸주면, 해당 컴포넌트는 함수는 두 번째 매개 변수를 갖게
//  되는데, 이를 통해 외부에서 ref prop을 넘길 수 있습니다.

// 함수형 컴포넌트를 forwardRef를 통해 Form데이터를 받아온다? ref인자전달 매개변수?

const WordCard = forwardRef(({ word_obj }, ref) => {
  // const word_lists = useSelector((state) => state.words.word_list);
  // console.log(word_lists);
  // console.log("ddd", ref);
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
  const { word, tag, meaning, detail, id, bookmark, bgColor } = word_obj;
  return (
    // 여기서 ref보냄
    //  // location.state. 이용했음 line 49
    <Card ref={ref} bookmark={`${bookmark}`}>
      <CardHeader bookmark={`${bookmark}`} bgColor={bgColor}>
        <Title>
          <h1>{word}</h1>
          <p>#{tag}</p>
        </Title>
        <BtnBox>
          <BtnCircleBg onClick={() => toggleCheck(word_obj)}>
            {bookmark ? <AfterCheck /> : <BeforeCheck />}
          </BtnCircleBg>

          <Link to={`/word/${id}/edit`} state={{ word_obj }}>
            <BtnCircleBg>
              <Edit bookmark={`${bookmark}`} />
            </BtnCircleBg>
          </Link>
          <BtnCircleBg onClick={() => deleteCard(id)}>
            <Delete bookmark={`${bookmark}`} />
          </BtnCircleBg>
        </BtnBox>
      </CardHeader>
      <WordArea bookmark={`${bookmark}`}>{meaning}</WordArea>

      <Button
        text="Learn more"
        _onClick={() => {
          window.open(`${detail}`);
        }}
        bookmark={`${bookmark}`}
        bgColor={bgColor}
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
      margin-bottom: 20px;
      position: relative;
      top: 0;
      width: 100%;
      height: 280px;
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
  ${({ bookmark, theme, bgColor }) => {
    const { colors, device, fontSizes } = theme;

    // const headerColors = [colors.green, colors.blue, colors.warmGrey];
    // const randomColors =
    //   headerColors[Math.floor(Math.random() * headerColors.length)];
    return css`
      /* //background-color: ${bookmark === "false"
        ? colors.green
        : colors.blue}; */
      background: ${bgColor === 1
        ? colors.warmGrey
        : bgColor === 2
        ? colors.blue
        : colors.green};
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
  display: flex;
  align-items: center;
`;

const WordArea = styled.div`
  ${({ theme }) => {
    const { colors, device, fontSizes } = theme;
    return css`
      display: flex;
      flex-direction: column;
      flex: 1;
      padding: 1rem;
      overflow: auto;
      font-size: ${fontSizes.sm};
    `;
  }}
`;

// btn
const BtnCircleBg = styled.button`
  width: 1.6em;
  height: 1.6em;
  padding: 0;
  margin-right: 6px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.lightGrey};
  ${({ theme }) => theme.device.tablet} {
    width: 1.2em;
    height: 1.2em;
    margin-right: 4px;
  }
`;

const BeforeCheck = styled(BsFillBookmarkFill)`
  width: 0.6em;
  vertical-align: middle;
  padding-bottom: 4px;
  color: ${({ theme }) => theme.colors.mediumGrey};
  font-size: ${({ theme }) => theme.fontSizes.xl};
`;

const AfterCheck = styled(BsFillBookmarkFill)`
  width: 0.6em;
  vertical-align: middle;
  padding-bottom: 4px;
  color: ${({ theme }) => theme.colors.yellow};
  font-size: ${({ theme }) => theme.fontSizes.xl};
`;

const Icons = css`
  width: 0.9em;
  vertical-align: middle;
  padding-bottom: 3px;

  color: ${({ theme }) => theme.colors.mediumGrey};
  font-size: ${({ theme }) => theme.fontSizes.xl};
  text-align: center;
`;

const Edit = styled(AiTwotoneEdit)`
  ${Icons}
`;
const Delete = styled(TiTimes)`
  ${Icons}
`;

export default WordCard;
