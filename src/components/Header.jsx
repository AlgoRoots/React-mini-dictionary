import React from "react";
import styled, { css } from "styled-components";
import { Link } from "react-router-dom";

const Header = (props) => {
  return (
    <HeaderContainer>
      <Link to="/">
        <Title> 개발 용어 사전</Title>
      </Link>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.div`
  ${({ theme }) => {
    const { colors, device } = theme;
    return css`
      position: fixed;
      top: 0;
      left: 0;
      z-index: 10;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 30px;
      width: 100%;
      height: 100px;
      background-color: ${colors.headerBgColor};

      ${device.tablet} {
        height: 100px;
      }
    `;
  }}
`;

const Title = styled.h1`
  ${({ theme }) => {
    const { colors, device, fontSizes } = theme;
    return css`
      color: ${colors.black};
      font-size: ${fontSizes.lg};
      font-weight: 600;

      ${device.tablet} {
        font-size: ${fontSizes.xl};
      }
    `;
  }}
`;
export default Header;
