import React, { useRef } from "react";
import styled, { css } from "styled-components";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

// redux
import { addWord, addWordFB, modifyWordFB } from "../redux/modules/words";

// components % elements
import Button from "../elements/Button";
import Input from "../elements/Input";

{
  /* <Link to={`/word/${id}/edit`} state={{ word_obj }}>
            <BtnCircleBg>
              <Edit bookmark={`${bookmark}`} />
            </BtnCircleBg>
</Link> */
}

// location : https://blog.doitreviews.com/development/2020-03-07-react-router/

const Form = (props) => {
  const data = useLocation().state
    ? useLocation().state.word_obj
    : useLocation().state;

  //const data = useLocation().state.word_obj;

  // console.log("id", data.word_obj.id);
  // console.log("data state", data === null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const wordRef = useRef(null);
  const tagRef = useRef(null);
  const meaningRef = useRef(null);
  const detailRef = useRef(null);

  const getFormData = () => {
    const word = wordRef.current.value.trim();
    const tag = tagRef.current.value.trim();
    const meaning = meaningRef.current.value.trim();
    const detail = detailRef.current.value.trim();
    //console.log(word, tag, meaning, detail);

    if (!word || !tag || !meaning || !detail) {
      alert("아직 입력하지 않은 항목이 있습니다. ");
      return false;
    }

    const word_obj = {
      word,
      tag,
      meaning,
      detail,
      bgColor: Math.floor(Math.random() * 3) + 1,
    };
    return word_obj;
  };

  // 단어 등록 함수
  const submitWord = (e) => {
    e.preventDefault();

    const word_obj = getFormData();
    if (!word_obj) return;

    const new_word_obj = { ...word_obj, date: Date.now(), bookmark: false };
    dispatch(addWordFB(new_word_obj));
    navigate("/");
  };

  // 단어 수정 함수
  const modifyWord = (e) => {
    e.preventDefault();

    const word_obj = getFormData();
    if (!word_obj) return;

    dispatch(modifyWordFB(word_obj, data.id));
    navigate("/");
  };
  return (
    <Container>
      <Title>{data ? "단어 수정하기" : "단어 추가하기"}</Title>
      <FormContainer
        onSubmit={data ? modifyWord : submitWord}
        autocomplete="off"
      >
        <Input
          title="Word"
          idText="input-word"
          ref={wordRef}
          currentValue={data && data.word}
        />
        <Input
          title="Tag"
          idText="input-tag"
          ref={tagRef}
          currentValue={data && data.tag}
        />
        <Input
          title="Description"
          idText="input-meaning"
          ref={meaningRef}
          currentValue={data && data.meaning}
        />
        <Input
          title="Link"
          idText="input-detail"
          ref={detailRef}
          currentValue={data && data.detail}
        />
        <Margin />
        <Button type="submit" text="저장하기">
          {data ? "수정하기" : "저장하기"}
        </Button>
      </FormContainer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 400px;
  margin: 180px auto;
  padding: 0 30px;
  background: ${({ theme }) => theme.colors.white};
  border-radius: 1rem;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);

  ${({ theme }) => theme.device.tablet} {
    margin: 150px auto;
    max-width: 600px;
  }

  animation: fadeInBottom 1s;
  transform: translateY(0%);
  @keyframes fadeInBottom {
    from {
      opacity: 0;
      transform: translateY(30%);
    }
    to {
      opacity: 1;
    }
  }
`;

const Title = styled.h2`
  margin: 60px auto;
  font-size: 20px;
  font-weight: 600;
  text-align: center;
`;

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
`;

const Margin = styled.div`
  margin: 10px;
`;

export default Form;
