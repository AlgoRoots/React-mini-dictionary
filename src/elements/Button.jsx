import { css } from "styled-components";

export const Button = css`
  color: ${({ theme }) => theme.colors.white};
  background-color: ${({ theme }) => theme.colors.green};
  border-radius: 2rem;
  font-weight: 600;
`;

export const RoundBtn = css`
  ${Button};
  width: 50px;
  height: 50px;
  border-radius::50%;
`;

export const CardBtn = css`
  ${Button};
  width: 200px;
  height: 40px;
  border-radius: 55px;
  font-size: ${({ theme }) => theme.fontSizes.md};
`;
