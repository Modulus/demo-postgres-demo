FROM denoland/deno:1.14.1 as builder

COPY . . 

RUN deno cache src/main.ts
# CMD deno run --allow-env=DATABASE_URL --allow-net=loremricksum.com,postgres,localhost src/main.ts
RUN deno compile --allow-env=DATABASE_URL --allow-net=loremricksum.com,postgres,localhost -o quotes src/main.ts


FROM gcr.io/distroless/cc-debian10

COPY --from=builder . .

CMD ./quotes

