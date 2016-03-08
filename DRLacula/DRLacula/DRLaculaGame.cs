using System;
using System.IO;
using Microsoft.Xna.Framework;
using Microsoft.Xna.Framework.Graphics;
using Microsoft.Xna.Framework.Input;
using Microsoft.ClearScript.Windows;


namespace DRLacula
{
    /// <summary>
    /// This is the main type for your game.
    /// </summary>
    public class DRLaculaGame : Game
    {
        GraphicsDeviceManager graphicsDeviceManager;
        SpriteBatch spriteBatch;
        Graphics graphics;
        Input input;
        HotReload hotreload;

        JScriptEngine engine;
        dynamic gameState;

        public const int TerminalWidth = 80;
        public const int TerminalHeight = 30;

        public Graphics Graphics { get { return graphics; } }

        private static DRLaculaGame instance;
        public static DRLaculaGame Instance { get { return instance; } }

        private dynamic Script { get { return engine.Script.PS.Game; } }

        private string RootDirectory
        {
            get
            {
#if DEBUG
                return "..\\..\\..\\";
#else
                return (new FileInfo(System.Reflection.Assembly.GetEntryAssembly().Location)).Directory + "\\";
#endif
            }
        }

        public DRLaculaGame()
        {
            instance = this;
            graphicsDeviceManager = new GraphicsDeviceManager(this);
            input = new Input();
            hotreload = new HotReload();
            hotreload.OnReload += LoadScripts;
            Content.RootDirectory = "Content";
        }

        /// <summary>
        /// Allows the game to perform any initialization it needs to before starting to run.
        /// This is where it can query for any required services and load any non-graphic
        /// related content.  Calling base.Initialize will enumerate through any components
        /// and initialize them as well.
        /// </summary>
        protected override void Initialize()
        {
            input.OnKeyPress += KeyPressedHandler;
            LoadScripts();
            InitializeGameState();
            hotreload.StartWatching(Path.Combine(RootDirectory, "ps"));
            base.Initialize();
        }

        private void InitializeGameState()
        {
            gameState = Script.initialState;
        }
        
        private void LoadScripts()
        {
            engine = new JScriptEngine(WindowsScriptEngineFlags.EnableDebugging);
            engine.AddHostType("Game", typeof(DRLaculaGame));

            var src = File.ReadAllText(RootDirectory + "ps\\Game.js");
            src = src.Replace("PS[\"Main\"].main();", "");

            engine.Execute("Game.js", src);
        }

        /// <summary>
        /// LoadContent will be called once per game and is the place to load
        /// all of your content.
        /// </summary>
        protected override void LoadContent()
        {
            spriteBatch = new SpriteBatch(GraphicsDevice);
            graphics = new Graphics(graphicsDeviceManager, spriteBatch, Content);
            graphics.LoadContent(TerminalWidth, TerminalHeight);
        }

        /// <summary>
        /// UnloadContent will be called once per game and is the place to unload
        /// game-specific content.
        /// </summary>
        protected override void UnloadContent()
        {
        }

        /// <summary>
        /// Allows the game to run logic such as updating the world,
        /// checking for collisions, gathering input, and playing audio.
        /// </summary>
        /// <param name="gameTime">Provides a snapshot of timing values.</param>
        protected override void Update(GameTime gameTime)
        {
            hotreload.Update(gameTime);
            input.Update();
            graphics.Update(gameTime);
            base.Update(gameTime);
        }

        private void KeyPressedHandler(Keys key, bool shift)
        {
            int keyCode = (int)key;

            if (key == Keys.Escape)
                Exit();

            if (key == Keys.Space)
                graphics.Shake(0.5f);

            if (key == Keys.F11)
                LoadScripts();

            if (key == Keys.F10)
                InitializeGameState();

            gameState = Script.onKeyPress(gameState)(keyCode)(shift);
        }

        /// <summary>
        /// This is called when the game should draw itself.
        /// </summary>
        /// <param name="gameTime">Provides a snapshot of timing values.</param>
        protected override void Draw(GameTime gameTime)
        {
            graphics.BeginDraw();
            Script.drawFunc(gameState)();
            graphics.EndDraw();

            base.Draw(gameTime);
        }
    }
}
