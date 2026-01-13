import { I18nProvider } from "@/lib/i18n";

export default function StudentLayout({ children }) {
  return (
    <I18nProvider>
      {children}
    </I18nProvider>
  );
}