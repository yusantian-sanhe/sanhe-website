import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-green-900 text-white">
      <div className="mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center px-6 text-center">
        <p className="text-sm font-semibold uppercase tracking-widest text-green-100">
          404 Not Found
        </p>

        <h1 className="mt-6 text-5xl font-extrabold">
          This Page Does Not Exist
        </h1>

        <p className="mt-6 text-lg leading-8 text-green-100">
          The page you are looking for may have been moved, renamed or is no
          longer available.
        </p>

        <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
          <Link
            href="/en"
            className="rounded-full bg-white px-6 py-3 font-semibold text-green-800 hover:bg-green-50"
          >
            Back to Homepage
          </Link>

          <Link
            href="/en/products"
            className="rounded-full border border-green-200 px-6 py-3 font-semibold text-white hover:bg-green-800"
          >
            Browse Products
          </Link>
        </div>
      </div>
    </main>
  );
}