module Drawing where

import Prelude
import Data.Array
import Data.String (fromChar)
import Data.Char (fromCharCode)

import Engine.Color
import Engine.Graphics
import Engine.Effects (EngineEff)


drawMenu :: EngineEff Unit
drawMenu = do
    drawWindow 12 1 51 9 white false
    drawMenuTitle 14 2
    
    drawWindow (40-16) 12 30 9 white false
    drawString (fromChar (fromCharCode 1) <> " Start new game") (40-14) 14  white

drawMenuTitle :: Int -> Int -> EngineEff Unit
drawMenuTitle x y = void $ foldM drawer y asciiArtTitle
    where
        drawer y s = const (y + 1) <$> drawString s x y white


asciiArtTitle :: Array String
asciiArtTitle = ["      _ _____  _                      _",
             "     | |  __ \\| |                    | |",
             "   __| | |__) | |     __ _  ___ _   _| | __ _",
             "  / _` |  _  /| |    / _` |/ __| | | | |/ _` |",
             " | (_| | | \\ \\| |___| (_| | (__| |_| | | (_| |",
             "  \\__,_|_|  \\_\\______\\__,_|\\___|\\__,_|_|\\__,_|"]
