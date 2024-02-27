import React, { useState } from "react";
import questions from "./questionData";

const Questionnaire: React.FC = () => {
  const [currQuestionIndex, setCurrQuestionIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState<{
    [key: number]: Boolean;
  }>({});

  const handleOptionSelect = (optionIndex: number, isCorrect: boolean) => {
    setSelectedOptions({ ...selectedOptions, [optionIndex]: isCorrect });
    // Implement logic to move to next question or show feedback here
  };

  const currQuestion = questions[currQuestionIndex];

  return (
    <div>
      <hgroup>
        <h1>{currQuestion.question}</h1>
      </hgroup>
      <div>
        {currQuestion.options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleOptionSelect(index, option.isCorrect)}
            style={{
              background:
                selectedOptions[currQuestionIndex] === option.isCorrect &&
                option.isCorrect
                  ? "green"
                  : "red",
            }}
          >
            {option.text}
          </button>
        ))}
      </div>
      <div>
        <button
          disabled={currQuestionIndex <= 0}
          onClick={() => setCurrQuestionIndex(currQuestionIndex - 1)}
        >
          Prev
        </button>
        <button
          disabled={currQuestionIndex >= questions.length - 1}
          onClick={() => setCurrQuestionIndex(currQuestionIndex + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Questionnaire;
