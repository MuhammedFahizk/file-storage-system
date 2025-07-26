"use client";

import React, { useEffect, useState } from "react";
import { getProfile } from "./services/getApi";
import withAuth from "./Utils/withAuth";
import { Navbar } from "./components/Layout/Navbar";
import { SideBar } from "./components/Layout/Sidebar";
import useProfile from "./hooks/useProfile";
import { useSelector } from "react-redux";

const Home = () => {
  // const { profile, loading, error } = useProfile();
  const profile = useSelector((state) => state.user.profile);
  const loading = useSelector((state) => state.user.loading);
  const error = useSelector((state) => state.user.error);

  console.log(profile.username);
  
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    // <Card profile={profile} />
    <div className="flex bg-bg   dark:text-white ">
      <aside className="w-64  ">
        <SideBar />
      </aside>

      <div className="flex-1 bg-bg flex flex-col">
        <header className="  ">
          <Navbar />
        </header>

        <main className="flex-1 w-full h-[calc(100vh-64px)] overflow-y-auto p-6 bg-white dark:bg-neutral-900 rounded-xl shadow-inner">
          
        </main>
      </div>
    </div>
  );
};

export default withAuth(Home);
