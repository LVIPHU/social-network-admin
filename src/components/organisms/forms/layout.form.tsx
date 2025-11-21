import { t } from "@lingui/core/macro";
import { useEffect } from "react";
import { z } from "zod";
import { Trans } from '@lingui/react/macro'
import { useForm } from '@tanstack/react-form'
import { useTheme } from '@/providers/theme.provider.tsx'
import { useProfile } from '@/services/profile'
import { Button } from '@/components/ui/button.tsx'
import { cn } from '@/packages/utils/styles.ts'
import { H2 } from '@/components/atoms/heading.tsx'

const formSchema = z.object({
  theme: z.enum(["system", "light", "dark"]).default("system"),
  locale: z.string().default("en"),
});

type FormValues = z.infer<typeof formSchema>;

export const LayoutSettings = () => {
  const { profile } = useProfile();
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    profile && onReset();
  }, [profile]);

  const onReset = () => {
    if (!profile) return;

    form.reset({ theme, locale: profile.locale });
  };

  const onSubmit = async (data: FormValues) => {
    if (!profile) return;

    setTheme(data.theme);

    if (profile.locale !== data.locale) {
      window.localStorage.setItem("locale", data.locale);
      window.location.reload();
    }

    form.reset(data);
  };

  const form = useForm({
    defaultValues: { theme: theme as ['theme'], locale: profile?.locale as FormValues['locale'] },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: ({ value }) => {
      if (!profile) return;

      setTheme(value.theme);

      if (profile.locale !== value.locale) {
        window.localStorage.setItem("locale", value.locale);
        window.location.reload();
      }
    }
  });

  return (
    <div className="space-y-6">
      <div>
        <H2>
          <Trans>Profile</Trans>
        </H2>
        <p className="leading-relaxed opacity-75">
          <Trans>Here, you can update your profile to customize and personalize your experience.</Trans>
        </p>
      </div>

      <Form {...form}>
        <form className="grid gap-6 sm:grid-cols-2" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            name="theme"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t`Theme`}</FormLabel>
                <div className="w-full">
                  <Combobox
                    {...field}
                    value={field.value}
                    options={[
                      { label: t`System`, value: "system" },
                      { label: t`Light`, value: "light" },
                      { label: t`Dark`, value: "dark" },
                    ]}
                    onValueChange={field.onChange}
                  />
                </div>
              </FormItem>
            )}
          />

          <FormField
            name="locale"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t`Language`}</FormLabel>
                <div className="w-full">
                  <LocaleComboboxPopover value={field.value} onValueChange={field.onChange} />
                </div>
                <FormDescription>
                  <span>
                    <Trans>
                      Don't see your language?{" "}
                      <a
                        target="_blank"
                        rel="noopener noreferrer nofollow"
                        href="https://translate.rxresu.me/"
                        className="font-medium underline underline-offset-2"
                      >
                        Help translate the app.
                      </a>
                    </Trans>
                  </span>
                </FormDescription>
              </FormItem>
            )}
          />

          <div
            className={cn(
              "hidden items-center space-x-2 self-center sm:col-start-2",
              form.formState.isDirty && "flex animate-in fade-in",
            )}
          >
            <Button type="submit" disabled={loading}>
              <Trans>Save Changes</Trans>
            </Button>
            <Button type="reset" variant="ghost" onClick={onReset}>
              <Trans>Discard</Trans>
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};