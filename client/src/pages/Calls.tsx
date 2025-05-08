import { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { PageHeader } from "@/components/PageHeader";
import { useToast } from "@/hooks/use-toast";

export default function Calls() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { toast } = useToast();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Sample calls
  const calls = [
    { 
      id: 1, 
      contact: "Rahul Sharma", 
      company: "Tata Consultancy", 
      date: "2025-05-08", 
      time: "10:00 AM", 
      duration: "15 min", 
      status: "Completed", 
      notes: "Discussed proposal details" 
    },
    { 
      id: 2, 
      contact: "Anjali Patel", 
      company: "Reliance Industries", 
      date: "2025-05-08", 
      time: "2:30 PM", 
      duration: "30 min", 
      status: "Scheduled", 
      notes: "Initial discovery call" 
    },
    { 
      id: 3, 
      contact: "Vikram Singh", 
      company: "Infosys", 
      date: "2025-05-09", 
      time: "11:15 AM", 
      duration: "45 min", 
      status: "Scheduled", 
      notes: "Product demo" 
    },
    { 
      id: 4, 
      contact: "Neha Gupta", 
      company: "Wipro Technologies", 
      date: "2025-05-07", 
      time: "3:00 PM", 
      duration: "15 min", 
      status: "Missed", 
      notes: "Rescheduled for next week" 
    },
    { 
      id: 5, 
      contact: "Raj Malhotra", 
      company: "Tech Mahindra", 
      date: "2025-05-10", 
      time: "9:30 AM", 
      duration: "30 min", 
      status: "Scheduled", 
      notes: "Follow-up after proposal" 
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
              Call Management
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
            title="Call Management" 
            subtitle="Schedule and manage your sales calls" 
          />

          {/* Upcoming Calls Card */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-white rounded-lg shadow-sm border border-neutral-100 p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-medium text-neutral-700">Today's Calls</h3>
                <span className="bg-primary-50 text-primary-600 text-xs font-medium px-2 py-1 rounded-full">
                  2 Calls
                </span>
              </div>
              <div className="text-2xl font-semibold text-neutral-800 mb-1">2</div>
              <div className="text-xs text-neutral-500">2 Scheduled, 0 Completed</div>
            </div>
            <div className="bg-white rounded-lg shadow-sm border border-neutral-100 p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-medium text-neutral-700">Tomorrow's Calls</h3>
                <span className="bg-primary-50 text-primary-600 text-xs font-medium px-2 py-1 rounded-full">
                  1 Call
                </span>
              </div>
              <div className="text-2xl font-semibold text-neutral-800 mb-1">1</div>
              <div className="text-xs text-neutral-500">1 Scheduled, 0 Completed</div>
            </div>
            <div className="bg-white rounded-lg shadow-sm border border-neutral-100 p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-medium text-neutral-700">This Week's Calls</h3>
                <span className="bg-primary-50 text-primary-600 text-xs font-medium px-2 py-1 rounded-full">
                  5 Calls
                </span>
              </div>
              <div className="text-2xl font-semibold text-neutral-800 mb-1">5</div>
              <div className="text-xs text-neutral-500">3 Scheduled, 1 Completed, 1 Missed</div>
            </div>
          </div>

          {/* Call List */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-neutral-100 mb-6">
            <div className="p-4 border-b border-neutral-100 flex justify-between">
              <h2 className="text-lg font-medium">Upcoming Calls</h2>
              <button 
                className="text-primary-600 hover:text-primary-700 flex items-center text-sm"
                onClick={() => toast({ title: "Schedule Call", description: "Call scheduling form would open here" })}
              >
                <span className="material-icons text-sm mr-1">add</span>
                Schedule Call
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-neutral-200">
                <thead className="bg-neutral-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                      Contact
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                      Date & Time
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                      Duration
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                      Notes
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-neutral-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-neutral-200">
                  {calls.map((call) => (
                    <tr key={call.id} className="hover:bg-neutral-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div>
                            <div className="text-sm font-medium text-neutral-900">{call.contact}</div>
                            <div className="text-sm text-neutral-500">{call.company}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-neutral-900">{call.date}</div>
                        <div className="text-sm text-neutral-500">{call.time}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-neutral-900">{call.duration}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          call.status === "Completed" 
                            ? "bg-success-50 text-success-600" 
                            : call.status === "Scheduled"
                              ? "bg-primary-50 text-primary-600"
                              : "bg-danger-50 text-danger-600"
                        }`}>
                          {call.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-neutral-500 max-w-xs truncate">{call.notes}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end space-x-2">
                          <button
                            className="text-primary-400 hover:text-primary-500 focus:outline-none"
                            title="Call"
                            onClick={() => toast({ title: "Call Contact", description: `Initiating call to ${call.contact}` })}
                          >
                            <span className="material-icons text-sm">call</span>
                          </button>
                          <button
                            className="text-neutral-400 hover:text-neutral-500 focus:outline-none"
                            title="Edit"
                            onClick={() => toast({ title: "Edit Call", description: `Edit call with ${call.contact}` })}
                          >
                            <span className="material-icons text-sm">edit</span>
                          </button>
                          <button
                            className="text-danger-400 hover:text-danger-500 focus:outline-none"
                            title="Cancel"
                            onClick={() => toast({ title: "Cancel Call", description: `Cancel call with ${call.contact}` })}
                          >
                            <span className="material-icons text-sm">cancel</span>
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