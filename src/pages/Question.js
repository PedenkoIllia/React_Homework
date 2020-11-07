import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import {
  createNewAnswer,
  getAnswersOnQuestion,
} from "../services/AnswerService";
import {
  dateFormat,
  getQuestionById,
  changeViews,
  changeAnswers,
} from "../services/QuestionService";
import Post from "../components/Post";
import "./Question.css";

function Question() {
  const { id } = useParams();
  const firstUpdate = useRef(true);
  const [question, setQuestion] = useState(null);
  const [answers, setAnswers] = useState(null);
  const [author, setAuthor] = useState("");
  const [text, setText] = useState("");
  const [newAnswerId, setNewAnswer] = useState(0);

  const authorChange = (e) => {
    const { target } = e;
    setAuthor(target.value);
  };

  const textChange = (e) => {
    const { target } = e;
    setText(target.value);
  };

  function CreateNewAnswer(e) {
    e.preventDefault();
    if (author === "") {
      alert("Author field can't be empty");
      return;
    }
    if (text === "") {
      alert("Answer text can't be empty");
      return;
    }

    createNewAnswer({
      author,
      text,
      creationTime: new Date(),
      questionId: question.id,
    })
      .then((res) => {
        changeAnswers(question.id, ++question.answerCount);
        setAuthor("");
        setText("");
        setNewAnswer(res.data.id);
      })
      .catch((ex) => {
        alert(ex);
        console.log(ex);
        return;
      });
  }

  useEffect(() => {
    getQuestionById(id)
      .then((resp) => {
        let data = resp.data;
        if (firstUpdate.current) {
          data.viewCount++;
          firstUpdate.current = false;
        }
        changeViews(data.id, data.viewCount);
        setQuestion(data);
      })
      .then(() => {
        getAnswersOnQuestion(id).then((resp) => {
          setAnswers(resp.data);
        });
      })
      .catch((reason) => {
        console.log("questions problem: " + reason);
        alert(reason);
      });
  }, [id, newAnswerId]);

  return (
    <div className="container">
      {question && (
        <div className="question_container">
          <h1 className="normal_weight">{question.title}</h1>
          <div className="question_info bottom_line">
            <p>Asked: {dateFormat(question.creationTime)}</p>
            <p>Viewed: {question.viewCount}</p>
          </div>
          <Post curPost={question} isQuestion={true} />
        </div>
      )}

      {answers && (
        <div id="answers">
          <div className="answers-header">
            <h2 className="normal_weight">{question.answerCount} Answers</h2>
          </div>
          {answers.map((answer, index) => (
            <Post key={`idx-${index}`} curPost={answer} />
          ))}
        </div>
      )}

      {question && (
        <div id="newAnswers">
          <h2 className="space normal_weight">Your Answer</h2>
          <form className="form" onSubmit={CreateNewAnswer}>
            <div>
              <label htmlFor="author">Author:</label>
              <input
                id="author"
                type="text"
                value={author}
                onChange={authorChange}
              />
            </div>
            <div>
              <label htmlFor="text">Answer text:</label>
              <textarea
                id="text"
                rows="10"
                cols="70"
                value={text}
                onChange={textChange}
              />
            </div>
            <input className="btn" type="submit" value="Add answer" />
          </form>
        </div>
      )}
    </div>
  );
}

export default Question;
