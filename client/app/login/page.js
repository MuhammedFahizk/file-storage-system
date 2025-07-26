"use client";
import Text from "../components/common/Text";
import Div from "../components/common/Div";
import Top from "./Top";
import Link from "next/link";
import LoginForm from "./LoginForm";
import withPublic from "../Utils/withPublic";
import { useSelector } from "react-redux";

const Login = () => {
  const { isLoggedIn } = useSelector((state) => state.auth);
  console.log(isLoggedIn);

  return (
    <Div className={"md:p-5 px-7  mt-0  h-fit"}>
      <Top className="">
        new member
        <Link
          href="/signUp"
          className="text-sm text-blue-500 hover:underline hover:scale-125 cursor-pointer"
        >
          Sign Up
        </Link>
      </Top>
      <Div
        className={" md:mx-24  flex flex-col justify-end items-center  py-10"}
      >
        <Text className={"md:px-10 px-2 text-4xl primary"} tag={"h1"}>
          Login
        </Text>
        <Text className={"md:px-10 px-2"}>Welcome to our community</Text>
      </Div>
      <Div className={"md:px-10 flex flex-col justify-center items-center"}>
        <LoginForm />
      </Div>
    </Div>
  );
};

export default withPublic(Login);
