# Ensure package.json exists
if (-not (Test-Path "package.json")) {
    Write-Host "No package.json found. Creating Vite project..." -ForegroundColor Cyan
    # This initializes a standard React-TS Vite project if you haven't yet
    npm init -y
}

# Define production dependencies
$dependencies = @(
    "@emotion/react@11.14.0",
    "@emotion/styled@11.14.1",
    "@mui/material@7.3.6",
    "@tailwindcss/vite@4.1.18",
    "axios@1.12.2",
    "chart.js@4.5.1",
    "framer-motion@12.23.26",
    "react@18.3.1",
    "react-chartjs-2@5.3.1",
    "react-dom@18.3.1",
    "react-toast@1.0.3",
    "react-toastify@11.0.5",
    "tailwindcss@4.1.18"
)

# Define development dependencies (Tooling and Types)
$devDependencies = @(
    "@eslint/js@9.8.0",
    "@types/react@18.3.3",
    "@types/react-dom@18.3.0",
    "@vitejs/plugin-react@4.3.1",
    "eslint@10.0.2",
    "eslint-plugin-react-refresh@0.4.9",
    "globals@15.9.0",
    "react-router-dom@7.13.1",
    "typescript@5.5.3",
    "typescript-eslint@8.0.0",
    "vite@7.2.2"
)

Write-Host "Installing frontend production dependencies..." -ForegroundColor Green
npm install $dependencies

Write-Host "Installing frontend development dependencies..." -ForegroundColor Green
npm install --save-dev $devDependencies

Write-Host "Frontend setup complete!" -ForegroundColor Cyan