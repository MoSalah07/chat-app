"use client";
import React from "react";
import EmptyState from "../components/EmptyState";

export default function UserPage() {
  return (
    <div className={`hidden lg:block lg:pl-80 h-screen`}>
      <EmptyState />
    </div>
  );
}
