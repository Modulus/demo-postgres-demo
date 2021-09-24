# Run code
deno run --allow-net=loremricksum.com,localhost  src/main.ts


# Run tests
deno test --allow-net="loremricksum.com" 

# Compile to executable
deno compile --allow-net=loremricksum.com,localhost -o quotes main.ts


# Docker 
docker build -t app .
docker run --network=deno-postgres-demo_deno-demo --rm --name app -e DATABASE_URL=postgresql://demo:demo@postgres:5432/demo app  