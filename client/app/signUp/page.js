"use client";

import React from "react";
import Link from "next/link";

import Top from "../Login/Top";
import Signup from "./SignUpForm";
import Div from "../components/common/Div";
import Text from "../components/common/Text";
import withPublic from "../Utils/withPublic";

const LeftSide = () => {
  return (
    <Div className="md:px-5 mt-0 px-8 h-fit">
      <Top>
        already member{" "}
        <Link
          href="/login"
          className="text-sm text-blue-500 hover:underline hover:scale-125 cursor-pointer"
        >
          Login
        </Link>
      </Top>

      <Div className="md:mx-24 py-4 flex flex-col justify-end items-center">
        <Text className="md:px-10 text-4xl primary" tag="h1">
          Sign Up
        </Text>
        <Text tag={"p"} className="md:px-10">
          Create an account to get started
        </Text>
      </Div>

      <Div className="md:px-10 flex flex-col justify-center items-center">
        <Signup />
      </Div>
    </Div>
  );
};

export default withPublic(LeftSide);
