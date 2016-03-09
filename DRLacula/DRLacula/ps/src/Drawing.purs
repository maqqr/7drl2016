module Drawing where

import Prelude
import Data.Array
import Data.String (fromChar)
import Data.Char (fromCharCode)
import Data.Maybe
import Data.Foldable
import Control.Monad.Eff (Eff)

import Engine.Color
import Engine.Graphics
import Engine.Effects (EngineEff, ENGINE)
import Point
import Level

foreign import drawLevelImpl
    :: forall eff. { width :: Int, height :: Int, tiles :: Array Tile }
    -> (Int -> Int -> Tile -> Eff (e :: ENGINE | eff) Unit)
    -> Eff (e :: ENGINE | eff) Unit

tileChar :: Tile -> Char
tileChar Ground = '.'
tileChar _      = '?'

tileColor :: Tile -> Color
tileColor Ground = white
tileColor _      = white

viewportPoints :: Array Point
viewportPoints = do
    x' <- 0 .. 30
    y' <- 0 .. 10
    return $ Point {x: x', y: y'} 

drawLevel :: Level -> EngineEff Unit
drawLevel lvl@(Level level) = drawLevelImpl level drawTile'
    where
        drawer y p = const (y + 1) <$> drawTile p
    
        drawTile' :: Int -> Int -> Tile -> EngineEff Unit
        drawTile' x y t = drawChar (tileChar t) x y (tileColor t)
    
        drawTile :: Point -> EngineEff Unit
        drawTile p'@(Point p) =
            let maybeTile = getTile lvl p'
            in case maybeTile of
                Just t  -> drawChar (tileChar t) p.x p.y (tileColor t)
                Nothing -> return unit

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
