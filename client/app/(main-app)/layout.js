// app/(main-app)/layout.jsx
"use client"; // This layout uses client-side hooks (e.g., useSelector if you put auth logic here)

import React from "react";
import { Navbar } from "../components/Layout/Navbar"; // Adjust path relative to (main-app)
import { SideBar } from "../components/Layout/Sidebar"; // Adjust path relative to (main-app)
import { useSelector } from "react-redux"; // If you need profile data in layout

// You might put your authentication check directly here in the layout,
// or continue to use `withAuth` on individual pages.
// If you put it here, it will apply to all pages within (main-app).
// For simplicity, I'll keep it as a wrapper around children for now,
// but a full auth solution often uses middleware.js or a dedicated auth context.

export default function MainAppLayout({ children }) {
  // Example: You can still access Redux state here if needed
  // const profile = useSelector((state) => state.user.profile);
  // const loading = useSelector((state) => state.user.loading);
  // const error = useSelector((state) => state.user.error);

  // You could add a loading/error state for the layout if auth is handled here
  // if (loading) return <div>Loading app layout...</div>;
  // if (error) return <div>Error loading app layout: {error}</div>;

  return (
    <div className="flex bg-bg dark:text-white min-h-screen">
      <aside className="w-64  z-30">
        <SideBar />
      </aside>

      <div className="flex-1 bg-bg flex flex-col">
        <header>
          <Navbar />
        </header>

        <main className="flex-1 w-full h-[calc(100vh-64px)] overflow-y-auto p-6 bg-white dark:bg-neutral-900 rounded-xl shadow-inner">
          {children} {/* This is where the nested page content will render */}
        </main>
      </div>
    </div>
  );
}