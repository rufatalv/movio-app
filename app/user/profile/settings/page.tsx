import ClientOnly from "@/components/ClientOnly";
import Settings from "@/components/Profilepage/Settings";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
export default async function Tabs() {
  const session = await getServerSession();

  const currentUserEmail = session?.user?.email!;
  if (!session) redirect("/");

  const user = await prisma.user.findUnique({
    where: {
      email: currentUserEmail,
    },
  });
  return (
    <ClientOnly>
      <Settings user={user!} />
    </ClientOnly>
  );
}
