import React, { useState, useEffect, useRef } from 'react';

const OfflineGame = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [playerPosition, setPlayerPosition] = useState({ y: 0 });
  const [obstacles, setObstacles] = useState([]);
  const [coins, setCoins] = useState([]);
  const [animationSpeed, setAnimationSpeed] = useState(6);
  const [lane, setLane] = useState(1); // 0: top, 1: middle, 2: bottom
  const [backgroundPosition, setBackgroundPosition] = useState(0);
  const [playerState, setPlayerState] = useState('running');
  const [connectionAttempts, setConnectionAttempts] = useState(0);
  const requestRef = useRef(null);
  const scoreIntervalRef = useRef(null);
  const obstacleIntervalRef = useRef(null);
  const coinIntervalRef = useRef(null);
  const playerStateTimeoutRef = useRef(null);
  const connectionCheckRef = useRef(null);
  
  // Game constants
  const LANES = [50, 150, 250];
  const PLAYER_WIDTH = 60;
  const PLAYER_HEIGHT = 60;
  const OBSTACLE_WIDTH = 40;
  const OBSTACLE_HEIGHT = 40;
  const COIN_SIZE = 30;
  
  // Initialize the game
  const startGame = () => {
    setGameStarted(true);
    setScore(0);
    setIsGameOver(false);
    setLane(1);
    setPlayerPosition({ y: 0 });
    setObstacles([]);
    setCoins([]);
    setAnimationSpeed(6);
    setPlayerState('running');
    
    // Simulate connection attempts
    setConnectionAttempts(0);
    connectionCheckRef.current = setInterval(() => {
      setConnectionAttempts(prev => prev + 1);
      // Simulate checking internet connection
      if (Math.random() > 0.95) {
        // Very low chance of "reconnecting" - keeps player in game
        checkNetworkStatus();
      }
    }, 5000);
    
    // Increment score every 200ms
    scoreIntervalRef.current = setInterval(() => {
      setScore(prevScore => prevScore + 1);
    }, 200);
    
    // Add new obstacle every few seconds
    obstacleIntervalRef.current = setInterval(() => {
      const randomLane = Math.floor(Math.random() * 3);
      setObstacles(prev => [...prev, { 
        x: 800, 
        lane: randomLane,
        type: Math.random() > 0.5 ? 'pothole' : 'barrier',
        width: OBSTACLE_WIDTH, 
        height: OBSTACLE_HEIGHT 
      }]);
      
      // Increase speed as game progresses
      setAnimationSpeed(prev => Math.min(prev + 0.05, 15));
    }, 1800);
    
    // Add new coins
    coinIntervalRef.current = setInterval(() => {
      const randomLane = Math.floor(Math.random() * 3);
      if (Math.random() > 0.3) { // 70% chance to spawn a coin
        setCoins(prev => [...prev, { 
          x: 800 + Math.random() * 200, 
          lane: randomLane,
          size: COIN_SIZE,
          collected: false
        }]);
      }
    }, 1000);
    
    // Start game loop
    requestRef.current = requestAnimationFrame(updateGameArea);
  };
  
  // Check if network is back
  const checkNetworkStatus = () => {
    // This is just a placeholder - in a real app, you'd check actual network status
    // For the game, we'll just keep players entertained while waiting
    console.log("Checking network status...");
  };
  
  // Game over logic
  const endGame = () => {
    setIsGameOver(true);
    setGameStarted(false);
    clearInterval(scoreIntervalRef.current);
    clearInterval(obstacleIntervalRef.current);
    clearInterval(coinIntervalRef.current);
    clearInterval(connectionCheckRef.current);
    cancelAnimationFrame(requestRef.current);
    setHighScore(prev => Math.max(prev, score));
    setPlayerState('crashed');
  };
  
  // Player movement
  const moveUp = () => {
    if (lane > 0) {
      setLane(lane - 1);
      setPlayerState('jumping');
      clearTimeout(playerStateTimeoutRef.current);
      playerStateTimeoutRef.current = setTimeout(() => {
        setPlayerState('running');
      }, 300);
    }
  };
  
  const moveDown = () => {
    if (lane < 2) {
      setLane(lane + 1);
      setPlayerState('sliding');
      clearTimeout(playerStateTimeoutRef.current);
      playerStateTimeoutRef.current = setTimeout(() => {
        setPlayerState('running');
      }, 300);
    }
  };
  
  // Main game loop
  const updateGameArea = () => {
    if (!isGameOver) {
      // Move background
      setBackgroundPosition(prev => (prev - animationSpeed) % 20);
      
      // Move obstacles
      setObstacles(prev => 
        prev
          .map(obstacle => ({ ...obstacle, x: obstacle.x - animationSpeed }))
          .filter(obstacle => obstacle.x > -OBSTACLE_WIDTH)
      );
      
      // Move coins
      setCoins(prev => 
        prev
          .map(coin => ({ ...coin, x: coin.x - animationSpeed }))
          .filter(coin => coin.x > -COIN_SIZE || !coin.collected)
      );
      
      // Player position
      const player = {
        x: 100,
        y: LANES[lane],
        width: PLAYER_WIDTH * 0.7,
        height: PLAYER_HEIGHT * 0.7
      };
      
      // Check obstacle collisions
      const collision = obstacles.some(obstacle => {
        return (
          player.x < obstacle.x + obstacle.width * 0.7 &&
          player.x + player.width > obstacle.x &&
          Math.abs(LANES[obstacle.lane] - player.y) < (player.height / 2 + obstacle.height / 2)
        );
      });
      
      if (collision) {
        endGame();
      } else {
        // Check coin collisions
        setCoins(prev => 
          prev.map(coin => {
            // If already collected, return as is
            if (coin.collected) return coin;
            
            // Check collision
            if (
              player.x < coin.x + coin.size * 0.7 &&
              player.x + player.width > coin.x &&
              Math.abs(LANES[coin.lane] - player.y) < (player.height / 2 + coin.size / 2)
            ) {
              // Coin collected, add score
              setScore(prevScore => prevScore + 10);
              return { ...coin, collected: true };
            }
            return coin;
          })
        );
        
        requestRef.current = requestAnimationFrame(updateGameArea);
      }
    }
  };
  
  // Handle key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.code === 'Space' || e.code === 'ArrowUp') && gameStarted) {
        e.preventDefault();
        moveUp();
      } else if (e.code === 'ArrowDown' && gameStarted) {
        e.preventDefault();
        moveDown();
      } else if ((e.code === 'Space' || e.code === 'Enter') && !gameStarted) {
        e.preventDefault();
        startGame();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameStarted, lane]);
  
  // Clean up on unmount
  useEffect(() => {
    return () => {
      clearInterval(scoreIntervalRef.current);
      clearInterval(obstacleIntervalRef.current);
      clearInterval(coinIntervalRef.current);
      clearInterval(connectionCheckRef.current);
      clearTimeout(playerStateTimeoutRef.current);
      cancelAnimationFrame(requestRef.current);
    };
  }, []);
  
  return (
    <div className="offline-container">
      <div className="game-header">
        <h1 className="game-title">No Internet Connection</h1>
        <p className="game-subtitle">
          We're waiting to connect you to our delicious menu...
          {connectionAttempts > 0 && ` (Attempt ${connectionAttempts})`}
        </p>
        <div className="connection-status">
          <div className="status-indicator offline"></div>
          <span>You're offline. Play while we try to reconnect.</span>
        </div>
        <div className="score-container">
          <div className="score-box">
            <span className="score-label">SCORE</span>
            <span className="score-value">{score}</span>
          </div>
          <div className="score-box">
            <span className="score-label">BEST</span>
            <span className="score-value">{highScore}</span>
          </div>
        </div>
      </div>
      
      <div className="game-wrapper">
        <div 
          className="game-area"
          style={{ backgroundPosition: `0px ${backgroundPosition}px` }}
        >
          {!gameStarted && (
            <div className="start-screen">
              <div className="game-message">
                {isGameOver ? 'Game Over!' : 'Hungry But Offline?'}
              </div>
              <div className="loading-message">
                We're having trouble connecting to our servers. 
                While we try to get you back online, why not deliver some virtual food?
              </div>
              <button className="start-button" onClick={startGame}>
                {isGameOver ? 'Try Again' : 'Start Delivery Run'}
              </button>
            </div>
          )}
          
          {/* Game controls for mobile */}
          {gameStarted && (
            <div className="mobile-controls">
              <button className="control-button up-button" onClick={moveUp}>
                ⬆️
              </button>
              <button className="control-button down-button" onClick={moveDown}>
                ⬇️
              </button>
            </div>
          )}
          
          {/* Player character */}
          <div 
            className={`player ${playerState}`}
            style={{
              left: 100,
              top: LANES[lane] - PLAYER_HEIGHT/2
            }}
          />
          
          {/* Lanes */}
          <div className="lane-markers">
            <div className="lane-line" style={{ top: LANES[0] + 30 }} />
            <div className="lane-line" style={{ top: LANES[1] + 30 }} />
            <div className="lane-line" style={{ top: LANES[2] + 30 }} />
          </div>
          
          {/* Obstacles */}
          {obstacles.map((obstacle, index) => (
            <div
              key={`obs-${index}`}
              className={`obstacle ${obstacle.type}`}
              style={{
                left: obstacle.x,
                top: LANES[obstacle.lane] - obstacle.height/2
              }}
            />
          ))}
          
          {/* Coins */}
          {coins.filter(coin => !coin.collected).map((coin, index) => (
            <div
              key={`coin-${index}`}
              className="coin"
              style={{
                left: coin.x,
                top: LANES[coin.lane] - coin.size/2
              }}
            />
          ))}
        </div>
      </div>
      
      <div className="game-instructions">
        <div className="instruction">
          <span className="key">↑</span> or <span className="key">SPACE</span>
          <span>Move Up</span>
        </div>
        <div className="instruction">
          <span className="key">↓</span>
          <span>Move Down</span>
        </div>
        <div className="instruction-text">
          Avoid potholes and barriers! Collect tips while we try to get you back online.
        </div>
      </div>
      
      <div className="reconnect-options">
        <button className="retry-button" onClick={checkNetworkStatus}>
          Retry Connection
        </button>
        <div className="offline-message">
          You'll be automatically redirected to our menu when connection is restored.
        </div>
      </div>
    </div>
  );
};

export default OfflineGame;