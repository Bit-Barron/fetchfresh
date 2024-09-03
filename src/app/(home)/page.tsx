"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    router.push("/store/rewe/storefront");
  }, []);

  return <div className="min-h-screen bg-gray-50"></div>;
}
