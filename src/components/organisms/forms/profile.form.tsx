import { t } from '@lingui/core/macro'
import { Trans } from '@lingui/react/macro'
import { useForm, useStore } from '@tanstack/react-form'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button.tsx'
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field.tsx'
import { Input } from '@/components/ui/input.tsx'
import { Textarea } from '@/components/ui/textarea.tsx'
import { updateProfileSchema } from '@/packages/models/profile'
import { cn } from '@/packages/utils/styles.ts'
import { useProfile } from '@/services/profile'
import { useUpdateProfile } from '@/services/profile/update-profile'
import { useAuthStore } from '@/stores/auth'

export default function ProfileForm({
  className,
  ...props
}: React.ComponentProps<'form'>) {
  const { profile, loading: profileLoading } = useProfile()
  const { updateProfile, loading: updateLoading } = useUpdateProfile()
  const setProfile = useAuthStore((state) => state.setProfile)

  const form = useForm({
    defaultValues: {
      username: profile?.username || '',
      name: profile?.name || '',
      bio: profile?.bio || '',
      location: profile?.location || '',
      website_url: profile?.website_url || '',
      thumbnail_url: profile?.thumbnail_url || '',
      avatar_url: profile?.avatar_url || '',
      banner_url: profile?.banner_url || '',
    },
    validators: {
      onSubmit: updateProfileSchema.required(),
    },
    onSubmit: async ({ value }) => {
      try {
        // Transform form values to UpdateProfileDto (only send fields with values)
        // const dataToUpdate: Record<string, string | null | undefined> = {}
        // Object.entries(value).forEach(([key, val]) => {
        //   if (val && typeof val === 'string' && val.trim() !== '') {
        //     dataToUpdate[key] = val.trim()
        //   } else if (val === '') {
        //     dataToUpdate[key] = null
        //   }
        // })

        const updatedProfile = await updateProfile(value)
        setProfile(updatedProfile)
        toast.success(t`Profile updated successfully`)
      } catch (err) {
        console.error('Update profile error:', err)
      }
    },
  })

  const { isDirty, isDefaultValue } = useStore(form.store, (state) => state)
  const loading = profileLoading || updateLoading

  return (
    <form
      id="profile-form"
      onSubmit={(e) => {
        e.preventDefault()
        form.handleSubmit()
      }}
      className={cn('flex flex-col gap-6', className)}
      {...props}
    >
      <FieldGroup>
        <form.Field
          name="username"
          children={(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid
            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>
                  <Trans>Username</Trans>
                </FieldLabel>
                <FieldDescription>
                  <Trans>
                    Usernames can only contain letters, numbers, periods,
                    hyphens, and underscores.
                  </Trans>
                </FieldDescription>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  type="text"
                  aria-invalid={isInvalid}
                  placeholder={t`username`}
                  autoComplete="username"
                  disabled={loading}
                />
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            )
          }}
        />

        <form.Field
          name="name"
          children={(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid
            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>
                  <Trans>Name</Trans>
                </FieldLabel>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  type="text"
                  aria-invalid={isInvalid}
                  placeholder={t`Your full name`}
                  autoComplete="name"
                  disabled={loading}
                />
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            )
          }}
        />

        <form.Field
          name="bio"
          children={(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid
            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>
                  <Trans>Bio</Trans>
                </FieldLabel>
                <FieldDescription>
                  <Trans>Tell us about yourself (max 255 characters)</Trans>
                </FieldDescription>
                <Textarea
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  aria-invalid={isInvalid}
                  placeholder={t`Write a short bio...`}
                  rows={4}
                  disabled={loading}
                />
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            )
          }}
        />

        <form.Field
          name="location"
          children={(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid
            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>
                  <Trans>Location</Trans>
                </FieldLabel>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  type="text"
                  aria-invalid={isInvalid}
                  placeholder={t`City, Country`}
                  autoComplete="address-level2"
                  disabled={loading}
                />
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            )
          }}
        />

        <form.Field
          name="website_url"
          children={(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid
            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>
                  <Trans>Website</Trans>
                </FieldLabel>
                <FieldDescription>
                  <Trans>Your personal or professional website URL</Trans>
                </FieldDescription>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  type="url"
                  aria-invalid={isInvalid}
                  placeholder={t`https://example.com`}
                  autoComplete="url"
                  disabled={loading}
                />
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            )
          }}
        />

        <form.Field
          name="avatar_url"
          children={(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid
            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>
                  <Trans>Avatar URL</Trans>
                </FieldLabel>
                <FieldDescription>
                  <Trans>URL to your profile avatar image</Trans>
                </FieldDescription>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  type="url"
                  aria-invalid={isInvalid}
                  placeholder={t`https://example.com/avatar.jpg`}
                  disabled={loading}
                />
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            )
          }}
        />

        <form.Field
          name="thumbnail_url"
          children={(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid
            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>
                  <Trans>Thumbnail URL</Trans>
                </FieldLabel>
                <FieldDescription>
                  <Trans>URL to your profile thumbnail image</Trans>
                </FieldDescription>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  type="url"
                  aria-invalid={isInvalid}
                  placeholder={t`https://example.com/thumbnail.jpg`}
                  disabled={loading}
                />
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            )
          }}
        />

        <form.Field
          name="banner_url"
          children={(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid
            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>
                  <Trans>Banner URL</Trans>
                </FieldLabel>
                <FieldDescription>
                  <Trans>URL to your profile banner image</Trans>
                </FieldDescription>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  type="url"
                  aria-invalid={isInvalid}
                  placeholder={t`https://example.com/banner.jpg`}
                  disabled={loading}
                />
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            )
          }}
        />

        <Field>
          <Button
            type="submit"
            disabled={loading || !isDirty || isDefaultValue}
          >
            {updateLoading ? (
              <Trans>Saving...</Trans>
            ) : (
              <Trans>Save changes</Trans>
            )}
          </Button>
        </Field>
      </FieldGroup>
    </form>
  )
}
