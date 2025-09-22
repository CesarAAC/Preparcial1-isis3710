"use client";
import React from "react";
import AuthorForm from "@/components/AuthorForm";

export default function NewAuthorPage() {
  return (
    <div style={{ maxWidth: 880, margin: "0 auto" }}>
      <AuthorForm redirectAfterSave="/authors" />
    </div>
  );
}