// app/page.tsx

"use client";

import { NeynarAuthButton, useNeynarContext } from "@neynar/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
// import CastPublisher from "./components/CastPublisher";

export default function Home() {
  const { user } = useNeynarContext();
  const router = useRouter();

  // Redirect to /Feed if user is signed in
  useEffect(() => {
    if (user) {
      router.push("/Feed");
    }
  }, [user, router]);

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      {!user && <NeynarAuthButton />}
    </main>
  );
}
