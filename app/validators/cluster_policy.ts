import vine from '@vinejs/vine'

/**
 * Validates the cluster policy's update action
 */
export const updateClusterPolicyValidator = vine.compile(
  vine.object({
    name: vine.string().trim().minLength(1),
    directory: vine.string().trim().minLength(1),
    scheduleType: vine.enum(['hourly', 'daily-weekly', 'monthly']),
    timezone: vine.string().trim().nullable(),
    scheduleTime: vine.string().trim().nullable(),
    scheduleDays: vine.array(vine.number()),
    snapshotRetentionPolicy: vine.string().trim().nullable(),
    snapshotRetentionDuration: vine.number().min(0),
    snapshotRetentionType: vine.enum(['day', 'week', 'month']), // day | week | month
    enableLockedSnapshot: vine.boolean(),
    enablePolicy: vine.boolean(),
  })
)
