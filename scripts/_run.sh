#!/bin/bash

# Switch to the main branch
git checkout main

# Pull the latest changes
git pull

# Install dependencies
npm install

# Build the project
npm run build

# Run the build
node build