"use client";

import React, { useEffect, useState } from "react";
import { getProfile } from "../services/getApi";
import withAuth from "../Utils/withAuth";
import { Navbar } from "../components/Layout/Navbar";
import { SideBar } from "../components/Layout/Sidebar";
import useProfile from "../hooks/useProfile";
import { useSelector } from "react-redux";
import { CreateButton } from "../components/common/CreateButton";
import { FolderView } from "../components/Layout/FolderView";
import Div from "../components/common/Div";

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
   <Div>
    <CreateButton/>
    <FolderView/>
   </Div>
  );
};

export default withAuth(Home);
