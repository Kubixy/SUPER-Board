import React, { useState } from "react";
import { Button, Form } from "semantic-ui-react";
import QuestionQuiz from "./QuestionQuiz";
import MoveElements from "../../UIComponents/MoveElements";
import Topbar from "../../UIComponents/ToolsUtils/Topbar";
import CustomBorders from "../../UIComponents/ToolsUtils/CustomBorders";

import "./MakeQuiz.scss";

export default function MakeQuiz(props) {
  const { questions, index, position, allowEdit, title, color } = props;
  const [showQuiz, setShowQuiz] = useState(false);
  const [corrector, setCorrector] = useState(false);
  const [rightAnswers, setRightAnswers] = useState(0);
  const [allowMovement, setAllowMovement] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState("");

  return (
    <MoveElements
      index={index}
      position={position}
      setAllowMovement={setAllowMovement}
      allowMovement={allowMovement}
    >
      <div className="borderFixQuiz">
        <div
          className="quiz"
          id={"item" + index}
          style={{
            backgroundColor: backgroundColor ? backgroundColor : color,
          }}
        >
          {allowEdit && (
            <Topbar
              defaultcolor="#525252"
              setBackgroundColor={setBackgroundColor}
              index={index}
              tool="quiz"
              allowMovement={allowMovement}
              setAllowMovement={setAllowMovement}
            />
          )}
          {showQuiz ? (
            <Form
              onMouseMove={() => {
                if (allowMovement) setAllowMovement(false);
              }}
            >
              <p>{title}</p>

              <div className="quiz__questions">
                {questions.map((x, index) => {
                  return (
                    <QuestionQuiz
                      key={index}
                      questions={x}
                      setRightAnswers={setRightAnswers}
                      rightAnswers={rightAnswers}
                    />
                  );
                })}
              </div>
              <div className="quizButtons">
                <Button onClick={() => setCorrector(!corrector)}>
                  {corrector ? "Hide score" : "Correct quiz"}
                </Button>
                <Button onClick={() => setShowQuiz(!showQuiz)}>
                  Hide quiz
                </Button>
              </div>
            </Form>
          ) : (
            <Button
              className="openButton"
              onClick={() => setShowQuiz(!showQuiz)}
            >
              {title}
            </Button>
          )}
          {corrector && showQuiz && (
            <h2>
              Score: {rightAnswers}/{questions.length}
            </h2>
          )}
        </div>
        {allowEdit && <CustomBorders />}
      </div>
    </MoveElements>
  );
}
