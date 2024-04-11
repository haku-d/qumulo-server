/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
const MetricsController = () => import('#controllers/metrics_controller')
const SnapshotPoliciesController = () => import('#controllers/snapshot_policies_controller')

router.get('/', async () => {
  return {
    hello: 'world',
  }
})

router.get('/:id/metrics', [MetricsController, 'index']).where('id', router.matchers.uuid())
router
  .get('/:id/snapshot_policy', [SnapshotPoliciesController, 'index'])
  .where('id', router.matchers.uuid())
router
  .put('/:id/snapshot_policy', [SnapshotPoliciesController, 'update'])
  .where('id', router.matchers.uuid())
