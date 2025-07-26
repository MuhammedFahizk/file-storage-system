"use client";

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { setAccessToken } from "../Redux/feathers/auth";
import { refreshAccessToken } from "../services/postApi";
import { fetchUserProfile } from "../Redux/feathers/userSlice";

export default function withAuth(WrappedComponent) {
  return function ProtectedComponent(props) {
    const { accessToken, isLoggedIn, userLoading } = useSelector(
      (state) => state.auth
    );
    const dispatch = useDispatch();
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const checkAuth = async () => {
        if (!isLoggedIn && accessToken) {
          try {
            const response = await refreshAccessToken();
            const newAccessToken = response.accessToken;
            dispatch(setAccessToken(newAccessToken));
            dispatch(fetchUserProfile());
            setLoading(false);
          } catch (error) {
            console.error("Failed to refresh access token:", error);
            router.replace("/login");
          }
        } else if (!isLoggedIn) {
          router.replace("/login");
        } else {
          dispatch(fetchUserProfile());
          setLoading(false);
        }
      };

      checkAuth();
    }, [isLoggedIn, accessToken, dispatch, router]);

    if (loading || userLoading) return <div>Loading...</div>;

    return <WrappedComponent {...props} />;
  };
}
