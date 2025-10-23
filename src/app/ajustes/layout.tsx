import SettingsLayout from '@/components/SettingsLayout';

export default function AjustesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SettingsLayout>{children}</SettingsLayout>;
}
