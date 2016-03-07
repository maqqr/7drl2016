# dRLacula

dRLacula is a [7 day roguelike challenge 2016](http://7drl.org/) entry. The game is made using C#, [MonoGame](http://www.monogame.net/) and [Purescript](http://www.purescript.org/).

The player is a vampire that lives in a large randomly generated city and the objective is to drink blood from one unsuspecting victim every night and return to your home while avoiding guards and other city folk.

[Development blog](https://teamkalamakkara.wordpress.com/)

#### Build instructions

Install [MonoGame](http://www.monogame.net/) and [Purescript](http://www.purescript.org/). Build the solution using Visual Studio, MSBuild or xbuild.

Run the following commands in the ps directory:
```
bower install
pulp build --modules Game --to Game.js
```
