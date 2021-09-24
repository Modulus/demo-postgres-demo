FROM denoland/deno:1.14.1

COPY . . 

RUN deno cache src/main.ts
CMD deno run --allow-env=DATABASE_URL --allow-net=loremricksum.com,postgres,localhost src/main.ts