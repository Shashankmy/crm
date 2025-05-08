import { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { PageHeader } from "@/components/PageHeader";
import { useToast } from "@/hooks/use-toast";

export default function Tasks() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { toast } = useToast();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Sample tasks
  const tasks = [
    { id: 1, title: "Follow up with Rahul Sharma", dueDate: "2025-05-10", priority: "High", status: "Pending" },
    { id: 2, title: "Send proposal to Anjali Patel", dueDate: "2025-05-11", priority: "Medium", status: "Completed" },
    { id: 3, title: "Schedule demo for Vikram Singh", dueDate: "2025-05-09", priority: "High", status: "Pending" },
    { id: 4, title: "Update contact information for Neha Gupta", dueDate: "2025-05-12", priority: "Low", status: "Pending" },
    { id: 5, title: "Prepare presentation for team meeting", dueDate: "2025-05-15", priority: "Medium", status: "Not Started" },
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
              Task Management
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
            title="Task Management" 
            subtitle="Organize and track your daily tasks" 
          />

          {/* Task List */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-neutral-100 mb-6">
            <div className="p-4 border-b border-neutral-100 flex justify-between">
              <h2 className="text-lg font-medium">Your Tasks</h2>
              <button 
                className="text-primary-600 hover:text-primary-700 flex items-center text-sm"
                onClick={() => toast({ title: "Create Task", description: "Task creation form would open here" })}
              >
                <span className="material-icons text-sm mr-1">add</span>
                Add Task
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-neutral-200">
                <thead className="bg-neutral-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                      Task
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                      Due Date
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                      Priority
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-neutral-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-neutral-200">
                  {tasks.map((task) => (
                    <tr key={task.id} className="hover:bg-neutral-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="text-sm font-medium text-neutral-900">{task.title}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-neutral-900">{task.dueDate}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          task.priority === "High" 
                            ? "bg-danger-50 text-danger-600" 
                            : task.priority === "Medium"
                              ? "bg-warning-50 text-warning-600"
                              : "bg-neutral-50 text-neutral-600"
                        }`}>
                          {task.priority}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          task.status === "Completed" 
                            ? "bg-success-50 text-success-600" 
                            : task.status === "Pending"
                              ? "bg-primary-50 text-primary-600"
                              : "bg-neutral-50 text-neutral-600"
                        }`}>
                          {task.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end space-x-2">
                          <button
                            className="text-neutral-400 hover:text-neutral-500 focus:outline-none"
                            title="Edit"
                            onClick={() => toast({ title: "Edit Task", description: `Edit task: ${task.title}` })}
                          >
                            <span className="material-icons text-sm">edit</span>
                          </button>
                          <button
                            className="text-success-400 hover:text-success-500 focus:outline-none"
                            title="Complete"
                            onClick={() => toast({ title: "Complete Task", description: `Marked as complete: ${task.title}` })}
                          >
                            <span className="material-icons text-sm">check_circle</span>
                          </button>
                          <button
                            className="text-danger-400 hover:text-danger-500 focus:outline-none"
                            title="Delete"
                            onClick={() => toast({ title: "Delete Task", description: `Delete task: ${task.title}` })}
                          >
                            <span className="material-icons text-sm">delete</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}