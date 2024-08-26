"use client"; // Error boundaries must be Client Components

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="grid min-h-screen place-content-center bg-charcoal">
      <h2 className="text-4xl font-bold text-white">{error.message}</h2>
    </div>
  );
}
