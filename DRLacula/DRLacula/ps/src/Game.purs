module Game where

import Prelude
import Data.Array
import Data.Char (toCharCode)

import Engine.Color
import Engine.Graphics
import Engine.Effects (EngineEff)
import Drawing
import GameState
import Level
import Point

ord :: Char -> Int
ord = toCharCode

initialState :: GameState
initialState = initialGameState

handleKeyPress :: GameState -> Int -> Boolean -> GameState
handleKeyPress (GameState state) key shift | key == ord 'D' = GameState state { x = state.x + 1 }
handleKeyPress (GameState state) key shift | key == ord 'A' = GameState state { x = state.x - 1 }
handleKeyPress gstate _ _ | otherwise = gstate

redrawScreen :: GameState -> EngineEff Unit
redrawScreen (GameState state) = do
    drawLevel state.level
    drawChar '@' state.x state.y red

onKeyPress :: GameState -> Int -> Boolean -> EngineEff GameState
onKeyPress gstate key shift =
    let updatedGame = handleKeyPress gstate key shift
    in const updatedGame <$> redrawScreen updatedGame

onGameStart :: GameState -> EngineEff Unit
onGameStart = redrawScreen
