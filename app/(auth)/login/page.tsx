import { PageLayout } from "@/components/PageLayout";

import { LoginForm } from "./form";

export default function Page() {
  return (
    <PageLayout>
      <h1>Entrar</h1>

      <LoginForm />
    </PageLayout>
  );
}
