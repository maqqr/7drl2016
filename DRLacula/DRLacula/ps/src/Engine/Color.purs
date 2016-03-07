module Engine.Color where

type Color = { r :: Int, g :: Int, b :: Int }

white :: Color
white = { r: 255, g: 255, b: 255 }

red :: Color
red = { r: 255, g: 0, b: 0 }
