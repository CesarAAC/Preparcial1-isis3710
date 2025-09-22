"use client";
import React, { useEffect, useState } from "react";
import { Author } from "@/context/AuthorContext";
import { useAuthors } from "@/context/AuthorContext";
import { useRouter } from "next/navigation";

type Props = {
  initial?: Author | null;
  redirectAfterSave?: string | null;
};

export default function AuthorForm({ initial = null, redirectAfterSave = null }: Props) {
  const { addAuthor, updateAuthor } = useAuthors();
  const router = useRouter();
  const [name, setName] = useState(initial?.name ?? "");
  const [birthDate, setBirthDate] = useState(initial?.birthDate ?? "");
  const [image, setImage] = useState(initial?.image ?? "");
  const [description, setDescription] = useState(initial?.description ?? "");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    setName(initial?.name ?? "");
    setBirthDate(initial?.birthDate ?? "");
    setImage(initial?.image ?? "");
    setDescription(initial?.description ?? "");
  }, [initial]);

  const isEdit = Boolean(initial && typeof initial.id === "number");

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!name.trim()) {
      alert("El nombre es obligatorio.");
      return;
    }
    setSubmitting(true);
    try {
      if (isEdit && initial) {
        updateAuthor(initial.id, {
          name: name.trim(),
          birthDate: birthDate || undefined,
          image: image || undefined,
          description: description || undefined,
        });
      } else {
        addAuthor({
          name: name.trim(),
          birthDate: birthDate || undefined,
          image: image || undefined,
          description: description || undefined,
        });
      }
      if (redirectAfterSave) router.push(redirectAfterSave);
    } catch (err) {
      console.error(err);
      alert("Error al guardar.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl bg-[#ffffff] border border-[#000000] rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">{isEdit ? "Editar autor" : "Crear autor"}</h3>
        <button type="button" onClick={() => router.back()} className="text-sm text-[#000000] hover:underline">
          Volver
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        <label className="flex flex-col">
          <span className="text-sm text-[#000000] mb-1">Nombre *</span>
          <input value={name} onChange={(e) => setName(e.target.value)} className="px-3 py-2 rounded-md bg-[#ffffff] text-[#000000] border-1 border-[#000000]" required />
        </label>

        <label className="flex flex-col">
          <span className="text-sm text-[#000000] mb-1">Fecha de nacimiento</span>
          <input type="date" value={birthDate ?? ""} onChange={(e) => setBirthDate(e.target.value)} className="px-3 py-2 rounded-md bg-[#ffffff] text-[#000000] border-1 border-[#000000]" />
        </label>

        <label className="flex flex-col">
          <span className="text-sm text-[#000000] mb-1">URL imagen</span>
          <input value={image ?? ""} onChange={(e) => setImage(e.target.value)} className="px-3 py-2 rounded-md bg-[#ffffff] text-[#000000] border-1 border-[#000000]" />
        </label>

        <label className="flex flex-col">
          <span className="text-sm text-[#000000] mb-1">Descripción</span>
          <textarea value={description ?? ""} onChange={(e) => setDescription(e.target.value)} className="px-3 py-2 rounded-md bg-[#ffffff] text-[#000000] min-h-[120px] border-1 border-[#000000]" />
        </label>
      </div>

      <div className="mt-4 flex gap-3">
        <button type="submit" disabled={submitting} className="px-4 py-2 rounded-md bg-[#000000] text-white font-semibold">
          {submitting ? (isEdit ? "Guardando..." : "Creando...") : isEdit ? "Guardar cambios" : "Crear autor"}
        </button>
        <button type="button" onClick={() => router.push("/authors")} className="px-4 py-2 rounded-md text-[#000000]">
          Cancelar
        </button>
      </div>
    </form>
  );
}
