"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Immediately redirect to month-view when the app opens
    router.push("/month-view");
  }, [router]);

  return null; // Render nothing while redirecting
}