import React from "react";
import styled from "styled-components";
import { css } from "styled-components";

const Button = (props) => {
  // children 왜하는지 잘 이해 안된다..
  const { text, _onClick, is_add, children } = props;
  const bgColor = { background: props.bgColor };
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
  vertical-align: middle;
  padding-top: 5px;

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
  animation: pulse 1s linear infinite;

  @keyframes pulse {
    0% {
      transform: scale(1.04);
      box-shadow: 0;
    }
    80% {
      transform: scale(0.9);
      box-shadow: 0 0 0 2px rgba(19, 18, 18, 0.2);
    }
    100% {
      transform: scale(1);
      box-shadow: 0 0 0 1px rgba(144, 144, 144, 0.6);
    }
  }
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
