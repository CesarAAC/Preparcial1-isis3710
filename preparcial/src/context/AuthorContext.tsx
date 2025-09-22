"use client";
import React, { createContext, useContext, useEffect, useState } from "react";

export type Author = {
  id: number;
  name: string;
  birthDate?: string;
  description?: string;
  image?: string;
  favorite:boolean
};

type AuthorsContextValue = {
  authors: Author[];
  addAuthor: (a: Omit<Author, "id">) => Author;
  updateAuthor: (id: number, patch: Partial<Author>) => Author | null;
  deleteAuthor: (id: number) => boolean;
  toggleFavorite: (id:number)=> void;
};

const AuthorsContext = createContext<AuthorsContextValue | undefined>(undefined);

const API_URL = "http://127.0.0.1:8080/api/authors";

export const AuthorsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [authors, setAuthors] = useState<Author[]>([]);

  useEffect(() => {
    let mounted = true;
    fetch(API_URL)
      .then((res) => {
        if (!res.ok) {
          console.warn("API no disponible, se mantiene lista vacía");
          return {
            id: 1,
    name: "ejemplo",
  birthDate: "12-01-2004",
  description: "description ejemplo",
  image: "ejemplo",
  favorite:true
          };
        }
        return res.json();
      })
      .then((data) => {
        if (!data || !mounted) return;
        const reduced = (Array.isArray(data) ? data : []).map((a: any) => ({
          id: Number(a.id),
          name: a.name ?? "",
          birthDate: a.birthDate ?? "",
          description: a.description ?? "",
          image: a.image ?? "",
          favorite: a.favorite,
        }));
        setAuthors(reduced);
      })
      .catch((err) => {
        console.warn("Error cargando autores (se ignora):", err);
      });

    return () => {
      mounted = false;
    };
  }, []);

  const nextId = (arr: Author[]) => (arr.length === 0 ? 0 : Math.max(...arr.map((x) => x.id)) + 1);

  const addAuthor = (a: Omit<Author, "id">): Author => {
    const newA: Author = { id: nextId(authors), ...a };
    setAuthors((prev) => [newA, ...prev]);
    return newA;
  };

  const updateAuthor = (id: number, patch: Partial<Author>): Author | null => {
    let updated: Author | null = null;
    setAuthors((prev) =>
      prev.map((it) => {
        if (it.id === id) {
          updated = { ...it, ...patch };
          return updated!;
        }
        return it;
      })
    );
    return updated;
  };

  const deleteAuthor = (id: number): boolean => {
    const exists = authors.some((a) => a.id === id);
    if (!exists) return false;
    setAuthors((prev) => prev.filter((a) => a.id !== id));
    return true;
  };

  const toggleFavorite = (id: number): Author | null => {
    let updated: Author | null = null;
    setAuthors((prev) =>
      prev.map((it) => {
        if (it.id === id) {
          updated = { ...it, favorite: !it.favorite };
          return updated;
        }
        return it;
      })
    );
    return updated;
  };

  return <AuthorsContext.Provider value={{ authors, addAuthor, updateAuthor, deleteAuthor, toggleFavorite }}>{children}</AuthorsContext.Provider>;
};

export const useAuthors = (): AuthorsContextValue => {
  const ctx = useContext(AuthorsContext);
  if (!ctx) throw new Error("useAuthors debe usarse dentro de AuthorsProvider");
  return ctx;
};