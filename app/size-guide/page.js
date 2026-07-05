import { redirect } from "next/navigation";

// The dedicated size-guide page was retired — the size chart lives in the
// popup on every product page. Old links redirect to the shop.
export default function SizeGuidePage() {
  redirect("/shop");
}
