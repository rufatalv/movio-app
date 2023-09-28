import ClientOnly from "@/components/ClientOnly";
import Settings from "@/components/Profilepage/Settings";
import { prisma } from "@/lib/prisma";

import { getServerSession } from "next-auth";
export default async function TabsDemo() {
  const session = await getServerSession();
  const currentUserEmail = session?.user?.email!;
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
