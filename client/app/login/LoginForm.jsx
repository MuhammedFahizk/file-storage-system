"use client";

import { useDispatch } from 'react-redux';
import { Controller, useForm } from "react-hook-form";
import { Button, Input, notification, Form } from "antd";
import { MdAlternateEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";

import { loginUser } from '../services/postApi';
import { useRouter } from 'next/navigation';
import { setAccessToken } from '../Redux/feathers/auth';

const LoginForm = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onFinish = async (data) => {
    try {
      const response = await loginUser(data);
      const { accessToken } = response.data;

      dispatch(setAccessToken(accessToken));

      notification.success({
        message: "Login Successful",
        description: "You have logged in successfully.",
      });

      router.push('/');
    } catch (error) {
      notification.error({
        message: "Login Failed",
        description: error?.response?.data?.message || "Something went wrong.",
      });
    }
  };

  return (
    <Form
      className="max-w-[400px] w-full mx-auto"
      layout="vertical"
      onFinish={handleSubmit(onFinish)}
    >
      <Form.Item
        label="Email"
        validateStatus={errors.email ? "error" : ""}
        help={errors.email?.message}
      >
        <Controller
          name="email"
          control={control}
          rules={{
            required: "Email is required",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Invalid email address",
            },
          }}
          render={({ field }) => (
            <Input
              {...field}
              placeholder="Enter your email"
              prefix={<MdAlternateEmail />}
              size="large"
            />
          )}
        />
      </Form.Item>

      <Form.Item
        label="Password"
        validateStatus={errors.password ? "error" : ""}
        help={errors.password?.message}
      >
        <Controller
          name="password"
          control={control}
          rules={{
            required: "Password is required",
            minLength: {
              value: 8,
              message: "Minimum 8 characters required",
            },
          }}
          render={({ field }) => (
            <Input.Password
              {...field}
              placeholder="Enter your password"
              prefix={<RiLockPasswordLine />}
              size="large"
            />
          )}
        />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" size="large" block>
          Login
        </Button>
      </Form.Item>
    </Form>
  );
};

export default LoginForm;
