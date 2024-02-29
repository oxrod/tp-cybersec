"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

const formSchema = z.object({
  username: z.string().email("Doit être une adresse mail valide"),
  password: z.string().min(1, "Mot de passe requis"),
});

const SignUpForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const res = await fetch("/api/auth/signUp", {
      method: "POST",
      body: JSON.stringify({
        username: values.username,
        password: values.password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-cache",
    });

    const data = await res.json();

    console.log(res);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="john.doe@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mot de passe</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button className="w-full" type="submit">
          S&apos;inscrire
        </Button>
        <Button className="w-full" variant="outline" type="button" asChild>
          <Link className="text-wrap w-full" href={"/"}>
            Déjà un compte ? Connectez-vous
          </Link>
        </Button>
      </form>
      <div className="flex text-sm underline justify-center mt-3">
        <Link href={"/"}>Retour à l&apos;accueil</Link>
      </div>
    </Form>
  );
};

export default SignUpForm;
