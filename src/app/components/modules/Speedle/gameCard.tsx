import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import TimerComponent from "./timer";
import { motion } from "framer-motion";
import { wordsGrid } from "../../common/common";
import { getDayOfWeek, getWeekOfMonth } from "../../common/utils";

const GameCard = ({ isActive, onHandleColumn, setIsSolved, wordOfTheDay }: any) => {
  const arrayBoxes = [1, 2, 3, 4, 5];
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);
  const [rowAnswer, setRowAnswer] = useState<string>("");

  const [arrayOfWord, setArrayOfWord] = useState<any>([]);
  const colors: any = {
    correct: "#6aaa64",
    present: "#c9b458",
    absent: "#787c7e",
  };
  const [orderLetters, setOrderLetters] = useState<
    ("correct" | "present" | "absent")[]
  >([]);
  const [flipped, setFlipped] = useState<boolean>(false);

  useEffect(() => {
    setArrayOfWord(wordOfTheDay?.split(""));
  }, []);

  useEffect(() => {
    if (isActive) {
      inputsRef.current[0]?.focus();
    }
  }, [isActive]);

  const evaluateGuess = (
    guess: string[],
    target: string[],
    userGuess: string
  ) => {
    const result: ("correct" | "present" | "absent")[] = Array(
      guess.length
    ).fill("absent");
    const targetUsed: boolean[] = Array(target.length).fill(false);

    // Step 1: Check for "correct" letters (right letter, right position)
    for (let i = 0; i < guess.length; i++) {
      if (guess[i] === target[i]) {
        result[i] = "correct";
        targetUsed[i] = true;
      }
    }

    // Step 2: Check for "present" letters (right letter, wrong position)
    for (let i = 0; i < guess.length; i++) {
      if (result[i] === "correct") continue; // Already handled

      for (let j = 0; j < target.length; j++) {
        if (!targetUsed[j] && guess[i] === target[j]) {
          result[i] = "present";
          targetUsed[j] = true;
          break;
        }
      }
    }

    if (userGuess === wordOfTheDay) {
      setIsSolved(true);
    }

    setOrderLetters(result);
  };

  const handleKeyDown = (e: any, index: any) => {
    const regexExpression = /^[A-Za-z]+$/;
    let answerValue = rowAnswer;
    console.warn(e.key + " " + e.target.value);
    if (regexExpression.test(e.target.value)) {
      answerValue = rowAnswer + e.target.value.toUpperCase();
      inputsRef.current[index + 1]?.focus();
      setRowAnswer(answerValue);

      if (e.key === "Backspace") {
        answerValue = answerValue.substring(0, index);
        setRowAnswer(answerValue);
      }
    } else if (e.key === "Backspace") {
      if (index > 0) inputsRef.current[index - 1]?.focus();
      answerValue = answerValue.substring(0, index - 1);
      setRowAnswer(answerValue);
    }

    if (e.key === "Enter") {
      if (index === 4 && regexExpression.test(e.target.value)) {
        onHandleColumn();
        evaluateGuess(
          answerValue.split(""),
          wordOfTheDay.split(""),
          answerValue
        );
        setFlipped(true);
      } else {
        return;
      }
    }
  };

  // const handleOnChange = (e: any, index: any) => {
  //   console.warn(index);
  //   if (!index) {
  //     console.warn("Checking ", e.target.value);
  //     let answer = rowAnswer + e.target.value;
  //     setRowAnswer(answer);
  //     console.warn(answer);
  //   } else {
  //     setRowAnswer(rowAnswer.substring(0, index - 1));
  //   }
  // };

  return (
    <Wrapper>
      <RowContainer>
        {arrayBoxes.map((box, index) => (
          <motion.div
            animate={{ rotateY: flipped ? 180 : 0 }}
            transition={{ duration: 0.5, delay: 0.1 + index / 10 }}
          >
            <InputWrapper
              disabled={!isActive}
              animate={{ rotateY: flipped ? 180 : 0 }}
              transition={{ duration: 0.5, delay: 0.1 + index / 10 }}
              maxLength={1}
              key={index}
              onKeyDown={(e) => handleKeyDown(e, index)}
              onChange={() => {}}
              ref={(el) => {
                if (el) inputsRef.current[index] = el;
              }}
              style={{ background: colors[orderLetters[index]] ?? "#d9d9d9" }}
            />
          </motion.div>
        ))}
      </RowContainer>
    </Wrapper>
  );
};

export default GameCard;

const Wrapper = styled.div`
  width: 100%;

  gap: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const InputWrapper = styled(motion.input)`
  height: 60px;
  width: 60px;
  caret-color: transparent;
  border-radius: 5px;
  border: 1px solid #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;

  font-size: 22px;

  text-transform: uppercase;
`;

const RowContainer = styled.div`
  display: flex;
  gap: 5px;
`;
