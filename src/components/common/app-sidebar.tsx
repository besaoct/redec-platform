"use client";

import {
  ArrowLeftRight,
  QrCode,
  KeyRound,
  FileText,
  Home,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { NavLink } from "./nav-link";
import Image from "next/image";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  useSidebar,
} from "@/components/ui/sidebar";
import TextLogo from "./text-logo";

const converters = [
  { title: "Unit Converter", url: "/unit-converter", icon: ArrowLeftRight },
];

const generators = [
  { title: "QR Code Generator", url: "/qr-generator", icon: QrCode },
  { title: "Password Generator", url: "/password-generator", icon: KeyRound },
];

const textTools = [
  { title: "Word Counter", url: "/word-counter", icon: FileText },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  const renderGroup = (label: string, items: typeof converters) => (
    <SidebarGroup key={label} className="-mt-5">
      <SidebarGroupLabel>{label}</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu >
          {items.map((item) => (
            <SidebarMenuItem key={item.url}>
              <SidebarMenuButton asChild isActive={isActive(item.url)}>
                <NavLink
                  href={item.url}
                  end
                  className="hover:bg-sidebar-accent/50"
                  activeClassName="bg-sidebar-accent text-sidebar-accent-foreground font-semibold"
                >
                  <item.icon className="mr-2 h-4 w-4" />
                  {!collapsed && <span>{item.title}</span>}
                </NavLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );

  return (
    <Sidebar collapsible="offcanvas" >
      <SidebarHeader className="h-14 border-b flex items-start px-4">
         <div className="flex my-auto  items-center justify-center gap-3">
            <Image src="/logo.png" alt="Redec Logo" width={30} height={30} className="rounded" />
             <TextLogo/>
         </div>
      </SidebarHeader>
      <SidebarContent className="py-2">
        <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={isActive("/")}>
                <NavLink
                  href="/"
                  end
                  className="hover:bg-sidebar-accent/50"
                  activeClassName="bg-sidebar-accent text-sidebar-accent-foreground font-semibold"
                >
                  <Home className="mr-2 h-4 w-4" />
                  {!collapsed && <span>Home</span>}
                </NavLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>

        {renderGroup("Converters", converters)}
        {renderGroup("Generators", generators)}
        {renderGroup("Text Tools", textTools)}
      </SidebarContent>
    </Sidebar>
  );
}
