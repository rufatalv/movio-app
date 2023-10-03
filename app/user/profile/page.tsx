import Dashboard from "@/components/Profilepage/Dashboard";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function page() {
  const session = await getServerSession();

  const currentUserEmail = session?.user?.email!;
  if (!session) redirect("/");

  const user = await prisma.user.findUnique({
    where: {
      email: currentUserEmail,
    },
    include: { bookmarks: true },
  });
  return <Dashboard user={user!} />;
}
