import tw, { styled } from "twin.macro";
import { useRouter } from "next/router";
import Link from "next/link";

type NavLinkProps = {
  active?: boolean;
};

const NavLink = styled(Link).withConfig({
  shouldForwardProp: (prop) => prop !== "active",
})<NavLinkProps>(({ active }) => [
  tw`inline-block relative mx-2 md:( my-0)`,
  !active ? tw`hover:border-b-2` : "",
  active ? tw`border-b-2` : "",
]);

export default function Navigation() {
  const router = useRouter();

  return (
    <nav tw="uppercase font-semibold text-sm">
      <NavLink href="/" active={router.pathname === "/" ? true : undefined}>
        Home
      </NavLink>
      <NavLink
        href="/files"
        active={router.pathname === "/files" ? true : undefined}
      >
        Files
      </NavLink>
    </nav>
  );
}
