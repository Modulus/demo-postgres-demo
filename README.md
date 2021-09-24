# Run code
deno run --allow-env=DATABASE_URL --allow-net=loremricksum.com,localhost  src/main.ts


# Run tests
deno test --allow-env=DATABASE_URL --allow-net=loremricksum.com,localhost 

# Compile to executable
deno compile --allow-env=DATABASE_URL --allow-net=loremricksum.com,localhost -o quotes src/main.ts


# Docker 
docker build -t app .
docker run --network=deno-postgres-demo_deno-demo --rm --name app -e DATABASE_URL=postgresql://demo:demo@postgres:5432/demo app  