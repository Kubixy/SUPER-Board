import React, { useState } from "react";
import { Button, Form } from "semantic-ui-react";
import QuestionQuiz from "./QuestionQuiz";
import { useUserTools } from "../../../context/UserToolsProvider";

export default function MakeQuiz(props) {
  const { questions, index } = props;
  const { setNewData, managementON, setDeleteIndex } = useUserTools();

  const [showExamen, setShowExamen] = useState(true);
  const [corrector, setCorrector] = useState(false);
  const [rightAnswers, setRightAnswers] = useState(0);

  return (
    <>
      <div className="quiz">
        {managementON && (
          <Button
            className="close-button"
            icon="close"
            onClick={() => {
              setDeleteIndex(index);
              setNewData(false);
            }}
          />
        )}
        {showExamen ? (
          <Form>
            {questions.map((x) => {
              return (
                <QuestionQuiz
                  questions={x}
                  setRightAnswers={setRightAnswers}
                  rightAnswers={rightAnswers}
                />
              );
            })}
            <div className="quizButtons">
              <Button onClick={() => setCorrector(!corrector)}>
                {corrector ? "Hide score" : "Correct quiz"}
              </Button>
              <Button onClick={() => setShowExamen(!showExamen)}>
                Hide quiz
              </Button>
            </div>
          </Form>
        ) : (
          <Button
            className="openButton"
            onClick={() => setShowExamen(!showExamen)}
          >
            Show quiz
          </Button>
        )}
        {corrector && (
          <h2>
            Score: {rightAnswers}/{questions.length}
          </h2>
        )}
      </div>
    </>
  );
}
