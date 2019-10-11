import { promises as fs } from 'fs'
import * as path from 'path'

interface Directory {
  [fileName: string]: Buffer
}

export const readDirectory = async (dir: string): Promise<Directory> => {
  const entries = await fs.readdir(dir)

  const result: Directory = {}
  for (const entry of entries) {
    const entryPath = path.join(dir, entry)
    const stats = await fs.stat(entryPath)

    if (stats.isFile()) {
      result[entry] = await fs.readFile(entryPath)
    }
  }

  return result
}
