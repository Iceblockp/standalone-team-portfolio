"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/site/theme-toggle";
import {
  LayoutDashboard,
  Users,
  Briefcase,
  Lightbulb,
  MessageSquare,
  Settings,
  LogOut,
  Menu,
  X,
  ChevronsUpDown,
  ChevronRight,
  Home,
  Activity,
  Cpu,
} from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

type NavItem = {
  title: string;
  href: string;
  icon: React.ReactNode;
  subitems?: { title: string; href: string }[];
};

const navItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/admin/dashboard",
    icon: <LayoutDashboard className="h-5 w-5" />,
  },
  {
    title: "Team Members",
    href: "/admin/team",
    icon: <Users className="h-5 w-5" />,
  },
  {
    title: "Projects",
    href: "/admin/projects",
    icon: <Briefcase className="h-5 w-5" />,
    subitems: [
      { title: "All Projects", href: "/admin/projects" },
      { title: "Categories", href: "/admin/projects/categories" },
    ],
  },
  {
    title: "Solutions",
    href: "/admin/solutions",
    icon: <Lightbulb className="h-5 w-5" />,
  },
  {
    title: "Work Process",
    href: "/admin/work-process",
    icon: <Activity className="h-5 w-5" />,
  },
  {
    title: "Technologies",
    href: "/admin/tech-stack",
    icon: <Cpu className="h-5 w-5" />,
  },
  {
    title: "Contact Messages",
    href: "/admin/contacts",
    icon: <MessageSquare className="h-5 w-5" />,
  },
];

type AdminLayoutProps = {
  children: React.ReactNode;
};

export function AdminLayout({ children }: AdminLayoutProps) {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut({ callbackUrl: "/admin/login" });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile Sidebar Toggle */}
      <div className="md:hidden flex items-center justify-between p-4 border-b">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
        >
          {mobileSidebarOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </Button>
        <div className="font-bold text-lg">Admin Panel</div>
        <ThemeToggle />
      </div>

      {/* Sidebar - Desktop */}
      <div
        className={cn(
          "fixed top-0 left-0 z-40 h-screen transition-all duration-300 ease-in-out bg-background border-r",
          sidebarOpen ? "w-64" : "w-20",
          "hidden md:block"
        )}
      >
        <div className="flex flex-col h-full">
          <div
            className={cn(
              "flex items-center justify-between p-4",
              !sidebarOpen && "justify-center"
            )}
          >
            {sidebarOpen ? (
              <div className="font-bold text-lg">Admin Panel</div>
            ) : (
              <div className="font-bold text-lg">AP</div>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <ChevronsUpDown className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex-1 py-4 overflow-y-auto">
            <nav className="px-2 space-y-1">
              {navItems.map((item) => {
                const isActive =
                  pathname === item.href ||
                  (item.subitems &&
                    item.subitems.some((subitem) =>
                      pathname.startsWith(subitem.href)
                    ));

                if (item.subitems) {
                  return (
                    <Collapsible
                      key={item.href}
                      className="w-full"
                      defaultOpen={isActive}
                    >
                      <CollapsibleTrigger asChild>
                        <Button
                          variant={isActive ? "secondary" : "ghost"}
                          className={cn(
                            "w-full justify-start mb-1",
                            !sidebarOpen && "justify-center"
                          )}
                        >
                          {item.icon}
                          {sidebarOpen && (
                            <>
                              <span className="ml-3">{item.title}</span>
                              <ChevronRight className="ml-auto h-4 w-4" />
                            </>
                          )}
                        </Button>
                      </CollapsibleTrigger>
                      {sidebarOpen && (
                        <CollapsibleContent>
                          <div className="pl-10 space-y-1 mt-1">
                            {item.subitems.map((subitem) => (
                              <Link key={subitem.href} href={subitem.href}>
                                <Button
                                  variant={
                                    pathname === subitem.href
                                      ? "secondary"
                                      : "ghost"
                                  }
                                  className="w-full justify-start"
                                >
                                  <span>{subitem.title}</span>
                                </Button>
                              </Link>
                            ))}
                          </div>
                        </CollapsibleContent>
                      )}
                    </Collapsible>
                  );
                }

                return (
                  <Link key={item.href} href={item.href}>
                    <Button
                      variant={isActive ? "secondary" : "ghost"}
                      className={cn(
                        "w-full justify-start mb-1",
                        !sidebarOpen && "justify-center"
                      )}
                    >
                      {item.icon}
                      {sidebarOpen && (
                        <span className="ml-3">{item.title}</span>
                      )}
                    </Button>
                  </Link>
                );
              })}
            </nav>
          </div>

          <div
            className={cn(
              "p-4 border-t flex items-center gap-2",
              !sidebarOpen && "justify-center"
            )}
          >
            {sidebarOpen && (
              <div className="flex-1">
                <div className="font-semibold">
                  {session?.user?.name || "Admin User"}
                </div>
                <div className="text-xs text-muted-foreground">
                  {session?.user?.email || "admin@example.com"}
                </div>
              </div>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={handleSignOut}
              title="Sign Out"
            >
              <LogOut className="h-5 w-5 text-muted-foreground" />
            </Button>
            <ThemeToggle />
          </div>
        </div>
      </div>

      {/* Sidebar - Mobile */}
      {mobileSidebarOpen && (
        <div className="fixed inset-0 z-30 md:hidden">
          <div
            className="fixed inset-0 bg-black bg-opacity-50"
            onClick={() => setMobileSidebarOpen(false)}
          />
          <div className="fixed top-0 left-0 bottom-0 w-64 bg-background border-r">
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between p-4 border-b">
                <div className="font-bold text-lg">Admin Panel</div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setMobileSidebarOpen(false)}
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>

              <div className="flex-1 py-4 overflow-y-auto">
                <nav className="px-2 space-y-1">
                  {navItems.map((item) => {
                    const isActive =
                      pathname === item.href ||
                      (item.subitems &&
                        item.subitems.some((subitem) =>
                          pathname.startsWith(subitem.href)
                        ));

                    if (item.subitems) {
                      return (
                        <Collapsible
                          key={item.href}
                          className="w-full"
                          defaultOpen={isActive}
                        >
                          <CollapsibleTrigger asChild>
                            <Button
                              variant={isActive ? "secondary" : "ghost"}
                              className="w-full justify-start mb-1"
                            >
                              {item.icon}
                              <span className="ml-3">{item.title}</span>
                              <ChevronRight className="ml-auto h-4 w-4" />
                            </Button>
                          </CollapsibleTrigger>
                          <CollapsibleContent>
                            <div className="pl-10 space-y-1 mt-1">
                              {item.subitems.map((subitem) => (
                                <Link
                                  key={subitem.href}
                                  href={subitem.href}
                                  onClick={() => setMobileSidebarOpen(false)}
                                >
                                  <Button
                                    variant={
                                      pathname === subitem.href
                                        ? "secondary"
                                        : "ghost"
                                    }
                                    className="w-full justify-start"
                                  >
                                    <span>{subitem.title}</span>
                                  </Button>
                                </Link>
                              ))}
                            </div>
                          </CollapsibleContent>
                        </Collapsible>
                      );
                    }

                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setMobileSidebarOpen(false)}
                      >
                        <Button
                          variant={isActive ? "secondary" : "ghost"}
                          className="w-full justify-start mb-1"
                        >
                          {item.icon}
                          <span className="ml-3">{item.title}</span>
                        </Button>
                      </Link>
                    );
                  })}
                </nav>
              </div>

              <div className="p-4 border-t">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="font-semibold">
                      {session?.user?.name || "Admin User"}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {session?.user?.email || "admin@example.com"}
                    </div>
                  </div>
                </div>
                <Button className="w-full" onClick={handleSignOut}>
                  <LogOut className="h-4 w-4 mr-2" /> Sign Out
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div
        className={cn(
          "transition-all duration-300 ease-in-out",
          "md:ml-64",
          sidebarOpen ? "md:ml-64" : "md:ml-20"
        )}
      >
        <main>{children}</main>
      </div>
    </div>
  );
}
