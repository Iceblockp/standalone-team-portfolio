"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { AdminLayout } from "@/components/admin/admin-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getContacts } from "@/lib/actions/contact";
import { getSolutions } from "@/lib/actions/solutions";
import { 
  Users, 
  Briefcase, 
  MessageSquare, 
  Lightbulb, 
  ArrowRightCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function DashboardPage() {
  const { data: session } = useSession();
  const [stats, setStats] = useState({
    solutions: 0,
    team: 0,
    projects: 0,
    unreadMessages: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [solutionsData, contactsData] = await Promise.all([
          getSolutions(),
          getContacts(),
        ]);

        const unreadMessages = contactsData.contacts?.filter(
          (contact) => !contact.read
        ).length || 0;

        setStats({
          solutions: solutionsData.solutions?.length || 0,
          team: 3, // Placeholder
          projects: 5, // Placeholder
          unreadMessages,
        });
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <AdminLayout>
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Team Members</p>
                <h2 className="text-3xl font-bold">{stats.team}</h2>
              </div>
              <Users className="h-10 w-10 text-primary opacity-80" />
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Projects</p>
                <h2 className="text-3xl font-bold">{stats.projects}</h2>
              </div>
              <Briefcase className="h-10 w-10 text-primary opacity-80" />
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Solutions</p>
                <h2 className="text-3xl font-bold">{stats.solutions}</h2>
              </div>
              <Lightbulb className="h-10 w-10 text-primary opacity-80" />
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Unread Messages</p>
                <h2 className="text-3xl font-bold">{stats.unreadMessages}</h2>
              </div>
              <MessageSquare className="h-10 w-10 text-primary opacity-80" />
            </CardContent>
          </Card>
        </div>
        
        <Tabs defaultValue="manage">
          <TabsList className="mb-6">
            <TabsTrigger value="manage">Quick Actions</TabsTrigger>
            <TabsTrigger value="recent">Recent Activity</TabsTrigger>
          </TabsList>
          
          <TabsContent value="manage">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Team Members
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Manage your team profiles, add new members, or update existing information.
                  </p>
                  <Button asChild>
                    <Link href="/admin/team">
                      Manage Team
                      <ArrowRightCircle className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Briefcase className="h-5 w-5" />
                    Projects
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Add new projects, edit project details, or manage project categories.
                  </p>
                  <Button asChild>
                    <Link href="/admin/projects">
                      Manage Projects
                      <ArrowRightCircle className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="h-5 w-5" />
                    Messages
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    View and respond to contact form messages from your website visitors.
                  </p>
                  <Button asChild>
                    <Link href="/admin/contacts">
                      View Messages
                      <ArrowRightCircle className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="recent">
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-center text-muted-foreground py-8">
                  Activity tracking will be displayed here once we have data to show.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
}