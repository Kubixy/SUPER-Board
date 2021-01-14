import React, { useState } from "react";
import { Input, Dropdown, Button, Form, Icon } from "semantic-ui-react";
import { toast } from "react-toastify";
import { useUserTools } from "../../../context/UserToolsProvider";

export default function Quiz(props) {
  const [userInputQuiz, setUserInputQuiz] = useState([{}]);
  const [questions, setQuestions] = useState([{}]);
  const [solution, setSolution] = useState(null);
  const [allowName, setAllowName] = useState(false);
  const [quizNameState, setQuizNameState] = useState("");
  const { generateItemID, writeNewData, data, loading } = useUserTools();
  const { setShowQuizModal } = props;

  const resetForm = () => {
    for (var i = 0; i < 5; i++) {
      document.getElementById("input" + i).value = "";
    }
    toast.success("Question added");
  };

  const onChange = (e) => {
    setQuestions({
      ...questions,
      [e.target.name]: e.target.value,
    });
  };

  const alertError = () => {
    for (var i = 1; i < 5; i++) {
      if (!document.getElementById("input" + i).value) {
        return true;
      }
    }
    return false;
  };

  const addQuestion = () => {
    if (!document.getElementById("input0").value) {
      toast.warning("Write a question");
    } else if (!solution) {
      toast.warning("Choose a solution");
    } else if (alertError()) {
      toast.warning("Fill in all the fields");
    } else {
      questions.solution = solution;
      setUserInputQuiz(
        userInputQuiz.concat({
          questions: questions,
        })
      );
      resetForm();
    }
  };
  const onClickQuiz = () => {
    if (userInputQuiz.length > 1) {
      if (quizNameState.length > 1 && allowName) {
        setUserInputQuiz(userInputQuiz.shift());
        data.push({
          mainindex: generateItemID(data),
          type: "quiz",
          title: quizNameState,
          questions: userInputQuiz,
          color: "#525252",
          position: {
            x: -1,
            y: -1,
          },
        });
        writeNewData();
        resetHandlers();
        setShowQuizModal(false);
      } else {
        toast.warning("You must pick a validname for your quiz");
      }
    } else {
      toast.error("Add at least one question");
    }
  };

  const resetHandlers = () => {
    setQuizNameState("");
    setUserInputQuiz([{}]);
    setQuestions([{}]);
    setSolution(null);
  };

  const examOptions = [
    { key: "answer1", text: "Answer 1", value: "1" },
    { key: "answer2", text: "Answer 2", value: "2" },
    { key: "answer3", text: "Answer 3", value: "3" },
    { key: "answer4", text: "Answer 4", value: "4" },
  ];

  return (
    <div className="options-quiz">
      <Form onChange={onChange}>
        <div className="options-quiz__question">
          <p>What do you want to ask?</p>
          <Input
            id="input0"
            name="question"
            type="text"
            placeholder="Write your question here"
            className="mainInput"
            maxLength="50"
          />
        </div>
        <div className="options-quiz__input">
          <Form.Field>
            <Input
              id="input1"
              label="Answer 1"
              name="resp1"
              placeholder="[...]"
              maxLength="200"
            />
          </Form.Field>
          <Form.Field>
            <Input
              id="input2"
              label="Answer 2"
              name="resp2"
              placeholder="[...]"
              maxLength="200"
            />
          </Form.Field>
          <Form.Field>
            <Input
              id="input3"
              label="Answer 3"
              name="resp3"
              placeholder="[...]"
              maxLength="200"
            />
          </Form.Field>
          <Form.Field>
            <Input
              id="input4"
              label="Answer 4"
              name="resp4"
              placeholder="[...]"
              maxLength="200"
            />
          </Form.Field>

          <Dropdown
            placeholder="Select the solution to the question"
            fluid
            selection
            options={examOptions}
            onChange={(event, { value }) => {
              setSolution(value);
            }}
          />
        </div>

        <Button id="addQuestionButton" onClick={addQuestion}>
          Add question
        </Button>
        <Button
          id="createQuizButton"
          loading={loading}
          onClick={() => {
            onClickQuiz();
            setAllowName(true);
          }}
        >
          Create quiz
        </Button>
        <Input
          style={allowName ? { visibility: "visible" } : {}}
          label="Quiz name"
          name="quizname"
          maxLength="20"
          onChange={(e, { value }) => {
            setQuizNameState(value);
          }}
        />
        <div className="counter">
          <p>
            {userInputQuiz.length <= 1
              ? "There are no questions yet"
              : "You have created " + (userInputQuiz.length - 1) + " questions"}
          </p>
          <Icon name="undo" size="large" onClick={() => resetHandlers()} />
        </div>
      </Form>
    </div>
  );
}
