# Git LFS Setup Instructions

## What we've done:

- Created `.gitattributes` file to configure Git LFS for video files
- This tells Git to handle `.mp4`, `.zip`, `.mov`, `.avi` files with LFS

## What you need to do on your local system:

1. **Install Git LFS** (if not already installed):

   ```bash
   # On macOS:
   brew install git-lfs

   # On Ubuntu/Debian:
   sudo apt install git-lfs

   # On Windows: Download from https://git-lfs.github.io/
   ```

2. **Initialize Git LFS** (one-time setup):

   ```bash
   git lfs install
   ```

3. **Track the video file**:

   ```bash
   git lfs track ai4mbse/demo.mp4
   ```

4. **Commit and push**:
   ```bash
   git add .gitattributes
   git add ai4mbse/demo.mp4
   git commit -m "Move demo.mp4 to Git LFS"
   git push
   ```

## Benefits:

- ✅ Video stays in repository (no external links needed)
- ✅ No file size limits (GitHub LFS handles large files)
- ✅ Same quality - no compression needed
- ✅ Automatic handling for future video uploads

## Note:

GitHub provides 1GB free LFS storage and 1GB/month bandwidth for free accounts.
Your 108MB video fits easily within these limits.
