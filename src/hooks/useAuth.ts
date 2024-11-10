"use client";

import { onAuthStateChanged } from "firebase/auth";
import useAuthStore from "./useAuthStore";
import { useEffect } from "react";
import { auth } from "@/lib/firebaseConfig";
import { redirect } from "next/navigation";

const useAuth = () => {
  const { user, token, loading, setUser, setToken, setLoading } =
    useAuthStore();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setLoading(false);
        redirect("/auth");
      } else {
        setUser(user);
        setToken(await user?.getIdToken());
      }
    });

    return () => {
      unsubscribe();
    };
  }, [setLoading, setToken, setUser]);

  return { user, token, loading, setLoading };
};

export default useAuth;
