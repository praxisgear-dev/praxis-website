import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-2xl px-5 pt-24 text-center">
      <h1 className="font-serif text-4xl">Wrong turn.</h1>
      <p className="text-sm text-muted mt-4">
        This page doesn't exist — happens on new routes sometimes.
      </p>
      <Link href="/" className="btn-outline mt-8">
        Back home
      </Link>
    </div>
  );
}
