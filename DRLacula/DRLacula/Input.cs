using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Microsoft.Xna.Framework.Input;


namespace DRLacula
{
    class Input
    {
        public delegate void InputHandler(Keys key, bool shift);

        KeyboardState keyboard;
        KeyboardState oldkeyboard;

        public event InputHandler OnKeyPress;

        public bool Shift { get; private set; }


        public Input()
        {
            oldkeyboard = keyboard = new KeyboardState();
        }

        public void Update()
        {
            keyboard = Keyboard.GetState();
            Shift = keyboard.IsKeyDown(Keys.LeftShift) || keyboard.IsKeyDown(Keys.RightShift);
            if (OnKeyPress != null)
            {
                Keys key = GetAnyKey();
                if (key != Keys.None)
                    OnKeyPress(key, Shift);
            }
            oldkeyboard = keyboard;
        }

        public bool KeyPressed(Keys key)
        {
            bool pressed = !oldkeyboard.IsKeyDown(key) && keyboard.IsKeyDown(key);
            if (pressed)
            {
                oldkeyboard = new KeyboardState();
            }
            return pressed;
        }

        public bool AnyKeyPressed()
        {
            return keyboard.GetPressedKeys().Length > 0;
        }

        public bool IsKeyDown(Keys key)
        {
            return keyboard.IsKeyDown(key);
        }

        public Keys GetAnyKey()
        {
            Keys[] pressed = keyboard.GetPressedKeys();
            if (pressed.Length > 0)
            {
                if (!oldkeyboard.IsKeyDown(pressed[0])) // Key was not pressed on last frame
                    return pressed[0];
            }
            return Keys.None;
        }
    }
}
