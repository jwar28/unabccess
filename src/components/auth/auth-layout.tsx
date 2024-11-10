import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AuthBackground } from "./background";
import Image from "next/image";

interface FormProps {
  title: string;
  desc: string;
  children: React.ReactNode;
}

export function AuthFormLayout({ title, desc, children }: FormProps) {
  return (
    <>
      <AuthBackground />
      <div className="flex h-screen w-full items-center justify-center px-4">
        <Card className="mx-auto max-w-md w-full">
          <CardHeader>
            <Image
              src="/logo.png"
              alt="logo"
              width={140}
              height={140}
              className="mx-auto"
            />
            <CardTitle className="text-2xl text-center">{title}</CardTitle>
            <CardDescription className="text-center">{desc}</CardDescription>
          </CardHeader>
          <CardContent>
            <>{children}</>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
