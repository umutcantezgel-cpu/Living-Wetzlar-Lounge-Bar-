#!/bin/bash

# Netlify Build Verification Script
# This script checks if your project is ready for Netlify deployment

echo "🔍 Netlify Build Verification"
echo "=============================="
echo ""

# Check Node version
echo "✓ Checking Node version..."
node -v
if [ $? -ne 0 ]; then
    echo "❌ Node.js not found!"
    exit 1
fi

# Check npm version
echo "✓ Checking npm version..."
npm -v
if [ $? -ne 0 ]; then
    echo "❌ npm not found!"
    exit 1
fi

# Check for required files
echo "✓ Checking required files..."
required_files=("package.json" "netlify.toml" "vite.config.js" "index.html" "src/main.jsx")
for file in "${required_files[@]}"; do
    if [ ! -f "$file" ]; then
        echo "❌ Missing required file: $file"
        exit 1
    fi
    echo "  ✓ $file found"
done

# Check for Netlify config files
echo "✓ Checking Netlify config files..."
netlify_files=("public/_redirects" "public/_headers" ".nvmrc")
for file in "${netlify_files[@]}"; do
    if [ -f "$file" ]; then
        echo "  ✓ $file found"
    else
        echo "  ⚠ $file not found (optional)"
    fi
done

# Install dependencies
echo ""
echo "📦 Installing dependencies..."
npm install
if [ $? -ne 0 ]; then
    echo "❌ Failed to install dependencies!"
    exit 1
fi

# Run build
echo ""
echo "🏗️ Building project..."
npm run build
if [ $? -ne 0 ]; then
    echo "❌ Build failed!"
    exit 1
fi

# Check dist folder
echo ""
echo "✓ Checking build output..."
if [ ! -d "dist" ]; then
    echo "❌ dist folder not created!"
    exit 1
fi

if [ ! -f "dist/index.html" ]; then
    echo "❌ dist/index.html not found!"
    exit 1
fi

echo "  ✓ dist folder created"
echo "  ✓ index.html found"

# List dist contents
echo ""
echo "📂 Build output structure:"
ls -lah dist/

# Check file sizes
echo ""
echo "📊 Bundle size check:"
if [ -d "dist/assets" ]; then
    du -sh dist/assets/*
fi

echo ""
echo "✅ Build verification complete!"
echo ""
echo "🚀 Your project is ready for Netlify!"
echo ""
echo "Next steps:"
echo "1. Run: netlify login"
echo "2. Run: netlify init"
echo "3. Run: netlify deploy --prod"
echo ""
echo "Or use one-click deploy:"
echo "https://app.netlify.com/start/deploy?repository=YOUR_REPO_URL"
