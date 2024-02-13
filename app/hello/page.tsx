import Link from 'next/link';

export default async function Hello() {
  return (
    <div className="sticky top-8">
      <Link href="/">Hello</Link>
    </div>
  );
}
