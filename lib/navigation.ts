import { createNavigation } from "next-intl/navigation";
import { routing } from "@/lib/routing";

export { routing };
export const { Link, redirect, usePathname, useRouter } = createNavigation(routing);
