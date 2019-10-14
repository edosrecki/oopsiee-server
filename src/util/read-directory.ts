import fs from 'fs'
import path from 'path'

interface Directory {
  [fileName: string]: Buffer
}

export const readDirectory = (dir: string): Directory => {
  const entries = fs.readdirSync(dir)

  const result: Directory = {}
  for (const entry of entries) {
    const entryPath = path.join(dir, entry)
    const stats = fs.statSync(entryPath)

    if (stats.isFile()) {
      result[entry] = fs.readFileSync(entryPath)
    }
  }

  return result
}
