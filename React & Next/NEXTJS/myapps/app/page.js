import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h1> Next Js webpage</h1>
      <Link href="/about">About Us</Link>
    </div>
  );
}
