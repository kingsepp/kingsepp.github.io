# Fix rejected push - Convert demo.mp4 to Git LFS

## The problem:

GitHub rejected the push because demo.mp4 (108MB) exceeds the 100MB limit.

## Solution on your local system:

1. **Install and setup Git LFS**:

   ```bash
   git lfs install
   ```

2. **Track the video file**:

   ```bash
   git lfs track ai4mbse/demo.mp4
   ```

3. **Add the video to LFS**:

   ```bash
   git add ai4mbse/demo.mp4
   git add .gitattributes
   ```

4. **Amend the rejected commit**:

   ```bash
   git commit --amend -m "Move demo.mp4 to Git LFS and add configuration"
   ```

5. **Force push the corrected commit**:
   ```bash
   git push --force-with-lease
   ```

## Alternative (if that doesn't work):

1. **Remove the video from the rejected commit**:

   ```bash
   git reset --soft HEAD~1
   git reset ai4mbse/demo.mp4
   ```

2. **Commit without the video first**:

   ```bash
   git commit -m "Add Git LFS configuration"
   git push
   ```

3. **Then add the video with LFS**:
   ```bash
   git lfs track ai4mbse/demo.mp4
   git add ai4mbse/demo.mp4 .gitattributes
   git commit -m "Add demo.mp4 via Git LFS"
   git push
   ```

The video will then be stored in Git LFS and GitHub will accept it!
