import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import AccountDashboard from "./AccountDashboard";

export default async function AccountPage() {
  const session = await auth();
  if (!session?.user) {
    redirect("/login");
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: { addresses: true, orders: { include: { items: true } } }
  });

  if (!user) return null;

  return <AccountDashboard user={user} />;
}
