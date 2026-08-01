import { defaultLocale } from "@/lib/i18n";
import { getCommon } from "@/lib/content-loader";
import NotFoundMain from "@/components/pages/NotFoundMain";

// Not-found boundaries receive no params, so this renders the English
// 404 body inside the locale layout. It exists so an unknown path under
// the dynamic segment still meets the branded page, never a raw 404.
export default function LocaleNotFound() {
  return <NotFoundMain content={getCommon(defaultLocale).notFound} />;
}
