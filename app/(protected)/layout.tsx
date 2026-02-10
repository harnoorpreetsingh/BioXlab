import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";

export default async function ProtectedPage({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return redirect("/sign-in");
  }

  return <div className="flex-1 w-full flex flex-col gap-12">{children}</div>;
}
