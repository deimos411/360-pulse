const express = require('express')
const fs = require('fs')
const path = require('path')

// Load configuration from config.json
const config = require('./config.json')

// Resolve the image directory path relative to the current directory (__dirname)
const imageDirectory = path.resolve(__dirname, config.searchDirectory)

const app = express()
const PORT = 3000

// Function to get the 100 most recent images in a directory and its subdirectories
const getMostRecentImages = (dir) => {
  let files = fs.readdirSync(dir)
  let images = []

  files.forEach((file) => {
    let fullPath = path.join(dir, file)
    let stat = fs.statSync(fullPath)

    if (stat.isDirectory()) {
      images = images.concat(getMostRecentImages(fullPath))
    } else if (
      stat.isFile() &&
      (file.endsWith('.jpg') || file.endsWith('.jpeg') || file.endsWith('.png'))
    ) {
      const relativePath = path.relative(imageDirectory, fullPath) // Convert to relative path
      images.push({
        path: relativePath,
        mtime: stat.mtime,
      })
    }
  })

  return images // Return all collected images for this directory and its subdirectories
}

// public hml
app.use(express.static(path.join(__dirname, 'public')))

// images
const publicImages = express.static(
  path.join(__dirname, '../comfyui/ComfyUI_windows_portable/ComfyUI/output/')
)
app.use('/images', publicImages)

app.get('/most-recent-images', (req, res) => {
  const mostRecentImages = getMostRecentImages(imageDirectory)
  if (mostRecentImages.length > 0) {
    const topImages = mostRecentImages
      .sort((a, b) => b.mtime - a.mtime)
      .slice(0, 100)
      .map((image) => 'images/' + image.path) // Return the relative paths
    res.json({ images: topImages })
  } else {
    res.status(404).send('No images found')
  }
})

app.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`)
})
