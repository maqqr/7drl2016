using System;
using System.IO;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Microsoft.Xna.Framework;

namespace DRLacula
{
    public class HotReload
    {
        public event Action OnReload;

        private double reloadTimer = 0f;

        private bool needReloading = false;

        public HotReload()
        {
        }

        public void StartWatching(string path)
        {
            FileSystemWatcher watcher = new FileSystemWatcher();
            watcher.Path = path;
            watcher.NotifyFilter = NotifyFilters.LastAccess | NotifyFilters.LastWrite
               | NotifyFilters.FileName | NotifyFilters.DirectoryName;
            watcher.Filter = "*.js";
            watcher.Changed += new FileSystemEventHandler(OnChanged);
            watcher.EnableRaisingEvents = true;
        }

        private void OnChanged(object source, FileSystemEventArgs e)
        {
            reloadTimer = 0.5f;
            needReloading = true;
        }

        public void Update(GameTime gameTime)
        {
            if (OnReload == null)
                return;

            if (needReloading && reloadTimer > 0f)
            {
                reloadTimer -= gameTime.ElapsedGameTime.TotalSeconds;

                if (reloadTimer <= 0f)
                {
                    try
                    {
                        OnReload();
                        needReloading = false;
                    }
                    catch(IOException)
                    {
                        reloadTimer = 0.5f;
                    }
                }
            }
        }
    }
}
