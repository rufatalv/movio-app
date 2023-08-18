import Link from "next/link";

export default function Logo() {
  return (
    <h1 className="text-4xl font-medium">
      <Link href={"/"}>movio.</Link>
    </h1>
  );
}
