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
npm install || handle_error "Failed to install dependencies"

# Build the project
echo "Building the project..."
npm run build || handle_error "Build failed"

# Check if the server is already running under PM2
echo "Checking if the server is running under PM2..."
PM2_PROCESS_NAME="sleep360"  # Change this to the name you've used for your PM2 process
SERVER_PID=$(pm2 list | grep "$PM2_PROCESS_NAME" | awk '{print $4}')

if [ -z "$SERVER_PID" ]; then
    echo "No running server found. Starting the server..."
else
    # Start a new instance first (to avoid downtime)
    echo "Starting a new instance of the server..."
    pm2 start server.js -i max --name "$PM2_PROCESS_NAME" || handle_error "Failed to start the new server instance"

    # Wait for the new instance to be fully up and running (you can adjust the wait time as needed)
    echo "Waiting for the new server instance to start..."
    sleep 5  # Adjust this if necessary for your server startup time

    # Gracefully restart the old instance to achieve zero downtime
    echo "Gracefully restarting the old server instance..."
    pm2 restart "$PM2_PROCESS_NAME" || handle_error "Failed to restart the server instance"
fi

# Optionally, you can save the PM2 process list to ensure it's restarted after a reboot
echo "Saving the PM2 process list to ensure it restarts on system reboot..."
pm2 save || handle_error "Failed to save PM2 process list"

echo "Deployment complete!"
