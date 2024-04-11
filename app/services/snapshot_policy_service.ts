import { inject } from '@adonisjs/core'
import fs from 'node:fs/promises'
import path from 'node:path'

type Cluster = {
  id: string
  snapshot_policy: any
}

@inject()
export default class SnapshotPolicyService {
  async findOne(id: string) {
    const file = path.resolve(process.cwd(), 'database', `cluster.json`)
    const data = await fs.readFile(file, 'utf-8')
    const jsonData: {
      clusters: Cluster[]
    } = JSON.parse(data)
    const cluster = jsonData.clusters.find((c) => id === c.id)
    return cluster?.snapshot_policy
  }
}
