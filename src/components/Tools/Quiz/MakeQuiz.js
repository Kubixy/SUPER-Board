import React, { useState } from "react";
import { Button, Form } from "semantic-ui-react";
import QuestionQuiz from "./QuestionQuiz";
import DrawAndResize from "../../UIComponents/DrawAndResize";
import Topbar from "../../UIComponents/ToolsUtils/Topbar";
import CustomBorders from "../../UIComponents/ToolsUtils/CustomBorders";

import "./quiz.scss";

export default function MakeQuiz(props) {
  const { questions, index, position, allowEdit, title } = props;
  const [showQuiz, setShowQuiz] = useState(false);
  const [corrector, setCorrector] = useState(false);
  const [rightAnswers, setRightAnswers] = useState(0);
  const [allowMovement, setAllowMovement] = useState(false);

  return (
    <DrawAndResize
      index={index}
      position={position}
      setAllowMovement={setAllowMovement}
      allowMovement={allowMovement}
      noResize={false}
    >
      <div className="borderFixQuiz">
        <div className="quiz" id={"item" + index}>
          {allowEdit && (
            <Topbar
              index={index}
              tool="standard"
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
                {questions.map((x) => {
                  return (
                    <QuestionQuiz
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
        <CustomBorders />
      </div>
    </DrawAndResize>
  );
}
