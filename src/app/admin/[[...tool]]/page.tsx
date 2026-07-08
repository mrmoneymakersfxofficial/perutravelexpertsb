import { redirect } from "next/navigation";

export default function AdminCatchAll() {
  redirect("https://www.sanity.io/manage");
}
