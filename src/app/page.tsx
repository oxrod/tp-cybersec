import LoginForm from "@/components/LoginForm/LoginForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex relative min-h-screen flex-col items-center justify-center p-24">
      <Image
        src="https://cdn.pixabay.com/photo/2018/05/14/16/25/cyber-security-3400657_1280.jpg"
        alt="cybersec background"
        fill={true}
        className="object-cover"
      />
      <Card className="z-10">
        <CardHeader>
          <CardTitle>Connexion</CardTitle>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
      </Card>
    </main>
  );
}
