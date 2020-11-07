import axios from "axios";

const answers = axios.create({
  baseURL: "http://localhost:44444/answers/",
});

export const getAnswersOnQuestion = (questionId) => {
  return answers.get("?questionId=" + questionId);
};

export const createNewAnswer = (answer) => {
  return answers.post("", answer);
};
