import path from 'node:path'

const IMAGE_EXTENSIONS = new Set(['.png', '.jpg', '.jpeg', '.gif', '.webp', '.svg'])

export interface DocumentImage {
  filename: string
  src: string
  ext: string
}

export default {
  // glob is resolved relative to this file's directory
  watch: ['./public/*'],
  load(watchedFiles: string[]): DocumentImage[] {
    return watchedFiles
      .filter((file) => IMAGE_EXTENSIONS.has(path.extname(file).toLowerCase()))
      .map((file) => {
        const filename = path.basename(file)
        return {
          filename,
          ext: path.extname(file),
          src: `/merces/${filename}`, // public/ is served at root
        }
      })
      .sort((a, b) => a.filename.localeCompare(b.filename))
  },
}