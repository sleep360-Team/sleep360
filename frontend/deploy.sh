#!/bin/bash

# Kill any existing instances of this script
pkill -f "deploy-run.sh"
./scripts/deploy-run.sh &