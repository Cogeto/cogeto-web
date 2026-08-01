import { notFound } from "next/navigation";

/**
 * With two root layouts (route groups), Next has no global not-found
 * boundary, so unknown URLs need an explicit catch-all that triggers the
 * branded 404 inside the English root layout.
 */
export default function CatchAllNotFound(): never {
  notFound();
}
