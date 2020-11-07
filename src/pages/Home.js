import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import QuestionPreview from "../components/QuestionPreview";
import { getQuestions } from "../services/QuestionService";
import "./Home.css";

function Home() {
  const [questions, setQuestions] = useState(null);

  async function GetQuestions() {
    await getQuestions()
      .then((resp) => {
        setQuestions(resp.data);
      })
      .catch((reason) => {
        console.log("questions problem: " + reason);
        alert(reason);
      });
  }

  useEffect(() => {
    GetQuestions();
  }, []);

  return (
    <div className="container">
      <div className="page_title">
        <h1>Questions list</h1>
        <Link to="/newquestion" className="link_btn">
          Ask Question
        </Link>
      </div>
      <div className="questions_content">
        {questions &&
          questions.map((quest, index) => (
            <QuestionPreview key={"idx-" + index} question={quest} />
          ))}
      </div>
    </div>
  );
}

export default Home;
