#!/bin/bash

# Kill any existing instances of this script
sudo forever stop server.js

# Switch to the main branch
#git checkout main

# Pull the latest changes
git pull

# Install dependencies
npm install

# Build the project
npm run build

# Run the build
sudo forever start server.js