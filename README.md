# Run code
deno run --allow-net=loremricksum.com,localhost  src/main.ts


# Run tests
deno test --allow-net="loremricksum.com" 

# Compile to executable
deno compile --allow-net=loremricksum.com,localhost -o quotes main.ts