"use client";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Author } from "@/context/AuthorContext";

type Props = {
  author: Author;
  onDelete?: (id: number) => void;
  onEdit?: (id: number) => void;
};

export default function AuthorCard({ author, onDelete, onEdit }: Props) {
  const router = useRouter();
  const handleEdit = () => {
    if (onEdit) return onEdit(author.id);
    router.push(`/authors/${author.id}/edit`);
  };

  return (
    <article className="w-[320px] flex flex-col rounded-xl overflow-hidden border border-[#000000] bg-[#000000] shadow-sm">
      <div className="relative w-full h-44 bg-[#000000]">
        {author.image ? (
          <Image
            src={author.image}
            alt={author.name}
            fill
            sizes="320px"
            style={{ objectFit: "contain", objectPosition: "center" }}
            className="block"
            priority={false}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-violet-600 to-cyan-400 text-white font-bold text-2xl">
            {author.name.split(" ").map(p => p[0]).slice(0,2).join("")}
          </div>
        )}
      </div>

      <div className="p-4 flex flex-col gap-3">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="text-lg font-semibold text-slate-100 truncate">{author.name}</h3>
            {author.birthDate && <div className="text-sm text-slate-400 mt-1">{author.birthDate}</div>}
          </div>

          <div className="flex flex-col gap-2">
            <button
              onClick={handleEdit}
              className="px-3 py-1 rounded-md bg-slate-800/50 text-slate-100 text-sm hover:bg-slate-700"
              aria-label="Editar"
            >
              Editar
            </button>
            <button
              onClick={() => onDelete?.(author.id)}
              className="px-3 py-1 rounded-md bg-red-600 text-white text-sm hover:brightness-95"
              aria-label="Eliminar"
            >
              Eliminar
            </button>
          </div>
        </div>

        <p className="text-slate-300 text-sm leading-5 max-h-28 overflow-auto">
          {author.description ?? "— Sin descripción —"}
        </p>

        <div className="mt-auto flex items-center justify-between">
          <span className="text-xs text-violet-300 bg-violet-900/10 px-2 py-1 rounded-full">Autor</span>
          <span className="text-xs text-slate-500">ID {author.id}</span>
        </div>
      </div>
    </article>
  );
}
