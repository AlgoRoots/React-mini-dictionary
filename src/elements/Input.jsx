import React, { forwardRef, useState } from "react";
import styled from "styled-components";

// 상위 컴포넌트에서 하위 컴포넌트의 리액트 요소를 참조(ref)하기 위해 forwardRef 사용
const Input = forwardRef((props, ref) => {
  const { title, idText, currentValue } = props;

  // 수정인 경우에는 기존 값을, 새로 등록하는 경우에는 빈 문자열을 value로 함
  const [value, setValue] = useState(currentValue ? currentValue : "");

  // input의 값이 변할 때마다 value값 변경
  const inputChange = (e) => setValue(e.target.value);

  return (
    <Container>
      <Label htmlFor={idText}>{title}</Label>
      <InputEl
        type="text"
        id={idText}
        ref={ref}
        onChange={inputChange}
        value={value}
      />
    </Container>
  );
});

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

const Label = styled.label`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: 600;
  margin-bottom: 5px;
  text-align: left: ;
`;

const InputEl = styled.input`
  height: 20px;
  padding: 5px 0;
  border-bottom: 2px solid ${({ theme }) => theme.colors.yellow};
  font-weight: 500;
  width: 100%;
  font-size: ${({ theme }) => theme.fontSizes.md};
  transition: border-color 300ms ease-in-out;

  &:focus {
    border-color: ${({ theme }) => theme.colors.green};
  }
`;

export default Input;
