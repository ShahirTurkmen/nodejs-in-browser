/// <reference path="./vfs.ts" />

interface Environment {
  fs: VirtualFileSystem;
  cwd: string;
  // fs2:VirtualFileSystem
}