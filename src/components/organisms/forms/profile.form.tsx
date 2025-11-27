import { t } from '@lingui/core/macro'
import { Trans } from '@lingui/react/macro'
import { useState } from 'react'
import { toast } from 'sonner'

import { FormComposition } from '@/components/molecules/form-composition'
import type { FormFieldConfig } from '@/components/molecules/form-composition'
import { Button } from '@/components/ui/button.tsx'
import { Field } from '@/components/ui/field.tsx'
import { updateProfileSchema } from '@/packages/models/profile'
import type { UpdateProfileDto } from '@/packages/models/profile'
import { cn } from '@/packages/utils/styles.ts'
import { useProfile } from '@/services/profile'
import { useUpdateProfile } from '@/services/profile/update-profile'
import { useAuthStore } from '@/stores/auth'

export default function ProfileForm({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  const { profile, loading: profileLoading } = useProfile()
  const { updateProfile, loading: updateLoading } = useUpdateProfile()
  const setProfile = useAuthStore((state) => state.setProfile)
  const [formState, setFormState] = useState<{
    isDirty: boolean
    isDefaultValue: boolean
  }>({
    isDirty: false,
    isDefaultValue: true,
  })

  type ProfileFormValues = Omit<
    UpdateProfileDto,
    'avatar_url' | 'thumbnail_url' | 'banner_url'
  > & {
    avatar_url?: string | File | null
    thumbnail_url?: string | File | null
    banner_url?: string | File | null
  }

  const defaultValues: ProfileFormValues = {
    username: profile?.username || '',
    name: profile?.name || '',
    bio: profile?.bio || '',
    location: profile?.location || '',
    website_url: profile?.website_url || '',
    thumbnail_url: profile?.thumbnail_url || undefined,
    avatar_url: profile?.avatar_url || undefined,
    banner_url: profile?.banner_url || undefined,
  }

  const fields: Array<FormFieldConfig> = [
    {
      type: 'input',
      name: 'username',
      label: t`Username`,
      inputType: 'text',
      placeholder: t`username`,
      autoComplete: 'username',
      description: t`Usernames can only contain letters, numbers, periods, hyphens, and underscores.`,
    },
    {
      type: 'input',
      name: 'name',
      label: t`Name`,
      inputType: 'text',
      placeholder: t`Your full name`,
      autoComplete: 'name',
    },
    {
      type: 'textarea',
      name: 'bio',
      label: t`Bio`,
      placeholder: t`Write a short bio...`,
      rows: 4,
      description: t`Tell us about yourself (max 255 characters)`,
    },
    {
      type: 'input',
      name: 'location',
      label: t`Location`,
      inputType: 'text',
      placeholder: t`City, Country`,
      autoComplete: 'address-level2',
    },
    {
      type: 'input',
      name: 'website_url',
      label: t`Website`,
      inputType: 'url',
      placeholder: t`https://example.com`,
      autoComplete: 'url',
      description: t`Your personal or professional website URL`,
    },
    {
      type: 'image-upload',
      name: 'avatar_url',
      label: t`Avatar`,
      aspectRatio: 'square',
      description: t`Upload your profile avatar image`,
      maxSize: 5 * 1024 * 1024, // 5MB
    },
    {
      type: 'image-upload',
      name: 'thumbnail_url',
      label: t`Thumbnail`,
      aspectRatio: 'square',
      description: t`Upload your profile thumbnail image`,
      maxSize: 5 * 1024 * 1024, // 5MB
    },
    {
      type: 'image-upload',
      name: 'banner_url',
      label: t`Banner`,
      aspectRatio: 'video',
      description: t`Upload your profile banner image`,
      maxSize: 10 * 1024 * 1024, // 10MB
    },
  ]

  const handleSubmit = async (values: ProfileFormValues) => {
    try {
      // Convert File objects to string URLs for API
      // Note: In a real app, you would upload files first and get URLs from the server
      const dataToSubmit: UpdateProfileDto = {
        username: values.username,
        name: values.name,
        bio: values.bio,
        location: values.location,
        website_url: values.website_url,
        avatar_url:
          values.avatar_url instanceof File
            ? URL.createObjectURL(values.avatar_url) // Temporary blob URL - should upload to server first
            : values.avatar_url || undefined,
        thumbnail_url:
          values.thumbnail_url instanceof File
            ? URL.createObjectURL(values.thumbnail_url)
            : values.thumbnail_url || undefined,
        banner_url:
          values.banner_url instanceof File
            ? URL.createObjectURL(values.banner_url)
            : values.banner_url || undefined,
      }

      const updatedProfile = await updateProfile(dataToSubmit)
      setProfile(updatedProfile)
      toast.success(t`Profile updated successfully`)
    } catch (err) {
      console.error('Update profile error:', err)
    }
  }

  const loading = profileLoading || updateLoading

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <FormComposition
        fields={fields}
        defaultValues={defaultValues}
        onSubmit={handleSubmit}
        schema={updateProfileSchema}
        loading={loading}
        formId="profile-form"
        showButtons={false}
        onFormStateChange={(state) => {
          setFormState({
            isDirty: state.isDirty,
            isDefaultValue: state.isDefaultValue,
          })
        }}
      />

      <Field>
        <Button
          type="submit"
          form="profile-form"
          disabled={loading || !formState.isDirty || formState.isDefaultValue}
        >
          {updateLoading ? (
            <Trans>Saving...</Trans>
          ) : (
            <Trans>Save changes</Trans>
          )}
        </Button>
      </Field>
    </div>
  )
}
