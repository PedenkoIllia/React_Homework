import axios from "axios";

const questions = axios.create({
  baseURL: "http://localhost:44444/questions/",
});

export const getQuestions = () => {
  return questions.get("");
};

export const getQuestionById = (id) => {
  return questions.get(id);
};

export const createQuestion = (question) => {
  return questions.post("", question);
};

export const changeViews = (id, viewCount) => {
  return questions.patch("" + id, { viewCount: viewCount });
};

export const changeAnswers = (id, answerCount) => {
  return questions.patch("" + id, { answerCount: answerCount });
};

export const dateFormat = (date) => {
  const realDate = new Date(date);
  return realDate
    .toLocaleString("ru", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    })
    .replace(",", " at");
};
