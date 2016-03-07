module Game where

import Prelude
import Data.List

import Engine.Graphics
import Engine.Effects (EngineEff)
import Engine.Color

import Data.String
import Data.Char

infixr 6 Cons as :

type GameState = Int

initialGameState :: GameState
initialGameState = 5

drawFunc :: GameState -> EngineEff Unit
drawFunc state = do
    drawWindow 12 1 51 9 white false
    drawMenu 14 2
    
    drawWindow (40-16) 12 30 9 white false
    drawString (fromChar (fromCharCode 1) <> " Start new game") (40-14) 14  white

onKeyPress :: GameState -> Int -> Boolean -> GameState
onKeyPress state key shift = state + 1

drawMenu :: Int -> Int -> EngineEff Unit
drawMenu x y = drawer gameTitle y
    where
        drawer (s:ss) y = do
            drawString s x y white
            drawer ss (y + 1)
        drawer Nil _ = return unit

gameTitle = fromFoldable ["      _ _____  _                      _",
                          "     | |  __ \\| |                    | |",
                          "   __| | |__) | |     __ _  ___ _   _| | __ _",
                          "  / _` |  _  /| |    / _` |/ __| | | | |/ _` |",
                          " | (_| | | \\ \\| |___| (_| | (__| |_| | | (_| |",
                          "  \\__,_|_|  \\_\\______\\__,_|\\___|\\__,_|_|\\__,_|"]
