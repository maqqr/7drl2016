"use strict";

// module Drawing

exports.drawLevelImpl = function(level) {
    return function (drawer) {
        return function () {
            for (var y=0; y < level.height; y++) {
                for (var x=0; x < level.width; x++) {
                    drawer(x)(y)(level.tiles[x + y * level.width])();
                }
            }
            return {};
        };
    };
};
