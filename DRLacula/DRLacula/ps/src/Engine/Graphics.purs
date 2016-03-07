module Engine.Graphics where

import Prelude (Unit)
import Control.Monad.Eff (Eff)
import Engine.Effects (ENGINE, EngineEff)
import Engine.Color

foreign import drawStringEx :: forall eff. String -> Int -> Int -> Color -> Boolean -> Eff (e :: ENGINE | eff) Unit

drawString :: String -> Int -> Int -> Color -> EngineEff Unit
drawString s x y col = drawStringEx s x y col false

drawStringCenter :: String -> Int -> Int -> Color -> EngineEff Unit
drawStringCenter s x y col = drawStringEx s x y col true

foreign import drawWindow :: forall eff. Int -> Int -> Int -> Int -> Color -> Boolean -> Eff (e :: ENGINE | eff) Unit
