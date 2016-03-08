module Engine.Graphics where

import Prelude (Unit)
import Control.Monad.Eff (Eff)

import Engine.Effects (ENGINE, EngineEff)
import Engine.Color


foreign import drawChar :: forall eff. Char -> Int -> Int -> Color -> Eff (e :: ENGINE | eff) Unit

foreign import drawStringEx :: forall eff. String -> Int -> Int -> Color -> Boolean -> Eff (e :: ENGINE | eff) Unit

drawString :: String -> Int -> Int -> Color -> EngineEff Unit
drawString s x y col = drawStringEx s x y col false

drawStringCenter :: String -> Int -> Int -> Color -> EngineEff Unit
drawStringCenter s x y col = drawStringEx s x y col true

foreign import drawWindow :: forall eff. Int -> Int -> Int -> Int -> Color -> Boolean -> Eff (e :: ENGINE | eff) Unit

foreign import for2impl :: forall eff. Int -> Int -> Int -> Int -> (Int -> Int -> Eff (e :: ENGINE | eff) Unit) -> Eff (e :: ENGINE | eff) Unit

-- Dirty hacks to speed up level rendering
for'' :: forall eff. Int -> Int -> Int -> Int -> (Int -> Int -> Eff (e :: ENGINE | eff) Unit) -> Eff (e :: ENGINE | eff) Unit
for'' = for2impl
