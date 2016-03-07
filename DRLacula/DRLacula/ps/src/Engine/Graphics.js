"use strict";

// module Engine.Graphics

exports.drawStringEx = function(str) {
    return function (x) {
        return function (y) {
            return function (col) {
                return function (center) {
                    return function () {
                        Game.Instance.Graphics.DrawString(str, x, y, col.r, col.g, col.b, center);
                        return {};
                    };
                };
            };
        };
    };
};

exports.drawWindow = function(x) {
    return function (y) {
        return function (width) {
            return function (height) {
                return function (col) {
                    return function (fill) {
                        return function () {
                            Game.Instance.Graphics.DrawWindow(x, y, width, height, col.r, col.g, col.b, fill);
                            return {};
                        };
                    };
                };
            };
        };
    };
};