import { redirect } from "next/navigation";

import { PageLayout } from "@/components/PageLayout";
import { useServerSession } from "@/hooks/useServerSession";

import { LoginForm } from "./form";

export default async function Page() {
  const session = await useServerSession();

  if (session) {
    redirect("/");
  }

  return (
    <PageLayout>
      <h1>Entrar</h1>

      <LoginForm />
    </PageLayout>
  );
}
