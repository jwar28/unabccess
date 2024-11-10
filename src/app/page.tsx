"use client";

import { Button } from "@/components/ui/button";
import useAuth from "../hooks/useAuth";
import { logout } from "@/api/auth";

export default function Home() {
  const { user, loading } = useAuth();

  if (loading) return <p>Loading...</p>;
  if (!user) return null;

  return (
    <>
      <h1>Welcome to the homepage!</h1>
      <p>{user.email}</p>
      <p>{user.uid}</p>
      <Button onClick={logout}>Cerrar sesion</Button>
    </>
  );
}
