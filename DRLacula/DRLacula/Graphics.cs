using System;
using System.IO;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Microsoft.Xna.Framework;
using Microsoft.Xna.Framework.Graphics;
using Microsoft.Xna.Framework.Content;


namespace DRLacula
{
    public class Graphics
    {
        Texture2D terminalTexture;

        GraphicsDeviceManager graphicsDeviceManager;
        SpriteBatch spriteBatch;
        ContentManager content;

        Effect pixelEffect;
        RenderTarget2D mainRenderTarget;

        private double misalignFac;

        public int CharWidth { get; private set; }

        public int CharHeight { get; private set; }


        public Graphics(GraphicsDeviceManager graphicsDeviceManager, SpriteBatch spriteBatch, ContentManager content)
        {
            this.graphicsDeviceManager = graphicsDeviceManager;
            this.spriteBatch = spriteBatch;
            this.content = content;
        }

        public void LoadContent(int terminalWidth, int terminalHeight)
        {
            using (FileStream fileStream = new FileStream(@"fonts\terminal2x.png", FileMode.Open))
            {
                terminalTexture = Texture2D.FromStream(graphicsDeviceManager.GraphicsDevice, fileStream);
            }
            CharWidth = terminalTexture.Width / 16;
            CharHeight = terminalTexture.Height / 16;

            int windowWidth = CharWidth * terminalWidth;
            int windowHeight = CharHeight * terminalHeight;

            pixelEffect = content.Load<Effect>("pixel");
            pixelEffect.Parameters["Resolution"].SetValue(new Vector2(windowWidth, windowHeight));

            graphicsDeviceManager.PreferredBackBufferWidth = windowWidth;
            graphicsDeviceManager.PreferredBackBufferHeight = windowHeight;

            var pp = graphicsDeviceManager.GraphicsDevice.PresentationParameters;
            mainRenderTarget = new RenderTarget2D(graphicsDeviceManager.GraphicsDevice,
                windowWidth,
                windowHeight,
                false,
                pp.BackBufferFormat,
                pp.DepthStencilFormat);
        }

        public void Update(GameTime gameTime)
        {
            float dt = (float)gameTime.ElapsedGameTime.TotalMilliseconds / 1000f;

            misalignFac -= misalignFac * 2.0 * dt;
            double div = Math.Max(0.1, Math.Abs(misalignFac));
            double misalign = misalignFac * Math.Sin(8.0 / div * gameTime.TotalGameTime.TotalSeconds);

            if (Math.Abs(misalign) < 0.001)
            {
                misalign = 0.001;
            }

            pixelEffect.Parameters["Misalign"].SetValue((float)misalign);
            pixelEffect.Parameters["Time"].SetValue((float)gameTime.TotalGameTime.TotalSeconds * 8);
        }

        public void Shake(float amount)
        {
            misalignFac = 0.012f * amount;
        }

        public void BeginDraw()
        {
            graphicsDeviceManager.GraphicsDevice.SetRenderTarget(mainRenderTarget);
            graphicsDeviceManager.GraphicsDevice.Clear(Color.Black);
            spriteBatch.Begin();
        }

        public void EndDraw()
        {
            spriteBatch.End();
            graphicsDeviceManager.GraphicsDevice.SetRenderTarget(null);

            spriteBatch.Begin(SpriteSortMode.Immediate, BlendState.Opaque, SamplerState.PointClamp, null, null, pixelEffect);
            pixelEffect.CurrentTechnique.Passes[0].Apply();
            spriteBatch.Draw(mainRenderTarget, Vector2.Zero, Color.White);
            spriteBatch.End();
        }

        private static Point FontIndex(int c)
        {
            return new Point(c % 16, c / 16);
        }

        public void DrawChar(char c, int x, int y, Color color)
        {
            Point p = FontIndex((int)c);
            spriteBatch.Draw(terminalTexture, new Vector2(x * CharWidth, y * CharHeight),
                                 new Rectangle(p.X * CharWidth, p.Y * CharHeight, CharWidth, CharHeight),
                                 color);
        }

        public void DrawChar2(string c, int x, int y, int r, int g, int b)
        {
            DrawChar(c[0], x, y, new Color(r, g, b));
        }

        public void DrawString(string s, int x, int y, int r, int g, int b, bool centered)
        {
            var col = new Color(r, g, b);
            int startX = x;
            if (centered)
                x -= s.Length / 2;

            foreach (char c in s)
            {
                if (c == '\n')
                {
                    x = startX;
                    y += 1;
                    continue;
                }
                DrawChar(c, x, y, col);
                x++;
            }
        }

        public void DrawWindow(int x, int y, int width, int height, int r, int g, int b, bool fill)
        {
            var color = new Color(r, g, b);

            // Fill with black
            if (fill)
            {
                for (int yy = 1; yy < height - 1; yy++)
                {
                    for (int xx = 1; xx < width - 1; xx++)
                    {
                        DrawChar(' ', x + xx, y + yy, Color.Black);
                    }
                }
            }

            // Top & bottom line
            for (int i = 0; i < width; i++)
            {
                DrawChar(ASCII.LINE_H, x + i, y, color);
                DrawChar(ASCII.LINE_H, x + i, y + height - 1, color);
            }
            // Left & right lines
            for (int i = 0; i < height; i++)
            {
                DrawChar(ASCII.LINE_V, x, y + i, color);
                DrawChar(ASCII.LINE_V, x + width - 1, y + i, color);
            }
            // Corners
            DrawChar(ASCII.CORNER_TOP_LEFT, x, y, color);
            DrawChar(ASCII.CORNER_TOP_RIGHT, x + width - 1, y, color);
            DrawChar(ASCII.CORNER_BOTTOM_LEFT, x, y + height - 1, color);
            DrawChar(ASCII.CORNER_BOTTOM_RIGHT, x + width - 1, y + height - 1, color);
        }
    }
}
