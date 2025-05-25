import { readFile } from 'fs/promises'

export default defineEventHandler(async () => {
  const data = await readFile('server/data/db.json', 'utf8')
  return JSON.parse(data)
})