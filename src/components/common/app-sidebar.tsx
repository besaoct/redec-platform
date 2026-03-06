"use client";

import { Home } from "lucide-react";
import { usePathname } from "next/navigation";
import { NavLink } from "./nav-link";
import Image from "next/image";
import { tools } from "@/data/tools";

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

export function AppSidebar() {
  const { state, setOpenMobile, isMobile } = useSidebar();
  const collapsed = state === "collapsed";
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  const handleLinkClick = () => {
    if (isMobile) {
      setOpenMobile(false);
    }
  };

  return (
    <Sidebar collapsible="offcanvas">
      <SidebarHeader className="h-14 border-b flex items-start px-4">
        <div className="flex my-auto  items-center justify-center gap-3">
          <Image
            src="/logo.png"
            alt="Redec Logo"
            width={30}
            height={30}
            className="rounded"
          />
          <TextLogo />
        </div>
      </SidebarHeader>
      <SidebarContent className="py-2 scrollbar-hide">
        <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                className=" rounded"
                asChild
                isActive={isActive("/")}
                onClick={handleLinkClick}
              >
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

        {tools.map((group) => (
          <SidebarGroup key={group.category} className="-mt-5">
            <SidebarGroupLabel>{group.category}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => (
                  <SidebarMenuItem key={item.url}>
                    <SidebarMenuButton
                      className="rounded"
                      asChild
                      isActive={isActive(item.url)}
                      onClick={handleLinkClick}
                    >
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
        ))}
      </SidebarContent>
    </Sidebar>
  );
}
