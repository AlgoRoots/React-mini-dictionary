// 힘스향 component에 ref를 사용하여 넘기고 싶을 때 사용한다.
// 함수형 컴포넌트는 인스턴스가 없어서 ref속성을 사용할 수 없다.
// https://merrily-code.tistory.com/121

import React, { forwardRef } from "react";
import styled, { css } from "styled-components";

// react = icons

import { BsFillBookmarkFill, BsThreeDotsVertical, BsX } from "react-icons/bs";
import { MdModeEdit } from "react-icons/md";
import { IconBase } from "react-icons/lib";

const WordCard = (ref) => {
  // ES6 구조분해 할당 . 가독성 높임
  // const { word, meaning, completed, id } = word_obj;
  return (
    <Card>
      <CardHeader>
        <Title>
          <h1>TDD</h1>
          <p>#개발용어</p>
        </Title>
        <div>
          <button>❌</button>
          <button>⚙️</button>
        </div>
      </CardHeader>

      <WordArea>
        Test Driven Development - 개발을 하기 전에 테스트 코드를 먼저 짜본다는
        아이디어에서 시작한 개념. [디자인 > 테스트 > 코드작성]의 과정이다.
      </WordArea>
      <button>more detail</button>
    </Card>
  );
};

const Card = styled.article`
  ${({ completed, theme }) => {
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
  & > button {
    padding: 3 px;
  }
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

const BeforeCheck = styled(BsFillBookmarkFill)`
  color: ${({ theme }) => theme.colors.darkGrey};
  font-size: ${({ theme }) => theme.fontSizes.xl};
`;
// const AfterCheck = styled(BsFillBookmarkFill)`
//   color: ${({ theme }) => theme.colors.darkGrey};
//   font-size: ${({ theme }) => theme.fontSizes.xl};
// `;
export default WordCard;
