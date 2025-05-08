import { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { PageHeader } from "@/components/PageHeader";
import { SummaryCards } from "@/components/SummaryCards";
import { useToast } from "@/hooks/use-toast";

export default function DashboardHome() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { toast } = useToast();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Sample lead data
  const recentLeads = [
    { id: 1, name: "Rahul Sharma", status: "New", source: "Website", date: "May 8, 2025" },
    { id: 2, name: "Anjali Patel", status: "Contacted", source: "Referral", date: "May 7, 2025" },
    { id: 3, name: "Vikram Singh", status: "New", source: "Social Media", date: "May 7, 2025" },
    { id: 4, name: "Neha Gupta", status: "Unqualified", source: "Email Campaign", date: "May 6, 2025" },
  ];

  // Sample task data
  const upcomingTasks = [
    { id: 1, title: "Follow up with Rahul Sharma", dueDate: "May 10, 2025", priority: "High" },
    { id: 2, name: "Send proposal to Anjali Patel", dueDate: "May 11, 2025", priority: "Medium" },
    { id: 3, name: "Schedule demo for Vikram Singh", dueDate: "May 9, 2025", priority: "High" },
  ];

  // Sample call data
  const upcomingCalls = [
    { id: 1, contact: "Rahul Sharma", date: "May 8, 2025", time: "2:30 PM" },
    { id: 2, contact: "Anjali Patel", date: "May 9, 2025", time: "11:15 AM" },
  ];

  const activityFeed = [
    { 
      id: 1, 
      type: "new_lead", 
      user: "System", 
      content: "New lead created: Rahul Sharma", 
      time: "2 hours ago" 
    },
    { 
      id: 2, 
      type: "status_change", 
      user: "Aditya Verma", 
      content: "Changed Anjali Patel's status to Contacted", 
      time: "3 hours ago" 
    },
    { 
      id: 3, 
      type: "email", 
      user: "Priya Sharma", 
      content: "Sent follow-up email to Vikram Singh", 
      time: "5 hours ago" 
    },
    { 
      id: 4, 
      type: "task", 
      user: "Priya Sharma", 
      content: "Completed task: Initial contact with Neha Gupta", 
      time: "Yesterday" 
    },
    { 
      id: 5, 
      type: "note", 
      user: "Aditya Verma", 
      content: "Added note to Raj Malhotra", 
      time: "Yesterday" 
    },
  ];

  return (
    <div className="flex h-screen overflow-hidden bg-neutral-50">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Content */}
      <div className="flex flex-col flex-1 w-0 overflow-hidden">
        {/* Mobile Header */}
        <div className="md:hidden flex items-center justify-between h-16 bg-white px-4 border-b border-neutral-100">
          <div className="flex items-center">
            <button
              className="text-neutral-500 focus:outline-none"
              onClick={toggleSidebar}
            >
              <span className="material-icons">menu</span>
            </button>
            <h1 className="ml-3 text-lg font-semibold text-neutral-800">
              Dashboard
            </h1>
          </div>
          <div>
            <button className="text-neutral-500 focus:outline-none">
              <span className="material-icons">notifications</span>
            </button>
          </div>
        </div>

        {/* Main Content Container */}
        <main className="flex-1 overflow-y-auto bg-neutral-50 p-4 md:p-6">
          {/* Page Header */}
          <PageHeader 
            title="Dashboard" 
            subtitle="Overview of your sales performance" 
          />

          {/* Summary Cards */}
          <SummaryCards />

          {/* Dashboard Widgets */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {/* Recent Leads */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-neutral-100">
              <div className="p-4 border-b border-neutral-100 flex justify-between">
                <h2 className="text-lg font-medium">Recent Leads</h2>
                <button 
                  className="text-primary-600 hover:text-primary-700 text-sm"
                  onClick={() => toast({ title: "View All Leads", description: "Navigating to leads page" })}
                >
                  View All
                </button>
              </div>
              <div className="overflow-hidden">
                <div className="px-4 py-2 divide-y divide-neutral-100">
                  {recentLeads.map((lead) => (
                    <div key={lead.id} className="py-3">
                      <div className="flex justify-between">
                        <div className="text-sm font-medium text-neutral-900">{lead.name}</div>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          lead.status === "New" 
                            ? "bg-primary-50 text-primary-600" 
                            : lead.status === "Contacted"
                              ? "bg-blue-50 text-blue-600"
                              : lead.status === "Unqualified"
                                ? "bg-danger-50 text-danger-600"
                                : "bg-neutral-50 text-neutral-600"
                        }`}>
                          {lead.status}
                        </span>
                      </div>
                      <div className="flex justify-between mt-1">
                        <div className="text-xs text-neutral-500">{lead.source}</div>
                        <div className="text-xs text-neutral-500">{lead.date}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Upcoming Tasks */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-neutral-100">
              <div className="p-4 border-b border-neutral-100 flex justify-between">
                <h2 className="text-lg font-medium">Upcoming Tasks</h2>
                <button 
                  className="text-primary-600 hover:text-primary-700 text-sm"
                  onClick={() => toast({ title: "View All Tasks", description: "Navigating to tasks page" })}
                >
                  View All
                </button>
              </div>
              <div className="overflow-hidden">
                <div className="px-4 py-2 divide-y divide-neutral-100">
                  {upcomingTasks.map((task) => (
                    <div key={task.id} className="py-3">
                      <div className="flex justify-between">
                        <div className="text-sm font-medium text-neutral-900">{task.title}</div>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          task.priority === "High"
                            ? "bg-danger-50 text-danger-600"
                            : "bg-warning-50 text-warning-600"
                        }`}>
                          {task.priority}
                        </span>
                      </div>
                      <div className="flex justify-between mt-1">
                        <div className="text-xs text-neutral-500">Due: {task.dueDate}</div>
                        <button
                          className="text-primary-600 hover:text-primary-700 text-xs"
                          onClick={() => toast({ title: "Task Completed", description: `Marked task as complete: ${task.title}` })}
                        >
                          Mark Complete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Upcoming Calls */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-neutral-100">
              <div className="p-4 border-b border-neutral-100 flex justify-between">
                <h2 className="text-lg font-medium">Upcoming Calls</h2>
                <button 
                  className="text-primary-600 hover:text-primary-700 text-sm"
                  onClick={() => toast({ title: "View All Calls", description: "Navigating to calls page" })}
                >
                  View All
                </button>
              </div>
              <div className="overflow-hidden">
                <div className="px-4 py-2 divide-y divide-neutral-100">
                  {upcomingCalls.map((call) => (
                    <div key={call.id} className="py-3">
                      <div className="text-sm font-medium text-neutral-900">{call.contact}</div>
                      <div className="flex justify-between mt-1">
                        <div className="text-xs text-neutral-500">{call.date}, {call.time}</div>
                        <button
                          className="text-primary-600 hover:text-primary-700 text-xs flex items-center"
                          onClick={() => toast({ title: "Call Initiated", description: `Calling ${call.contact}` })}
                        >
                          <span className="material-icons text-xs mr-1">call</span>
                          Call
                        </button>
                      </div>
                    </div>
                  ))}
                  {upcomingCalls.length === 0 ? (
                    <div className="py-3 text-center text-sm text-neutral-500">
                      No upcoming calls
                    </div>
                  ) : (
                    <div className="p-3 text-center">
                      <button
                        className="text-primary-600 hover:text-primary-700 text-sm"
                        onClick={() => toast({ title: "Schedule Call", description: "Call scheduling form would open here" })}
                      >
                        Schedule New Call
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-neutral-100 mb-6">
            <div className="p-4 border-b border-neutral-100">
              <h2 className="text-lg font-medium">Recent Activity</h2>
            </div>
            <div className="overflow-hidden">
              <div className="px-4 py-2 divide-y divide-neutral-100">
                {activityFeed.map((activity) => (
                  <div key={activity.id} className="py-3 flex items-start">
                    <div className={`h-8 w-8 rounded-full flex items-center justify-center mr-3 ${
                      activity.type === "new_lead" 
                        ? "bg-primary-50 text-primary-600" 
                        : activity.type === "status_change"
                          ? "bg-warning-50 text-warning-600"
                          : activity.type === "email"
                            ? "bg-blue-50 text-blue-600"
                            : activity.type === "task"
                              ? "bg-success-50 text-success-600"
                              : "bg-neutral-50 text-neutral-600"
                    }`}>
                      <span className="material-icons text-sm">
                        {activity.type === "new_lead" 
                          ? "person_add" 
                          : activity.type === "status_change"
                            ? "compare_arrows"
                            : activity.type === "email"
                              ? "email"
                              : activity.type === "task"
                                ? "task_alt"
                                : "note"}
                      </span>
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <div className="text-sm font-medium text-neutral-900">{activity.user}</div>
                        <div className="text-xs text-neutral-500">{activity.time}</div>
                      </div>
                      <div className="text-sm text-neutral-600 mt-1">{activity.content}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}