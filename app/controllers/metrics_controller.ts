import type { HttpContext } from '@adonisjs/core/http'
import { inject } from '@adonisjs/core'
import MetricService from '#services/metric_service'

@inject()
export default class MetricsController {
  constructor(protected metricService: MetricService) {}

  async index({ request }: HttpContext) {
    const { period } = request.qs()
    return this.metricService.all(period)
  }
}
