module GameState where

import Level


data GameState = GameState
    { level :: Level
    }

initialGameState :: GameState
initialGameState = GameState { level: newLevel 10 10 }
