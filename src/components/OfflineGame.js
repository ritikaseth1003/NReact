import React, { useState, useEffect } from "react";

const OfflineGame = () => {
  const [position, setPosition] = useState(1);
  const [coins, setCoins] = useState([]);
  const [obstacles, setObstacles] = useState([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!gameOver) {
        setCoins((prevCoins) =>
          prevCoins
            .map((coin) => ({ ...coin, left: coin.left - 10 }))
            .filter((coin) => coin.left > 0)
        );
        setObstacles((prevObstacles) =>
          prevObstacles
            .map((obstacle) => ({ ...obstacle, left: obstacle.left - 10 }))
            .filter((obstacle) => obstacle.left > 0)
        );
      }
    }, 100);

    return () => clearInterval(interval);
  }, [gameOver]);

  const moveUp = () => {
    if (position > 0) setPosition(position - 1);
  };

  const moveDown = () => {
    if (position < 2) setPosition(position + 1);
  };

  const generateCoin = () => {
    setCoins([...coins, { id: Date.now(), lane: Math.floor(Math.random() * 3), left: 500 }]);
  };

  const generateObstacle = () => {
    setObstacles([...obstacles, { id: Date.now(), lane: Math.floor(Math.random() * 3), left: 500 }]);
  };

  const checkCollision = () => {
    obstacles.forEach((obstacle) => {
      if (obstacle.lane === position && obstacle.left < 50 && obstacle.left > 0) {
        setGameOver(true);
      }
    });
    setCoins((prevCoins) =>
      prevCoins.filter((coin) => {
        if (coin.lane === position && coin.left < 50 && coin.left > 0) {
          setScore(score + 10);
          return false;
        }
        return true;
      })
    );
  };

  useEffect(() => {
    if (!gameOver) {
      const collisionCheck = setInterval(checkCollision, 100);
      return () => clearInterval(collisionCheck);
    }
  }, [position, coins, obstacles, gameOver]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
      <h1 className="text-2xl font-bold mb-4">Offline Delivery Game</h1>
      <div className="relative w-96 h-48 bg-gray-700 rounded-lg overflow-hidden border border-gray-500">
        <div
          className="absolute w-10 h-10 bg-yellow-500 rounded-full"
          style={{ top: `${position * 50 + 10}px`, left: "20px" }}
        ></div>
        {coins.map((coin) => (
          <div
            key={coin.id}
            className="absolute w-5 h-5 bg-yellow-300 rounded-full"
            style={{ top: `${coin.lane * 50 + 15}px`, left: `${coin.left}px` }}
          ></div>
        ))}
        {obstacles.map((obstacle) => (
          <div
            key={obstacle.id}
            className="absolute w-10 h-10 bg-red-500 rounded"
            style={{ top: `${obstacle.lane * 50 + 10}px`, left: `${obstacle.left}px` }}
          ></div>
        ))}
      </div>
      <div className="mt-4 flex gap-4">
        <button onClick={moveUp} className="px-4 py-2 bg-blue-500 rounded">Up</button>
        <button onClick={moveDown} className="px-4 py-2 bg-blue-500 rounded">Down</button>
      </div>
      <p className="mt-4">Score: {score}</p>
      {gameOver && <p className="text-red-500">Game Over!</p>}
      <div className="mt-4 flex gap-4">
        <button onClick={generateCoin} className="px-4 py-2 bg-yellow-500 rounded">Generate Coin</button>
        <button onClick={generateObstacle} className="px-4 py-2 bg-red-500 rounded">Generate Obstacle</button>
      </div>
    </div>
  );
};

export default OfflineGame;
