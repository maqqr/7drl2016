module Engine.Effects where

import Control.Monad.Eff

foreign import data ENGINE :: !

type EngineEff a = forall eff. Eff (e :: ENGINE | eff) a
