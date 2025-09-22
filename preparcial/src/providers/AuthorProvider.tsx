"use client";
import React from "react";
import { AuthorsProvider } from "@/context/AuthorContext";

export default function AuthorProvider({ children }: { children: React.ReactNode }) {
  return <AuthorsProvider>{children}</AuthorsProvider>;
}
