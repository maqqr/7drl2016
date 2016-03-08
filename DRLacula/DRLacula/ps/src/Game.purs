module Game where

import Prelude
import Data.Array

import Engine.Effects (EngineEff)
import Drawing
import GameState

initialState :: GameState
initialState = initialGameState

drawFunc :: GameState -> EngineEff Unit
drawFunc state = drawMenu

onKeyPress :: GameState -> Int -> Boolean -> GameState
onKeyPress state key shift = state
