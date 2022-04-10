// widgets.js
import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  orderBy,
} from "firebase/firestore";

import { db } from "../../firebase";

// Actions
const LOAD = "words/LOAD";
const ADD = "words/ADD";
const MODIFY = "words/MODIFY";
const BOOKMARK = "words/BOOKMARK";
const DELETE = "words/DELETE";
const LOADED = "LOADED";

const initialState = {
  is_loaded: false,
  word_list: [
    // {
    //   word: "TDD",
    //   tag: "#개발용어",
    //   meaning:
    //     "Test Driven Development - 개발을 하기 전에 테스트 코드를 먼저 짜본다는 아이디어에서 시작한 개념. [디자인 > 테스트 > 코드작성]의 과정이다.",
    //   detailLink:
    //     "https://brunch.co.kr/@freeism/19#:~:text=%EA%B0%9C%EB%B0%9C%EC%9E%90%EB%93%A4%EC%9D%98%20%EA%B0%9C%EB%B0%9C%EB%B0%A9%EB%B2%95%EB%A1%A0%20%EC%A4%91%EC%97%90,%ED%95%98%EA%B2%8C%20%EB%90%9C%EB%8B%A4%EB%8A%94%20%EA%B0%9C%EB%B0%9C%EB%B0%A9%EB%B2%95%EB%A1%A0%EC%9D%B4%EB%8B%A4.",
    // },
  ],
};

// Action Creators

export function loadWords(word_list) {
  return { type: LOAD, word_list };
}

export function addWord(word) {
  return { type: ADD, word };
}

export const modifyWord = (wordData, id) => ({ type: MODIFY, wordData, id });
export const addBookMark = (id) => ({ type: BOOKMARK, id });
export const deleteWord = (id) => ({ type: DELETE, id });
export const isLoaded = (isLoaded) => ({ type: LOADED, isLoaded });

//middlewares
export const loadWordsFB = () => {
  return async function (dispatch) {
    const word_data = await getDocs(
      collection(db, "dictionary"),
      orderBy("createAt", "desc")
    );
    let word_list = [];

    word_data.forEach((word) => {
      //console.log(word.id, word.data());
      word_list.push({ id: word.id, ...word.data() });
    });

    // console.log(word_list);
    dispatch(loadWords(word_list));
  };
};

export const addWordFB = (word) => {
  return async function (dispatch) {
    console.log("word", word);
    const docRef = await addDoc(collection(db, "dictionary"), word);
    // const _word = await getDoc(docRef);
    const word_data = { id: docRef.id, ...word };

    // console.log(word_data);
    dispatch(addWord(word_data));
  };
};

// 단어 내용 변경 함수
export const modifyWordFB = (wordData, id) => {
  console.log(wordData, id);
  return async function (dispatch) {
    const docRef = doc(db, "dictionary", id);

    await updateDoc(docRef, wordData);

    dispatch(modifyWord(wordData, id));
  };
};

// 단어 북마크 함수
export const addBookMarkFB = (word) => {
  return async function (dispatch) {
    // console.log(word);
    const docRef = doc(db, "dictionary", word.id);
    await updateDoc(docRef, { bookmark: !word.bookmark });

    // const _word_list = getState().words.list;
    // const word_idx = _word_list.findIndex((item) => {
    //   return item.id === word.id;
    // });
    // console.log(word_idx);
    dispatch(addBookMark(word.id));
  };
};

//단어 삭제 함수
export const deleteWordFB = (id) => {
  return async function (dispatch) {
    if (!id) {
      window.alert("아이디가 없네요!");
      return;
    }
    const docRef = doc(db, "dictionary", id);

    await deleteDoc(docRef);
    dispatch(deleteWord(docRef.id));
  };
};
// Reducer
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    // do reducer stuff
    case "words/LOAD":
      return { word_list: action.word_list, is_loaded: true };

    case "words/ADD":
      const new_words_list = [action.word, ...state.word_list];
      return { word_list: new_words_list, is_loaded: true };

    case MODIFY:
      let modified_words = state.word_list.map((word) =>
        word.id === action.id ? { ...word, ...action.wordData } : word
      );

      return {
        ...state,
        word_list: modified_words,
      };

    case "words/BOOKMARK":
      const new_word_list = state.word_list.map((word) =>
        word.id === action.id ? { ...word, bookmark: !word.bookmark } : word
      );
      return {
        ...state,
        word_list: new_word_list,
      };

    case DELETE:
      let left_words = state.word_list.filter((word) => word.id !== action.id);
      return {
        ...state,
        word_list: left_words,
      };
    default:
      return state;
  }
}
