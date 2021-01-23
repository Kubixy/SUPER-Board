import React, { useState, useEffect } from "react";
import { Form, Radio } from "semantic-ui-react";

export default function QuestionQuiz(props) {
  const { questions, setRightAnswers, rightAnswers } = props;
  const [answerStatus, setAnswerStatus] = useState(true);
  const [state, setstate] = useState(0);

  const handleChange = (e, { value }) => {
    setstate(value);
    if (questions.questions.solution === value && answerStatus) {
      setRightAnswers(rightAnswers + 1);
      setAnswerStatus(false);
    } else if (questions.questions.solution !== value && !answerStatus) {
      setRightAnswers(rightAnswers - 1);
      setAnswerStatus(true);
    }
  };

  useEffect(() => {
    setRightAnswers(0);
  }, [setRightAnswers]);

  return (
    <Form.Group>
      <h3>{questions.questions.question}</h3>
      <div className="toAsk">
        <Radio
          as="button"
          label={questions.questions.resp1}
          value="1"
          checked={state === "1"}
          onChange={handleChange}
        />
        <Radio
          as="button"
          label={questions.questions.resp2}
          value="2"
          checked={state === "2"}
          onChange={handleChange}
        />
        <Radio
          as="button"
          label={questions.questions.resp3}
          value="3"
          checked={state === "3"}
          onChange={handleChange}
        />
        <Radio
          as="button"
          label={questions.questions.resp4}
          value="4"
          checked={state === "4"}
          onChange={handleChange}
        />
      </div>
    </Form.Group>
  );
}
