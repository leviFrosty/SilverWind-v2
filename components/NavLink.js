import { useRouter } from "next/router";
import Link from "next/link";

export default function NavLink({ href, exact, children, ...props }) {
  const { pathname } = useRouter();
  const isActive = exact ? pathname === href : pathname.startsWith(href);

  if (isActive) {
    props.className += " font-semibold";
  }

  return (
    <Link href={href}>
      <a {...props}>{children}</a>
    </Link>
  );
}
