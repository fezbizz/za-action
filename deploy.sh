#!/usr/bin/env bash
# deploy.sh — Deploy SA Action to GitHub Pages
# 
# Usage:
#   1. Create a repo on GitHub: https://github.com/new
#   2. Run: chmod +x deploy.sh
#   3. Run: ./deploy.sh <your-github-username> <repo-name>
#
# Example: ./deploy.sh siyabonga za-action
#
# This pushes the site to the gh-pages branch.
# Then go to Settings > Pages on your repo and set source to gh-pages.

set -e

USERNAME="${1:-}"
REPO="${2:-za-action}"

if [ -z "$USERNAME" ]; then
    echo "Usage: ./deploy.sh <github-username> [repo-name]"
    echo "Example: ./deploy.sh siyabonga za-action"
    exit 1
fi

echo "🚀 Deploying SA Action to GitHub Pages..."
echo "   Repo: $USERNAME/$REPO"
echo ""

# Init git if needed
if [ ! -d .git ]; then
    git init
    git checkout -b main
fi

# Make sure we have the right remote
if ! git remote get-url origin 2>/dev/null; then
    git remote add origin "https://github.com/$USERNAME/$REPO.git"
fi

# Add all files
git add .
git commit -m "Initial deploy: SA Action youth mobilization hub" || true

# Create the gh-pages branch with just the site files
echo "📦 Creating gh-pages branch..."
if git rev-parse --verify gh-pages 2>/dev/null; then
    git branch -D gh-pages
fi
git subtree split --prefix . -b gh-pages 2>/dev/null || git checkout -b gh-pages

echo ""
echo "✅ Ready to push! Run:"
echo "   git push origin gh-pages --force"
echo ""
echo "Then enable GitHub Pages in your repo Settings → Pages → branch: gh-pages"
echo "Your site will be at: https://$USERNAME.github.io/$REPO/"
