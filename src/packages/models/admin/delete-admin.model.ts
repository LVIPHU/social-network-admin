import { z } from 'zod'

import { adminSchema } from '@/packages/models/admin/admin.model'

export const deleteAdminSchema = z.array(adminSchema.pick({ id: true }))

export type DeleteAdminDto = z.infer<typeof deleteAdminSchema>
