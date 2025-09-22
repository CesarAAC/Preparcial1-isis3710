"use client";
import React from "react";
import { useAuthors } from "@/context/AuthorContext";
import AuthorCard from "@/components/AuthordCard";
import { useRouter } from "next/navigation";

export default function AuthorsListPage() {
  const { authors, deleteAuthor } = useAuthors();
  const router = useRouter();

  const handleDelete = (id: number) => {
    const ok = confirm("¿Eliminar este autor?");
    if (!ok) return;
    deleteAuthor(id);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Autores</h1>
          <p className="text-sm text-slate-400">Gestiona la lista de autores</p>
        </div>

        <div>
          <button onClick={() => router.push("/Authors/new")} className="px-4 py-2 rounded-md bg-gradient-to-r from-violet-600 to-cyan-400 text-white font-semibold">
            Nuevo autor
          </button>
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-6">
        {authors.length === 0 ? (
          <div className="text-slate-400">No hay autores aún.</div>
        ) : (
          authors.map((a) => (
            <div key={a.id} className="flex-shrink-0">
              <AuthorCard author={a} onDelete={handleDelete} />
            </div>
          ))
        )}
      </div>
    </div>
  );
}
