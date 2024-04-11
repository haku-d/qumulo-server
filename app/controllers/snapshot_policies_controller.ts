import type { HttpContext } from '@adonisjs/core/http'
import { inject } from '@adonisjs/core'

import { updateClusterPolicyValidator } from '#validators/cluster_policy'
import SnapshotPolicyService from '#services/snapshot_policy_service'

@inject()
export default class SnapshotPoliciesController {
  constructor(protected snapshotPolicyService: SnapshotPolicyService) {}

  async index({ request, response }: HttpContext) {
    const clusterId = request.param('id')
    const policy = await this.snapshotPolicyService.findOne(clusterId)
    if (!policy) return response.status(404)
    return policy
  }
  async update({ request, response }: HttpContext) {
    const clusterId = request.param('id')
    const policy = await this.snapshotPolicyService.findOne(clusterId)
    if (!policy) return response.status(404)
    const payload = await request.validateUsing(updateClusterPolicyValidator)
    return payload
  }
}
