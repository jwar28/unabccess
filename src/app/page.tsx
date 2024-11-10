"use client";

import useAuth from "../hooks/useAuth";
import Layout from "@/components/layout/layout";

export default function Home() {
  const { user, loading } = useAuth();

  if (loading) return <p>Loading...</p>;
  if (!user) return null;

  return (
    <>
      <Layout>
        <h1>Welcome to the homepage!</h1>
        <p>{user.email}</p>
        <p>{user.uid}</p>
      </Layout>
    </>
  );
}
