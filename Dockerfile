FROM denoland/deno:1.14.1


CMD deno run --allow-net="loremricksum.com" src/main.ts