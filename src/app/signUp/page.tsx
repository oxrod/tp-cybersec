import SignUpForm from "@/components/SignUpForm/SignUpForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

const SignUpPage = () => {
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
          <CardTitle>Inscription</CardTitle>
        </CardHeader>
        <CardContent>
          <SignUpForm />
        </CardContent>
      </Card>
    </main>
  );
};

export default SignUpPage;
