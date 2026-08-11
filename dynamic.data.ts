import fs from 'node:fs'
import path from 'node:path'
import yaml from 'js-yaml'

export default {
  watch: ['./data/*.yml'], // rebuilds when the file changes in dev

  load(watchedFiles: string[]): any[] {
    const obj = {}
      watchedFiles.forEach((file) => {
          const fileContent = fs.readFileSync(file, 'utf-8')
          const data = yaml.load(fileContent)
          obj[path.basename(file, '.yml')] = data[path.basename(file, '.yml')]
      })
      return obj
    },
}