"use client";
import React from "react";
import { useAuthors } from "@/context/AuthorContext";
import AuthorCard from "@/components/AuthordCard";
import { useRouter } from "next/navigation";

export default function FavoriteAuthorsListPage() {
  const { authors, deleteAuthor } = useAuthors();
  const router = useRouter();
  const favoriteAuthors = authors.filter((a) => a.favorite);

  const handleDelete = (id: number) => {
    const ok = confirm("¿Eliminar este autor?");
    if (!ok) return;
    deleteAuthor(id);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Autores favoritos</h1>
        </div>

        <div>
          <button
            onClick={() => router.push("/authors/new")}
            className="px-3 py-2 rounded-md bg-[#000000] text-white font-semibold shadow-sm hover:opacity-95"
          >
            Nuevo autor
          </button>
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-6">
        {favoriteAuthors.length === 0 ? (
          <div className="text-[#000000]">No hay autores favoritos.</div>
        ) : (
          favoriteAuthors.map((a) => (
            <div key={a.id} className="flex-shrink-0">
              <AuthorCard author={a} onDelete={handleDelete} />
            </div>
          ))
        )}
      </div>
    </div>
  );
}
