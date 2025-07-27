"use client";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { signupUser } from "../services/postApi";
import { setAccessToken } from "../Redux/feathers/auth";
import { toast } from "react-toastify";

const Signup = () => {
  const dispatch = useDispatch();
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

  toast.success(
    <div>
      <strong>Signup Successful</strong>
      <div>Your account has been created successfully.</div>
    </div>
  );
} catch (error) {
  toast.error(
    <div>
      <strong>Signup Failed</strong>
      <div>{error?.message || "Something went wrong during signup."}</div>
    </div>
  );
}

  };

  return (
    <form
      onSubmit={handleSubmit(onFinish)}
      className="md:w-[400px] w-[300px] mx-auto space-y-4"
    >
      {/* Username */}
      <div>
        <label htmlFor="username" className="block mb-1 font-medium">
          Username
        </label>
        <Controller
          name="username"
          control={control}
          rules={{
            required: "Username is required",
            minLength: {
              value: 3,
              message: "Username must be at least 3 characters long",
            },
          }}
          render={({ field }) => (
            <input
              {...field}
              id="username"
              type="text"
              className={`w-full px-3 py-2 border ${
                errors.username ? "border-red-500" : "border-gray-300"
              } rounded`}
              placeholder="Enter your username"
            />
          )}
        />
        {errors.username && (
          <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>
        )}
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="block mb-1 font-medium">
          Email
        </label>
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
            <input
              {...field}
              id="email"
              type="email"
              className={`w-full px-3 py-2 border ${
                errors.email ? "border-red-500" : "border-gray-300"
              } rounded`}
              placeholder="Enter your email"
            />
          )}
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
        )}
      </div>

      {/* Password */}
      <div>
        <label htmlFor="password" className="block mb-1 font-medium">
          Password
        </label>
        <Controller
          name="password"
          control={control}
          rules={{
            required: "Password is required",
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters long",
            },
          }}
          render={({ field }) => (
            <input
              {...field}
              id="password"
              type="password"
              className={`w-full px-3 py-2 border ${
                errors.password ? "border-red-500" : "border-gray-300"
              } rounded`}
              placeholder="Enter your password"
            />
          )}
        />
        {errors.password && (
          <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
        )}
      </div>

      {/* Confirm Password */}
      <div>
        <label htmlFor="confirmPassword" className="block mb-1 font-medium">
          Confirm Password
        </label>
        <Controller
          name="confirmPassword"
          control={control}
          rules={{
            required: "Please confirm your password",
            validate: (value) =>
              value === getValues("password") || "Passwords do not match",
          }}
          render={({ field }) => (
            <input
              {...field}
              id="confirmPassword"
              type="password"
              className={`w-full px-3 py-2 border ${
                errors.confirmPassword ? "border-red-500" : "border-gray-300"
              } rounded`}
              placeholder="Confirm your password"
            />
          )}
        />
        {errors.confirmPassword && (
          <p className="text-red-500 text-sm mt-1">
            {errors.confirmPassword.message}
          </p>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
      >
        Sign Up
      </button>
    </form>
  );
};

export default Signup;
