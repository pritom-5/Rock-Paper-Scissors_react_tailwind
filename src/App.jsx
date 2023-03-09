import { useEffect, useState } from "react";
import "./App.css";
import Rules from "./components/Rules";

const objArr = [
  {
    id: 0,
    image: "images/icon-rock.svg",
    beats: 2,
    border: "border-yellow-500",
  },
  {
    id: 1,
    image: "images/icon-paper.svg",
    beats: 0,
    border: "border-blue-700",
  },
  {
    id: 2,
    image: "images/icon-scissors.svg",
    beats: 1,
    border: "border-pink-500",
  },
];

function randomPicker() {
  return Math.floor(Math.random() * 3);
}

function winner({ player, house }) {
  // winner logic
  if (player.id === house.id) {
    return { message: "It's a Draw", add: 0 };
  } else if (player.beats === house.id) {
    return { message: "You Won", add: 1 };
  } else if (player.id === house.beats) {
    return { message: "You Lost", add: -1 };
  }
}
export default function App() {
  const [gameState, setGameState] = useState({ player: null, house: null });
  const [winnerState, setWinnerState] = useState(null);
  const [totalScore, setTotalScore] = useState(0);
  const [showRules, setShowRules] = useState(false);

  useEffect(() => {
    // bring back total score stored in the local storage
    // store it in totalScore
  }, []);

  useEffect(() => {
    // check winner here
    if (!gameState.player) return;
    const winnerReturn = winner(gameState);

    const timeOut = setTimeout(() => {
      setWinnerState(winnerReturn);
      // update scroe depending on winner
      setTotalScore((prev) => prev + winnerReturn.add);
    }, 2000);
    //add the total score to the local storage
    return () => clearTimeout(timeOut);
  }, [gameState]);

  function clickHandler(id) {
    // get randomId from random helper function
    const randomId = randomPicker();
    // set state of game logic
    setGameState({ player: objArr[id], house: objArr[randomId] });
  }

  function showRulesHandler() {
    setShowRules(!showRules);
    console.log(showRules);
  }

  // Reset game
  function resetFn() {
    setGameState({ player: null, house: null });
    setWinnerState(null);
  }

  let buttonClassExt;
  const buttonClass = `absolute h-[172px] flex justify-center items-center aspect-square rounded-full bg-slate-200 border-[24px] hover:scale-125 transition-all`;

  return (
    <div className="bg-gradient-to-t from-slate-900 to-blue-900 h-screen pt-4">
      <div
        id="name-score"
        className="max-w-2xl flex justify-between items-center py-4 px-8 mx-auto  border-slate-400 border-2 rounded-xl"
      >
        <div
          id="name"
          className="uppercase text-3xl font-bold w-8 leading-6 text-slate-200"
        >
          Rock Paper Scissors
        </div>
        <div
          id="score"
          className="flex-col justify-center items-center bg-slate-200 text-slate-600 px-8 py-2 rounded-md inline-block text-center"
        >
          <div id="text" className="uppercase font-bold text-sm">
            Score
          </div>
          <div id="score" className="text-5xl font-bold">
            {totalScore}
          </div>
        </div>
      </div>
      {!gameState.player && (
        <div id="buttons-section" className="relative">
          <div
            id="trangle"
            className="w-96 aspect-square absolute left-1/2 top-20 -translate-x-1/2"
          >
            <img
              src="/images/bg-triangle.svg"
              alt=""
              className="w-fill h-fill "
            />
            <div id="buttons" className="absolute top-0 left-0">
              {objArr.map((item) => {
                switch (item.id) {
                  case 0:
                    buttonClassExt = "-top-12 -left-8";
                    break;
                  case 1:
                    buttonClassExt = "left-48 -top-12";
                    break;
                  case 2:
                    buttonClassExt = "left-20 top-32";
                    break;

                  default:
                    break;
                }
                return (
                  <button
                    key={item.id}
                    onClick={() => clickHandler(item.id)}
                    className={`${buttonClass} ${buttonClassExt} ${item.border}`}
                  >
                    <img src={item.image} alt={item.id} />
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {!!gameState.player && (
        <div
          id="picked"
          className="flex gap-16 justify-center items-center pt-16"
        >
          <div
            id="you-picked"
            className="font-extrabold flex-col  justify-center items-center w-fit"
          >
            <div
              id="text"
              className="text-slate-300 uppercase text-center pb-12"
            >
              You Picked
            </div>
            <div
              id="pick-image"
              className={`h-[172px] flex justify-center items-center aspect-square rounded-full bg-slate-200 border-[20px] ${gameState.player.border}`}
            >
              <img
                src={gameState.player.image}
                alt=""
                className="w-fill h-fill"
              />
            </div>
          </div>
          {!!winnerState && (
            <div
              id="winner-status"
              className="text-slate-200 uppercase flex-col space-y-2 items-center text-center"
            >
              <div id="winner-message" className="font-extrabold text-3xl">
                {winnerState.message}
              </div>
              <button
                onClick={resetFn}
                className="uppercase bg-gradient-to-b from-slate-700 to-blue-700 px-8 py-2 rounded-xl hover:border-slate-300 hover:border-2"
              >
                Play Again
              </button>
            </div>
          )}

          <div
            id="house-picked"
            className="font-extrabold flex-col  justify-center items-center w-fit"
          >
            <div
              id="text"
              className="text-slate-300 uppercase text-center pb-12"
            >
              The House Picked
            </div>
            <div
              id="pick-image"
              className={`h-[172px] flex justify-center items-center aspect-square rounded-full bg-slate-200 border-[20px] ${gameState.house.border}`}
            >
              <img
                src={gameState.house.image}
                alt=""
                className="w-fill h-fill"
              />
            </div>
          </div>
        </div>
      )}

      <div id="rules">
        <button
          onClick={showRulesHandler}
          className="px-4 py-2 absolute bottom-16 right-16 border-slate-400 border-2 rounded-xl text-slate-300 hover:bg-slate-700"
        >
          Rules
        </button>
      </div>

      {showRules && <Rules showRulesHandler={showRulesHandler} />}
    </div>
  );
}
