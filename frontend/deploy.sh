#!/bin/bash

# Get the script name
SCRIPT_NAME=$(basename "$0")

# Kill any existing instances of this script
pkill -f "$SCRIPT_NAME"

# Run the script in the background
{
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
} &

# Exit the script
exit 0