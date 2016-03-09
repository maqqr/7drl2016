module GameState where

import Level


data GameState = GameState
    { level :: Level
    , x :: Int
    , y :: Int
    }

initialGameState :: GameState
initialGameState = GameState { level: newLevel 20 20, x: 3, y: 3 }
