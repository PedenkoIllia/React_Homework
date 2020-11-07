import { dateFormat } from "../services/QuestionService";

function Post({ curPost, isQuestion }) {
  let bodyClass = "post_body";
  let detailsText;

  if (isQuestion) {
    detailsText = "asked";
    bodyClass += " question_body";
  } else {
    detailsText = "answered";
    bodyClass += " answer_body";
  }

  return (
    <div className={bodyClass}>
      <p>{curPost.text}</p>
      <div className="post_details">
        <p>
          {detailsText} {dateFormat(curPost.creationTime)}
        </p>
        <p>{curPost.author}</p>
      </div>
    </div>
  );
}

export default Post;
