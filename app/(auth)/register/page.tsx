import { redirect } from "next/navigation";

import { PageLayout } from "@/components/PageLayout";
import { useServerSession } from "@/hooks/useServerSession";

import { createAccount } from "./createAccount";
import { RegisterForm } from "./form";

export default async function Page() {
  const session = await useServerSession();

  if (session) {
    redirect("/");
  }

  return (
    <PageLayout>
      <h1>Criar conta</h1>

      <RegisterForm createAccount={createAccount} />
    </PageLayout>
  );
}
