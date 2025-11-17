import { Trans } from '@lingui/react/macro'
import { useForm } from '@tanstack/react-form'
import { t } from '@lingui/core/macro'
import { useState } from 'react'
import { EyeIcon, EyeOffIcon } from 'lucide-react'
import { Link } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { cn } from '@/packages/utils/styles'
import { signInSchema } from '@/packages/models'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from '@/components/ui/input-group'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { useSignIn } from '@/services/auth/sign-in'

export default function SignInForm({
  className,
  ...props
}: React.ComponentProps<'form'>) {
  const [showPassword, setShowPassword] = useState(false)
  const { signIn, loading } = useSignIn()

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const form = useForm({
    defaultValues: {
      identifier: '',
      password: '',
    },
    validators: {
      onSubmit: signInSchema,
    },
    onSubmit: async ({ value }) => {
      try {
        await signIn(value)
      } catch (err) {
        // Error is handled by axios interceptor
        console.error('Login error:', err)
      }
    },
  })

  return (
    <form
      id="sign-in-form"
      onSubmit={(e) => {
        e.preventDefault()
        form.handleSubmit()
      }}
      className={cn('flex flex-col gap-6', className)}
      {...props}
    >
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">
            <Trans>Sign in to your account</Trans>
          </h1>
          <p className="text-muted-foreground text-sm text-balance">
            <Trans>Enter your username below to sign in to your account</Trans>
          </p>
        </div>
        <form.Field
          name="identifier"
          children={(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid
            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>
                  <Trans>Username</Trans>
                </FieldLabel>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  type="text"
                  aria-invalid={isInvalid}
                  placeholder={t`m@example.com`}
                  autoComplete="off"
                />
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            )
          }}
        />
        <form.Field
          name="password"
          children={(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid
            return (
              <Field data-invalid={isInvalid}>
                <div className="flex items-center">
                  <FieldLabel htmlFor={field.name}>
                    <Trans>Password</Trans>
                  </FieldLabel>
                  <a
                    href="#"
                    className="ml-auto text-sm underline-offset-4 hover:underline"
                  >
                    <Trans>Forgot your password?</Trans>
                  </a>
                </div>
                <InputGroup>
                  <InputGroupInput
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    type={showPassword ? 'text' : 'password'}
                    placeholder={t`Enter password`}
                    aria-invalid={isInvalid}
                    autoComplete="off"
                  />
                  <InputGroupAddon align="inline-end">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <InputGroupButton
                          variant="ghost"
                          aria-label="Info"
                          size="icon-xs"
                          onClick={togglePasswordVisibility}
                        >
                          {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                        </InputGroupButton>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>
                          {showPassword ? (
                            <Trans>Hide password</Trans>
                          ) : (
                            <Trans>Show password</Trans>
                          )}
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </InputGroupAddon>
                </InputGroup>
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            )
          }}
        />
        <Field>
          <Button type="submit" disabled={loading}>
            {loading ? <Trans>Signing in...</Trans> : <Trans>Sign in</Trans>}
          </Button>
        </Field>
        <Field>
          <FieldDescription className="text-center">
            <Trans>Don't have an account?</Trans>{' '}
            <Link to="/auth/sign-up" className="underline underline-offset-4">
              <Trans>Sign up</Trans>
            </Link>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  )
}
