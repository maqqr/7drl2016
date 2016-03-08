module Level where

import Prelude (not, ($), (+), (*))
import Data.Maybe (Maybe, fromMaybe)
import Data.Array (replicate, updateAt, (!!))

import Point

data Tile = Ground | Wall

data Level = Level
    { width  :: Int
    , height :: Int
    , tiles  :: Array Tile
    }

isTileSolid :: Tile -> Boolean
isTileSolid Wall = true
isTileSolid _    = false

isTileTransparent :: Tile -> Boolean
isTileTransparent tile = not $ isTileSolid tile

newLevel :: Int -> Int -> Level
newLevel w h = Level { width: w, height: h, tiles: replicate (w * h) Ground }

index :: Level -> Point -> Int
index (Level level) (Point p) = p.x + p.y * level.width

setTile :: Level -> Point -> Tile -> Level
setTile lvl@(Level level) point newTile =
    let maybeUpdatedTiles = updateAt (index lvl point) newTile level.tiles
        updatedTiles = fromMaybe level.tiles maybeUpdatedTiles
    in Level $ level { tiles = updatedTiles }

getTile :: Level -> Point -> Maybe Tile
getTile lvl@(Level level) point = level.tiles !! index lvl point
