import React from "react";
import { Link } from "react-router-dom";
import { dateFormat } from "../services/QuestionService";
import "./QuestionPreview.css";

function QuestionPreview({ question }) {
  return (
    <div className="preview_container">
      <div className="info">
        <div className="answers">
          {question.answerCount}
          <p>answers</p>
        </div>
        <div className="views">
          {question.viewCount}
          <p>views</p>
        </div>
      </div>
      <div className="preview_body">
        <Link to={"questions/" + question.id}>
          <h3>{question.title}</h3>
        </Link>
        <div className="questionDetail">
          <p>asked: {dateFormat(question.creationTime)}</p>
          <p>author: {question.author}</p>
        </div>
      </div>
    </div>
  );
}

export default QuestionPreview;
