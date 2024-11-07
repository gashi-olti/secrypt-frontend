import tw, { styled } from "twin.macro";
import { useRouter } from "next/router";
import Link from "next/link";

type NavLinkProps = {
  active?: boolean;
};

const NavLink = styled(Link)<NavLinkProps>(({ active }) => [
  tw`inline-block relative md:(mx-2 my-0)`,
  !active && tw`hover:border-b-2`,
  active && tw`border-b-2`,
]);

export default function Navigation() {
  const router = useRouter();

  return (
    <nav tw="uppercase font-semibold text-sm">
      <NavLink href="/" active={router.pathname === "/"}>
        Home
      </NavLink>
      <NavLink href="/files" active={router.pathname === "/files"}>
        Files
      </NavLink>
    </nav>
  );
}
