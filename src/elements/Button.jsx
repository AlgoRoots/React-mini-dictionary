import React from "react";
import styled from "styled-components";
import { css } from "styled-components";

const Button = (props) => {
  // children 왜하는지 잘 이해 안된다..
  const { text, _onClick, is_add, children } = props;

  if (is_add) {
    return (
      <React.Fragment>
        <RoundBtn onClick={_onClick}>{text ? text : children}</RoundBtn>
      </React.Fragment>
    );
  }

  // const styles = {
  //   margin: margin,
  //   width: width,
  //   padding: padding,
  // };

  return (
    <React.Fragment>
      <CardBtn onClick={_onClick}>{text ? text : children}</CardBtn>
    </React.Fragment>
  );
};

Button.defaultProps = {
  text: false,
  children: null,
  _onClick: () => {},
  is_add: false,
  margin: false,
  width: "100%",
  padding: "12px 0px",
};

const Btn = css`
  color: ${({ theme }) => theme.colors.white};
  font-weight: 600;
`;

const RoundBtn = styled.button`
  ${Btn};
  position: fixed;
  bottom: 15px;
  right: 15px;

  width: 50px;
  height: 50px;
  border-radius: 50%;

  ${({ theme }) => {
    const { colors, device } = theme;

    return css`
      background-color: ${colors.darkGrey};
      ${device.tablet} {
        /* bottom: 20px;
        right: 20px; */
      }
    `;
  }}
`;

const CardBtn = styled.button`
  ${({ theme }) => {
    const { colors, device, fontSizes } = theme;
    return css`
      ${Btn};
      border-radius: 2rem;
      height: 2rem;
      width: 12rem;
      background-color: ${colors.green};
      font-size: ${fontSizes.md};
      ${device.tablet} {
        width: 8rem;
      }
      margin-bottom: 1rem;
    `;
  }}
`;

export default Button;
