#!/bin/sh
# Get the current branch name
branch_name=$(git symbolic-ref --short HEAD)

# Allow branches starting with 'env/'
if echo "$branch_name" | grep -qE "^env/"; then
  exit 0
fi

# Enforce the <type>/<description> format
if ! echo "$branch_name" | grep -qE "^(feat|fix|test|chore)/[a-z0-9._-]+$"; then
  echo "❌ Invalid branch name: '$branch_name'"
  echo "Branch names must follow the format: <type>/<description>"
  echo "Allowed types: 'feat', 'fix', 'test', 'chore'"
  exit 1
fi

echo "✅ Branch name is valid: '$branch_name'"