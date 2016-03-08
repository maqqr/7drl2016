// Generated by psc-bundle 0.8.2.0
var PS = { };
(function(exports) {
  /* global exports */
  "use strict";

  // module Control.Monad.Eff

  exports.returnE = function (a) {
    return function () {
      return a;
    };
  };

  exports.bindE = function (a) {
    return function (f) {
      return function () {
        return f(a())();
      };
    };
  };
 
})(PS["Control.Monad.Eff"] = PS["Control.Monad.Eff"] || {});
(function(exports) {
  // Generated by psc version 0.8.2.0
  "use strict";
  var $foreign = PS["Prelude"];
  var Functor = function (map) {
      this.map = map;
  };
  var Apply = function (__superclass_Prelude$dotFunctor_0, apply) {
      this["__superclass_Prelude.Functor_0"] = __superclass_Prelude$dotFunctor_0;
      this.apply = apply;
  };
  var Applicative = function (__superclass_Prelude$dotApply_0, pure) {
      this["__superclass_Prelude.Apply_0"] = __superclass_Prelude$dotApply_0;
      this.pure = pure;
  };
  var Bind = function (__superclass_Prelude$dotApply_0, bind) {
      this["__superclass_Prelude.Apply_0"] = __superclass_Prelude$dotApply_0;
      this.bind = bind;
  };
  var Monad = function (__superclass_Prelude$dotApplicative_0, __superclass_Prelude$dotBind_1) {
      this["__superclass_Prelude.Applicative_0"] = __superclass_Prelude$dotApplicative_0;
      this["__superclass_Prelude.Bind_1"] = __superclass_Prelude$dotBind_1;
  };                                                                           
  var unit = {};      
  var pure = function (dict) {
      return dict.pure;
  };
  var $$return = function (dictApplicative) {
      return pure(dictApplicative);
  };
  var map = function (dict) {
      return dict.map;
  };
  var $less$dollar$greater = function (dictFunctor) {
      return map(dictFunctor);
  };
  var $$const = function (a) {
      return function (v) {
          return a;
      };
  };
  var bind = function (dict) {
      return dict.bind;
  }; 
  var apply = function (dict) {
      return dict.apply;
  };
  var $less$times$greater = function (dictApply) {
      return apply(dictApply);
  };
  var liftA1 = function (dictApplicative) {
      return function (f) {
          return function (a) {
              return $less$times$greater(dictApplicative["__superclass_Prelude.Apply_0"]())(pure(dictApplicative)(f))(a);
          };
      };
  };
  var ap = function (dictMonad) {
      return function (f) {
          return function (a) {
              return bind(dictMonad["__superclass_Prelude.Bind_1"]())(f)(function (v) {
                  return bind(dictMonad["__superclass_Prelude.Bind_1"]())(a)(function (v1) {
                      return $$return(dictMonad["__superclass_Prelude.Applicative_0"]())(v(v1));
                  });
              });
          };
      };
  };
  exports["Monad"] = Monad;
  exports["Bind"] = Bind;
  exports["Applicative"] = Applicative;
  exports["Apply"] = Apply;
  exports["Functor"] = Functor;
  exports["ap"] = ap;
  exports["return"] = $$return;
  exports["bind"] = bind;
  exports["liftA1"] = liftA1;
  exports["pure"] = pure;
  exports["apply"] = apply;
  exports["<$>"] = $less$dollar$greater;
  exports["map"] = map;
  exports["const"] = $$const;
  exports["unit"] = unit;;
 
})(PS["Prelude"] = PS["Prelude"] || {});
(function(exports) {
  // Generated by psc version 0.8.2.0
  "use strict";
  var $foreign = PS["Control.Monad.Eff"];
  var Prelude = PS["Prelude"];     
  var monadEff = new Prelude.Monad(function () {
      return applicativeEff;
  }, function () {
      return bindEff;
  });
  var bindEff = new Prelude.Bind(function () {
      return applyEff;
  }, $foreign.bindE);
  var applyEff = new Prelude.Apply(function () {
      return functorEff;
  }, Prelude.ap(monadEff));
  var applicativeEff = new Prelude.Applicative(function () {
      return applyEff;
  }, $foreign.returnE);
  var functorEff = new Prelude.Functor(Prelude.liftA1(applicativeEff));
  exports["functorEff"] = functorEff;
  exports["applyEff"] = applyEff;
  exports["applicativeEff"] = applicativeEff;
  exports["bindEff"] = bindEff;
  exports["monadEff"] = monadEff;;
 
})(PS["Control.Monad.Eff"] = PS["Control.Monad.Eff"] || {});
(function(exports) {
  /* global exports */
  "use strict";

  exports.replicate = function (n) {
    return function (v) {
      if (n < 1) return [];
      var r = new Array(n);
      for (var i = 0; i < n; i++) r[i] = v;
      return r;
    };
  };

  //------------------------------------------------------------------------------
  // Array size ------------------------------------------------------------------
  //------------------------------------------------------------------------------

  exports.length = function (xs) {
    return xs.length;
  };

  //------------------------------------------------------------------------------
  // Indexed operations ----------------------------------------------------------
  //------------------------------------------------------------------------------

  exports.indexImpl = function (just) {
    return function (nothing) {
      return function (xs) {
        return function (i) {
          return i < 0 || i >= xs.length ? nothing :  just(xs[i]);
        };
      };
    };
  };
 
})(PS["Data.Array"] = PS["Data.Array"] || {});
(function(exports) {
  // Generated by psc version 0.8.2.0
  "use strict";
  var Prelude = PS["Prelude"];
  var Control_Alt = PS["Control.Alt"];
  var Control_Alternative = PS["Control.Alternative"];
  var Control_Extend = PS["Control.Extend"];
  var Control_MonadPlus = PS["Control.MonadPlus"];
  var Control_Plus = PS["Control.Plus"];
  var Data_Functor_Invariant = PS["Data.Functor.Invariant"];
  var Data_Monoid = PS["Data.Monoid"];     
  var Nothing = (function () {
      function Nothing() {

      };
      Nothing.value = new Nothing();
      return Nothing;
  })();
  var Just = (function () {
      function Just(value0) {
          this.value0 = value0;
      };
      Just.create = function (value0) {
          return new Just(value0);
      };
      return Just;
  })();
  exports["Nothing"] = Nothing;
  exports["Just"] = Just;;
 
})(PS["Data.Maybe"] = PS["Data.Maybe"] || {});
(function(exports) {
  // Generated by psc version 0.8.2.0
  "use strict";
  var $foreign = PS["Data.Array"];
  var Prelude = PS["Prelude"];
  var Control_Alt = PS["Control.Alt"];
  var Control_Alternative = PS["Control.Alternative"];
  var Control_Lazy = PS["Control.Lazy"];
  var Control_MonadPlus = PS["Control.MonadPlus"];
  var Control_Plus = PS["Control.Plus"];
  var Data_Foldable = PS["Data.Foldable"];
  var Data_Functor_Invariant = PS["Data.Functor.Invariant"];
  var Data_Maybe = PS["Data.Maybe"];
  var Data_Monoid = PS["Data.Monoid"];
  var Data_Traversable = PS["Data.Traversable"];
  var Data_Tuple = PS["Data.Tuple"];
  var Data_Maybe_Unsafe = PS["Data.Maybe.Unsafe"];
  var index = $foreign.indexImpl(Data_Maybe.Just.create)(Data_Maybe.Nothing.value);
  var $bang$bang = index;
  exports["index"] = index;
  exports["!!"] = $bang$bang;
  exports["replicate"] = $foreign.replicate;;
 
})(PS["Data.Array"] = PS["Data.Array"] || {});
(function(exports) {
  // Generated by psc version 0.8.2.0
  "use strict";
  var white = {
      r: 255, 
      g: 255, 
      b: 255
  };
  exports["white"] = white;;
 
})(PS["Engine.Color"] = PS["Engine.Color"] || {});
(function(exports) {
  "use strict";

  // module Engine.Graphics

  exports.for2impl = function(sy) {
      return function (ey) {
          return function (sx) {
              return function (ex) {
                  return function (func) {
                      return function () {
                          for (var y=sy; y < ey; y++) {
                              for (var x=sx; x < ex; x++) {
                                  func(x)(y)();
                              }
                          }
                          return {};
                      };
                  };
              };
          };
      };
  };

  exports.drawChar = function(c) {
      return function (x) {
          return function (y) {
              return function (col) {
                  return function () {
                      Game.Instance.Graphics.DrawChar2(c, x, y, col.r, col.g, col.b);
                      return {};
                  };
              };
          };
      };
  };
})(PS["Engine.Graphics"] = PS["Engine.Graphics"] || {});
(function(exports) {
  // Generated by psc version 0.8.2.0
  "use strict";
  var $foreign = PS["Engine.Graphics"];
  var Prelude = PS["Prelude"];
  var Control_Monad_Eff = PS["Control.Monad.Eff"];
  var Engine_Effects = PS["Engine.Effects"];
  var Engine_Color = PS["Engine.Color"];     
  var for$prime$prime = $foreign.for2impl;
  exports["for''"] = for$prime$prime;
  exports["drawChar"] = $foreign.drawChar;;
 
})(PS["Engine.Graphics"] = PS["Engine.Graphics"] || {});
(function(exports) {
  // Generated by psc version 0.8.2.0
  "use strict";
  var Prelude = PS["Prelude"];
  var Data_Maybe = PS["Data.Maybe"];
  var Data_Array = PS["Data.Array"];
  var Point = PS["Point"];     
  var Ground = (function () {
      function Ground() {

      };
      Ground.value = new Ground();
      return Ground;
  })();
  var Level = (function () {
      function Level(value0) {
          this.value0 = value0;
      };
      Level.create = function (value0) {
          return new Level(value0);
      };
      return Level;
  })();
  var newLevel = function (w) {
      return function (h) {
          return new Level({
              width: w, 
              height: h, 
              tiles: Data_Array.replicate(w * h | 0)(Ground.value)
          });
      };
  };
  var index = function (v) {
      return function (v1) {
          return v1.x + (v1.y * v.value0.width | 0) | 0;
      };
  };
  var getTile = function (v) {
      return function (point) {
          return Data_Array["!!"](v.value0.tiles)(index(v)(point));
      };
  };
  exports["Level"] = Level;
  exports["Ground"] = Ground;
  exports["getTile"] = getTile;
  exports["index"] = index;
  exports["newLevel"] = newLevel;;
 
})(PS["Level"] = PS["Level"] || {});
(function(exports) {
  // Generated by psc version 0.8.2.0
  "use strict";
  var Prelude = PS["Prelude"];
  var Data_Array = PS["Data.Array"];
  var Data_String = PS["Data.String"];
  var Data_Char = PS["Data.Char"];
  var Data_Maybe = PS["Data.Maybe"];
  var Data_Foldable = PS["Data.Foldable"];
  var Engine_Color = PS["Engine.Color"];
  var Engine_Graphics = PS["Engine.Graphics"];
  var Engine_Effects = PS["Engine.Effects"];
  var Point = PS["Point"];
  var Level = PS["Level"];
  var Control_Monad_Eff = PS["Control.Monad.Eff"];
  var tileColor = function (v) {
      if (v instanceof Level.Ground) {
          return Engine_Color.white;
      };
      return Engine_Color.white;
  };
  var tileChar = function (v) {
      if (v instanceof Level.Ground) {
          return ".";
      };
      return "?";
  };
  var drawLevel = function (v) {
      var drawTile = function (v1) {
          var maybeTile = Level.getTile(v)(v1);
          if (maybeTile instanceof Data_Maybe.Just) {
              return Engine_Graphics.drawChar(tileChar(maybeTile.value0))(v1.x)(v1.y)(tileColor(maybeTile.value0));
          };
          if (maybeTile instanceof Data_Maybe.Nothing) {
              return Prelude["return"](Control_Monad_Eff.applicativeEff)(Prelude.unit);
          };
          throw new Error("Failed pattern match at Drawing line 39, column 16 - line 45, column 1: " + [ maybeTile.constructor.name ]);
      };
      var drawer = function (y) {
          return function (p) {
              return Prelude["<$>"](Control_Monad_Eff.functorEff)(Prelude["const"](y + 1 | 0))(drawTile(p));
          };
      };
      return Engine_Graphics["for''"](0)(20)(0)(20)(function (x$prime) {
          return function (y$prime) {
              return drawTile({
                  x: x$prime, 
                  y: y$prime
              });
          };
      });
  };
  exports["drawLevel"] = drawLevel;
  exports["tileColor"] = tileColor;
  exports["tileChar"] = tileChar;;
 
})(PS["Drawing"] = PS["Drawing"] || {});
(function(exports) {
  // Generated by psc version 0.8.2.0
  "use strict";
  var Level = PS["Level"];     
  var GameState = (function () {
      function GameState(value0) {
          this.value0 = value0;
      };
      GameState.create = function (value0) {
          return new GameState(value0);
      };
      return GameState;
  })();
  var initialGameState = new GameState({
      level: Level.newLevel(20)(20)
  });
  exports["GameState"] = GameState;
  exports["initialGameState"] = initialGameState;;
 
})(PS["GameState"] = PS["GameState"] || {});
(function(exports) {
  // Generated by psc version 0.8.2.0
  "use strict";
  var Prelude = PS["Prelude"];
  var Data_Array = PS["Data.Array"];
  var Engine_Effects = PS["Engine.Effects"];
  var Drawing = PS["Drawing"];
  var GameState = PS["GameState"];     
  var onKeyPress = function (state) {
      return function (key) {
          return function (shift) {
              return state;
          };
      };
  };
  var initialState = GameState.initialGameState;
  var drawFunc = function (v) {
      return Drawing.drawLevel(v.value0.level);
  };
  exports["onKeyPress"] = onKeyPress;
  exports["drawFunc"] = drawFunc;
  exports["initialState"] = initialState;;
 
})(PS["Game"] = PS["Game"] || {});

PS["Main"].main();
