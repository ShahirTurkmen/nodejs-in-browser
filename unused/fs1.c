#include <stdlib.h>
#include <stdio.h>
#include <dirent.h>
#include <string.h>
#include <errno.h>
#include <sys/types.h>
#include <sys/stat.h>
#include <unistd.h>
#include <fcntl.h>
#include <emscripten.h>
#include "fs.c"


int fs(){
  return fs_chown;
}

int main(){
  fs();
  fs_mkdir("/tmp/ls",777);
  
  return fs_mkdir;
}