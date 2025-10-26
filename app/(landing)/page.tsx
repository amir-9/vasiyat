import { useTranslations } from "next-intl";

export default function HomePage() {
  const t = useTranslations("landing");
  return (
    <div className="container pt-10">
      <h1>{t("heroTitle")}</h1>
    </div>
  );
}
