import { Trans } from '@lingui/react/macro'

import { H4 } from '@/components/atoms/heading.tsx'
import ProfileForm from '@/components/organisms/forms/profile.form.tsx'

export default function ProfileTemplate() {
  return (
    <div className="flex flex-col gap-6 w-full">
      <div>
        <H4>
          <Trans>Profile</Trans>
        </H4>
        <p className="leading-relaxed opacity-75">
          <Trans>Update your profile details.</Trans>
        </p>
      </div>
      <div className="flex flex-col gap-6 lg:max-w-xl">
        <ProfileForm />
      </div>
    </div>
  )
}
