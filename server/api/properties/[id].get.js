import { readFile } from 'fs/promises'

export default defineEventHandler(async (event) => {
  const id = Number(event.context.params.id)
  const data = await readFile('server/data/db.json', 'utf8')
  const list = JSON.parse(data)
  return list.find(item => item.id === id)
})