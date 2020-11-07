import { useState } from "react";
import { createQuestion } from "../services/QuestionService";
import "./NewQuestion.css";
import { useHistory } from "react-router-dom";

function NewQuestion() {
  const [author, setAuthor] = useState("");
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  let history = useHistory();

  const authorChange = (e) => {
    const { target } = e;
    setAuthor(target.value);
  };

  const titleChange = (e) => {
    const { target } = e;
    setTitle(target.value);
  };

  const textChange = (e) => {
    const { target } = e;
    setText(target.value);
  };

  function createNewQuestion(e) {
    e.preventDefault();

    if (author === "") {
      alert("Author field can't be empty");
      return;
    }
    if (title === "") {
      alert("Title field can't be empty");
      return;
    }
    if (text === "") {
      alert("Question text can't be empty");
      return;
    }

    createQuestion({
      title,
      author,
      text,
      creationTime: new Date(),
      answerCount: 0,
      viewCount: 0,
    })
      .then(() => history.push("/questions"))
      .catch((ex) => {
        alert(ex);
        console.log(ex);
        return;
      });

    history.push();
  }

  return (
    <div className="container">
      <h2>Ask question</h2>

      <form className="form" onSubmit={createNewQuestion}>
        <div>
          <label htmlFor="author">Author:</label>
          <input id="author" type="text" onChange={authorChange} />
        </div>
        <div>
          <label htmlFor="title">Title:</label>
          <input id="title" type="text" onChange={titleChange} />
        </div>
        <div>
          <label htmlFor="text">Question text:</label>
          <textarea id="text" rows="10" cols="70" onChange={textChange} />
        </div>
        <input className="btn" type="submit" value="Add question" />
      </form>
    </div>
  );
}

export default NewQuestion;
