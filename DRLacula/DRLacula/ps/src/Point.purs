module Point where

import Prelude
import Data.Int (toNumber, floor)
import Math (abs)

newtype Point = Point { x :: Int, y :: Int }

instance semiringPoint :: Semiring Point where
    add (Point a) (Point b) = Point { x: a.x + b.x, y: a.y + b.y}
    mul (Point a) (Point b) = Point { x: a.x * b.x, y: a.y * b.y}
    zero = Point {x: 0, y: 0}
    one = Point {x: 1, y: 1}

instance ringPoint :: Ring Point where
    sub (Point a) (Point b) = Point { x: a.x - b.x, y: a.y - b.y}

instance eqPoint :: Eq Point where
    eq (Point a) (Point b) = a.x == b.x && a.y == b.y

instance showPoint :: Show Point where
    show (Point p) = "(" ++ show p.x ++ ", " ++ show p.y ++ ")"


manhattanDistance :: Point -> Point -> Int
manhattanDistance (Point {x=x1, y=y1}) (Point {x=x2, y=y2}) = intAbs (x1 - x2) + intAbs (y1 - y2)
    where
        intAbs :: Int -> Int
        intAbs = floor <<< abs <<< toNumber


distanceSq :: Point -> Point -> Int
distanceSq (Point {x=x1, y=y1}) (Point {x=x2, y=y2}) = (x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2)
