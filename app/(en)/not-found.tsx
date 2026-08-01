import { defaultLocale } from "@/lib/i18n";
import { getCommon } from "@/lib/content-loader";
import NotFoundMain from "@/components/pages/NotFoundMain";

export default function NotFound() {
  return <NotFoundMain content={getCommon(defaultLocale).notFound} />;
}
