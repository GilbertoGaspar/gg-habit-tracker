import { getServerSession } from "next-auth";

export default async function Dashboard() {
  const session = await getServerSession();
  console.log("Session data:", session);
  return <div>Dashboard</div>;
}
