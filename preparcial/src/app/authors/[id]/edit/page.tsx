"use client";
import React from "react";
import { useParams } from "next/navigation";
import { useAuthors } from "@/context/AuthorContext";
import AuthorForm from "@/components/AuthorForm";

export default function EditAuthorPage() {
  const params = useParams();
  const id = params?.id ? Number(params.id) : NaN;
  const { authors } = useAuthors();
  const author = authors.find((a) => a.id === id) ?? null;

  if (Number.isNaN(id)) return <div style={{ color: "#ef4444" }}>ID inválido</div>;
  if (!author) return <div style={{ color: "var(--muted)" }}>Autor no encontrado.</div>;

  return (
    <div style={{ maxWidth: 880, margin: "0 auto" }}>
      <AuthorForm initial={author} redirectAfterSave="/authors" />
    </div>
  );
}
