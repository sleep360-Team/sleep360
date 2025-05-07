#!/bin/bash

# Function to handle errors and exit if a command fails
handle_error() {
    echo "Error: $1"
    exit 1
}

# Switch to the main branch
echo "Switching to the main branch..."
git checkout main || handle_error "Failed to checkout main branch"

# Pull the latest changes
echo "Pulling latest changes from the repository..."
git pull || handle_error "Failed to pull changes"

# Install dependencies
echo "Installing npm dependencies..."
npm ci || handle_error "Failed to install dependencies"

# Build the project
echo "Building the project..."
npm run build || handle_error "Build failed"

# Check if the server is already running under PM2
echo "Checking if the server is already running under PM2..."
PM2_PROCESS_NAME="sleep360.csse"
SERVER_PID=$(sudo pm2 list | grep "$PM2_PROCESS_NAME" | awk '{print $4}')

if [ -z "$SERVER_PID" ]; then
    # If no instance is running, start the server with load balancing
    echo "No running server found. Starting the server with load balancing..."
    sudo pm2 start server.js -i max --name "$PM2_PROCESS_NAME" || handle_error "Failed to start the server with PM2"
else
    # If a server is running, perform zero-downtime restart
    echo "Server is already running. Performing a zero-downtime restart..."
    sudo pm2 restart "$PM2_PROCESS_NAME" || handle_error "Failed to restart the server"
fi

# Optionally, you can save the PM2 process list to ensure it's restarted after a reboot
echo "Saving the PM2 process list to ensure it restarts on system reboot..."
sudo pm2 save || handle_error "Failed to save PM2 process list"

echo "Deployment complete!"
