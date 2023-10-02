import getCurrentUser from "@/actions/getCurrentUser";

export default async function page() {
  const currentUser = await getCurrentUser();
  return <div>
    {currentUser?.name}
  </div>;
}
