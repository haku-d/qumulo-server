import { inject } from '@adonisjs/core'
import fs from 'node:fs/promises'
import path from 'node:path'

enum Period {
  LAST_24_HOURS = '24h',
  LAST_7_DAYS = '7d',
  LAST_30_DAYS = '30d',
}

@inject()
export default class MetricService {
  async all(period = Period.LAST_7_DAYS) {
    const file = path.resolve(process.cwd(), 'database', `db-${period}.json`)
    const raw = await fs.readFile(file, 'utf-8')
    return JSON.parse(raw)
  }
}
