"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  Bell,
  ChartNoAxesCombined,
  Goal,
  Home,
  LogOut,
  Settings,
} from "lucide-react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const items = [
  {
    title: "Home",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Habits",
    url: "/dashboard/habits",
    icon: Goal,
  },
  {
    title: "Progress",
    url: "/dashboard/progress",
    icon: ChartNoAxesCombined,
  },
  {
    title: "Reminders",
    url: "/dashboard/reminders",
    icon: Bell,
  },
  {
    title: "Preferences",
    url: "/dashboard/preferences",
    icon: Settings,
  },
];

export function AppSidebar() {
  const pathname = usePathname();

  const onSignOut = () => {
    signOut({ callbackUrl: "/" });
  };

  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>GG Habit Tracker</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => {
                const isActive = pathname === item.url;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={isActive}>
                      <Link href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              onClick={onSignOut}
              className="cursor-pointer"
            >
              <div>
                <LogOut />
                <span>Sign out</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
