import { PageLayout } from "@/components/PageLayout";

import { createAccount } from "./createAccount";
import { RegisterForm } from "./form";

export default function Page() {
  return (
    <PageLayout>
      <h1>Criar conta</h1>

      <RegisterForm createAccount={createAccount} />
    </PageLayout>
  );
}
