
mkdir -p fs
emcc fs1.c -o fs/index.html -s FORCE_FILESYSTEM=full -sEXPORTED_RUNTIME_METHODS=ccall,cwrap