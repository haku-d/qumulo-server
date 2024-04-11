import { BaseCommand } from '@adonisjs/core/ace'
import type { CommandOptions } from '@adonisjs/core/types/ace'

import { addMinutes, addHours, subHours, parse, subDays } from 'date-fns'
import { format } from 'date-fns-tz'
import { UTCDate } from '@date-fns/utc'
import fs from 'node:fs/promises'
import path from 'node:path'

export default class GenData extends BaseCommand {
  static commandName = 'gen:data'
  static description = ''

  static options: CommandOptions = {}

  rand(min: number, max: number) {
    return Math.floor(Math.random() * (max - min) + min)
  }

  getIops(t: UTCDate, normalIops: any, peakIops: any) {
    const peakHours = [10, 15]
    if (peakHours.includes(t.getHours())) {
      return this.rand(peakIops[0], peakIops[1])
    }
    return this.rand(normalIops[0], normalIops[1])
  }

  async gen30d() {
    const since = subDays(new UTCDate(), 30)
    const totalSteps = 30 * 24 * 12
    const interval = 5
    const data: any = {
      indicators: {
        iops: {
          read: [],
          write: [],
        },
        throughput: {
          read: [],
          write: [],
        },
      },
      timestamp: [],
    }

    for (let i = 0; i < totalSteps; i++) {
      // Every 5 mins
      const t = addMinutes(since, i * interval)
      data.timestamp.push(Number(format(t, 't')))
      data.indicators.iops.read.push(this.getIops(t, [5000, 8000], [10000, 20000]))
      data.indicators.iops.write.push(this.getIops(t, [0, 1000], [3000, 5000]))
      data.indicators.throughput.read.push(this.getIops(t, [0, 1000], [100000, 200000]))
      data.indicators.throughput.write.push(this.getIops(t, [0, 1000], [100000, 200000]))
    }

    try {
      await fs.writeFile(
        path.resolve(process.cwd(), 'database', 'db-30d.json'),
        JSON.stringify(data)
      )
    } catch (err) {
      console.log(err)
    }
  }

  async gen7d() {
    const since = subDays(new UTCDate(), 10)
    const totalSteps = 7 * 24
    const interval = 1
    const data: any = {
      indicators: {
        iops: {
          read: [],
          write: [],
        },
        throughput: {
          read: [],
          write: [],
        },
      },
      timestamp: [],
    }

    for (let i = 0; i < totalSteps; i++) {
      const t = addHours(since, i * interval)
      data.timestamp.push(Number(format(t, 't')))
      data.indicators.iops.read.push(this.getIops(t, [5000, 8000], [10000, 20000]))
      data.indicators.iops.write.push(this.getIops(t, [0, 1000], [3000, 5000]))
      data.indicators.throughput.read.push(this.getIops(t, [1000, 1000000], [1000000, 2000000]))
      data.indicators.throughput.write.push(this.getIops(t, [1000, 1000000], [1000000, 2000000]))
    }

    try {
      await fs.writeFile(
        path.resolve(process.cwd(), 'database', 'db-7d.json'),
        JSON.stringify(data)
      )
    } catch (err) {
      console.log(err)
    }
  }

  async gen24h() {
    const since24H = subHours(new UTCDate(), 24)
    const totalMins = 24 * 60
    const data: any = {
      indicators: {
        iops: {
          read: [],
          write: [],
        },
        throughput: {
          read: [],
          write: [],
        },
      },
      timestamp: [],
    }

    for (let i = 0; i < totalMins; i++) {
      const t = addMinutes(since24H, i)
      data.timestamp.push(Number(format(t, 't')))
      data.indicators.iops.read.push(this.getIops(t, [5000, 8000], [10000, 20000]))
      data.indicators.iops.write.push(this.getIops(t, [0, 1000], [3000, 5000]))
      data.indicators.throughput.read.push(this.getIops(t, [0, 1000], [100000, 200000]))
      data.indicators.throughput.write.push(this.getIops(t, [0, 1000], [100000, 200000]))
    }

    try {
      await fs.writeFile(
        path.resolve(process.cwd(), 'database', 'db-24h.json'),
        JSON.stringify(data)
      )
    } catch (err) {
      console.log(err)
    }
  }

  async run() {
    await this.gen24h()
    await this.gen7d()
    await this.gen30d()
  }
}
