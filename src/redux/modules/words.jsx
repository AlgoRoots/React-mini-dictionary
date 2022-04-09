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
const REMOVE = "words/REMOVE";
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

export const modifyWord = (word) => ({ type: MODIFY, word });
export const isLoaded = (isLoaded) => ({ type: LOADED, isLoaded });

// React.useEffect(async () => {
//   console.log(db);

//   const query = await getDocs(collection(db, "dictionary"));
//   console.log(query);
//   query.forEach((doc) => {
//     console.log(doc.id, doc.data());
//   });
// }, []);

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
export const modifyWordFB = (word, id) => {
  return function (dispatch) {
    words_db.doc(id).update(word);
    const new_word = { ...word, id };
    dispatch(modifyWord(new_word));
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

    // case "word/MODIFY":
    //   let modified_words = state.word_list.map((word) =>
    //     word.id === action.word.id ? { ...word, ...action.word } : word
    //   );
    //   return {
    //     ...state,
    //     word_list: modified_words,
    //   };
    default:
      return state;
  }
}
