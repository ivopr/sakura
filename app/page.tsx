import { PageLayout } from "@/components/PageLayout";
import { useServerSession } from "@/hooks/useServerSession";

export default async function Page() {
  const session = await useServerSession();

  return (
    <PageLayout>
      <h1>{JSON.stringify(session)}</h1>
    </PageLayout>
  );
}
