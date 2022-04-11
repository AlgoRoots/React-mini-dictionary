import React from "react";
import styled, { css } from "styled-components";
import { Link } from "react-router-dom";
import { BsFillBookmarkFill } from "react-icons/bs";
const Header = (props) => {
  return (
    <HeaderContainer>
      <Link to="/">
        <Title> 개발 용어 사전</Title>
      </Link>
      <div>
        <Link to="/bookmark">
          <BtnCircleBg>
            <AfterCheck />
          </BtnCircleBg>
        </Link>
      </div>
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
      box-shadow: 0 2px 5px rgba(130, 130, 130, 0.1);
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

const AfterCheck = styled(BsFillBookmarkFill)`
  width: 0.6em;
  vertical-align: middle;
  padding-bottom: 4px;
  color: ${({ theme }) => theme.colors.yellow};
  font-size: ${({ theme }) => theme.fontSizes.xl};
`;
export default Header;
