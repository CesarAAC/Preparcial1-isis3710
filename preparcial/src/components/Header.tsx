"use client";
import React from "react";
import { useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter();
  return (
    <header className="w-full border-b bg-[#ffffff]">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between max-w-6xl">
        <div className="flex items-center gap-3">
          <div>
            <div className="text-lg font-semibold">Bookstore</div>
            <div className="text-xs text-[#000000]">Autores · Preparcial</div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => router.push("/authors")}
            className="px-3 py-2 rounded-md border border-[#000000] text-[#000000]"
          >
            Ver autores
          </button>

          <button
            onClick={() => router.push("/authors/new")}
            className="px-3 py-2 rounded-md bg-[#000000] text-white font-semibold shadow-sm hover:opacity-95"
          >
            Nuevo autor
          </button>
        </div>
      </div>
    </header>
  );
}
