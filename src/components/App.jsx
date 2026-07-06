import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";
import NextQuestion from "./NextQuestion";
import { useEffect, useReducer } from "react";
import Progress from "./Progress";
import FinishScreen from "./FinishScreen";
import Timer from "./Timer";
import HighScore from "./HighScore";

const initialState = {
  questions: [],
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  secondsRemaining: 0,
  highScore: 0,
};

function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return {
        ...state,
        questions: action.payload,
        status: "ready",
        secondsRemaining: action.payload.length * 20,
      };

    case "dataFailed":
      return { ...state, status: "error" };

    case "start":
      return { ...state, status: "active" };

    case "newAnswer": {
      const question = state.questions.at(state.index);

      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    }

    case "nextQuestion":
      return {
        ...state,
        index: state.index + 1,
        answer: null,
        highScore:
          state.points > state.highScore ? state.points : state.highScore,
      };

    case "finish":
      return {
        ...state,
        status: "finished",
        highScore:
          state.points > state.highScore ? state.points : state.highScore,
      };

    case "timer":
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? "finished" : state.status,
      };

    case "restart":
      return {
        ...initialState,
        status: "ready",
        questions: state.questions,
        secondsRemaining: state.questions.length * 20,
        highScore: state.highScore,
      };

    default:
      throw new Error("Action Unknown");
  }
}

function App() {
  const [
    { questions, status, index, answer, points, secondsRemaining, highScore },
    dispatch,
  ] = useReducer(reducer, initialState);
  const numQuestions = questions.length;
  const maxPoints = questions.reduce((acc, val) => {
    return acc + val.points;
  }, 0);

  useEffect(function () {
    try {
      async function fetchData() {
        const response = await fetch("data/questions.json");
        const { questions } = await response.json();
        dispatch({ type: "dataReceived", payload: questions });
      }
      fetchData();
    } catch (error) {
      dispatch({ type: "dataFailed" });
      console.log(error.message);
    }
  }, []);

  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen numQuestions={numQuestions} dispatch={dispatch} />
        )}
        {status === "active" && (
          <>
            <HighScore highScore={highScore} />
            <Progress
              numQuestions={numQuestions}
              index={index}
              points={points}
              maxPoints={maxPoints}
              answer={answer}
            />
            <Question
              question={questions[index]}
              dispatch={dispatch}
              answer={answer}
              index={index}
            />
            <Timer dispatch={dispatch} secondsRemaining={secondsRemaining} />
            <NextQuestion
              dispatch={dispatch}
              answer={answer}
              numQuestions={numQuestions}
              index={index}
              points={points}
            />
          </>
        )}
        {status === "finished" && (
          <FinishScreen
            points={points}
            maxPoints={maxPoints}
            dispatch={dispatch}
          />
        )}
      </Main>
    </div>
  );
}

export default App;
