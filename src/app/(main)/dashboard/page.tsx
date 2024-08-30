"use client";

import { UserHook } from "@/components/hooks/user-hook";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface MainPageProps {}

export default function MainPage(props: MainPageProps) {
  const { meQuery } = UserHook();
  const router = useRouter();

  useEffect(() => {
    return router.push("/store/rewe/storefront");
  }, []);

  return (
    <main>
      <div>id: {meQuery.data?.id}</div>
      <div>user: {meQuery.data?.username}</div>
      <Link className="bg-red-500" href="/logout">
        Logout
      </Link>
    </main>
  );
}
