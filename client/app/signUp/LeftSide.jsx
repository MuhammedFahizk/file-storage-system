"use client";

import React from "react";
import { Controller, useForm } from "react-hook-form";
import { Button, Input, notification, Form } from "antd";
import { MdAlternateEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { FiUser } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { setAccessToken } from "../Redux/feathers/auth";
import { signupUser } from "../services/postApi";

const Signup = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();

  const onFinish = async (data) => {
    try {
      const response = await signupUser(data);
      const { accessToken } = response;

      dispatch(setAccessToken(accessToken));
      notification.success({
        message: "Signup successful!",
        description: response.message,
      });

      router.push("/home");
    } catch (error) {
      notification.error({
        message: "Signup failed",
        description: error.message,
      });
    }
  };

  return (
    <Form
      className="md:w-[400px] w-[300px] mx-auto"
      style={{ maxWidth: 600 }}
      onFinish={handleSubmit(onFinish)}
    >
      <Form.Item
        name="username"
        validateStatus={errors.username ? "error" : ""}
        help={errors.username?.message}
      >
        <Controller
          control={control}
          name="username"
          rules={{
            required: "Username is required",
            minLength: {
              value: 3,
              message: "Username must be at least 3 characters long",
            },
          }}
          render={({ field }) => (
            <Input
              {...field}
              prefix={<FiUser />}
              placeholder="Username"
              size="large"
              className="mb-4"
            />
          )}
        />
      </Form.Item>

      <Form.Item
        name="email"
        validateStatus={errors.email ? "error" : ""}
        help={errors.email?.message}
      >
        <Controller
          control={control}
          name="email"
          rules={{
            required: "Email is required",
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: "Invalid email address",
            },
          }}
          render={({ field }) => (
            <Input
              {...field}
              prefix={<MdAlternateEmail />}
              placeholder="Email"
              size="large"
              className="mb-4"
            />
          )}
        />
      </Form.Item>

      <Form.Item
        name="password"
        validateStatus={errors.password ? "error" : ""}
        help={errors.password?.message}
      >
        <Controller
          control={control}
          name="password"
          rules={{
            required: "Password is required",
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters long",
            },
          }}
          render={({ field }) => (
            <Input.Password
              {...field}
              prefix={<RiLockPasswordLine />}
              placeholder="Password"
              size="large"
              className="mb-4"
              visibilityToggle
            />
          )}
        />
      </Form.Item>

      <Form.Item
        name="confirmPassword"
        validateStatus={errors.confirmPassword ? "error" : ""}
        help={errors.confirmPassword?.message}
      >
        <Controller
          control={control}
          name="confirmPassword"
          rules={{
            required: "Please confirm your password",
            validate: (value) =>
              value === getValues("password") || "Passwords do not match",
          }}
          render={({ field }) => (
            <Input.Password
              {...field}
              prefix={<RiLockPasswordLine />}
              placeholder="Confirm Password"
              size="large"
              className="mb-4"
              visibilityToggle
            />
          )}
        />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" size="large" block>
          Sign Up
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Signup;
