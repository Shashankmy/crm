import { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { PageHeader } from "@/components/PageHeader";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

export default function Settings() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { toast } = useToast();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const [activeTab, setActiveTab] = useState("profile");

  // Submit handlers for forms
  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Profile Updated",
      description: "Your profile information has been updated successfully",
    });
  };

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Password Updated",
      description: "Your password has been changed successfully",
    });
  };

  const handleNotificationChange = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Notification Preferences Updated",
      description: "Your notification settings have been saved",
    });
  };

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
              Settings
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
            title="Settings" 
            subtitle="Manage your account preferences and settings" 
          />

          {/* Settings Container */}
          <div className="bg-white rounded-lg shadow-sm border border-neutral-100 overflow-hidden">
            <div className="md:flex">
              {/* Settings Tabs */}
              <div className="md:w-64 bg-neutral-50 md:border-r border-neutral-100">
                <nav className="flex flex-col p-4 md:p-0">
                  <button
                    className={`text-left px-4 py-3 ${activeTab === "profile" ? "bg-primary-50 text-primary-600 md:border-l-4 border-primary-500" : "hover:bg-neutral-100 text-neutral-700"}`}
                    onClick={() => setActiveTab("profile")}
                  >
                    <div className="flex items-center">
                      <span className="material-icons text-sm mr-2">person</span>
                      <span>Profile Settings</span>
                    </div>
                  </button>
                  <button
                    className={`text-left px-4 py-3 ${activeTab === "account" ? "bg-primary-50 text-primary-600 md:border-l-4 border-primary-500" : "hover:bg-neutral-100 text-neutral-700"}`}
                    onClick={() => setActiveTab("account")}
                  >
                    <div className="flex items-center">
                      <span className="material-icons text-sm mr-2">lock</span>
                      <span>Account Security</span>
                    </div>
                  </button>
                  <button
                    className={`text-left px-4 py-3 ${activeTab === "notifications" ? "bg-primary-50 text-primary-600 md:border-l-4 border-primary-500" : "hover:bg-neutral-100 text-neutral-700"}`}
                    onClick={() => setActiveTab("notifications")}
                  >
                    <div className="flex items-center">
                      <span className="material-icons text-sm mr-2">notifications</span>
                      <span>Notifications</span>
                    </div>
                  </button>
                  <button
                    className={`text-left px-4 py-3 ${activeTab === "integrations" ? "bg-primary-50 text-primary-600 md:border-l-4 border-primary-500" : "hover:bg-neutral-100 text-neutral-700"}`}
                    onClick={() => setActiveTab("integrations")}
                  >
                    <div className="flex items-center">
                      <span className="material-icons text-sm mr-2">extension</span>
                      <span>Integrations</span>
                    </div>
                  </button>
                </nav>
              </div>

              {/* Settings Content */}
              <div className="p-4 md:p-6 flex-1">
                {/* Profile Settings */}
                {activeTab === "profile" && (
                  <div>
                    <h3 className="text-lg font-medium mb-4">Profile Settings</h3>
                    <form onSubmit={handleProfileUpdate}>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <label htmlFor="firstName" className="block text-sm font-medium text-neutral-700 mb-1">
                            First Name
                          </label>
                          <Input
                            type="text"
                            id="firstName"
                            name="firstName"
                            defaultValue="Shashank"
                            className="block w-full sm:text-sm"
                          />
                        </div>
                        <div>
                          <label htmlFor="lastName" className="block text-sm font-medium text-neutral-700 mb-1">
                            Last Name
                          </label>
                          <Input
                            type="text"
                            id="lastName"
                            name="lastName"
                            defaultValue="M Y"
                            className="block w-full sm:text-sm"
                          />
                        </div>
                        <div>
                          <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-1">
                            Email Address
                          </label>
                          <Input
                            type="email"
                            id="email"
                            name="email"
                            defaultValue="shashank.my@example.com"
                            className="block w-full sm:text-sm"
                          />
                        </div>
                        <div>
                          <label htmlFor="phone" className="block text-sm font-medium text-neutral-700 mb-1">
                            Phone Number
                          </label>
                          <Input
                            type="tel"
                            id="phone"
                            name="phone"
                            defaultValue="(555) 123-4567"
                            className="block w-full sm:text-sm"
                          />
                        </div>
                        <div>
                          <label htmlFor="role" className="block text-sm font-medium text-neutral-700 mb-1">
                            Job Title
                          </label>
                          <Input
                            type="text"
                            id="role"
                            name="role"
                            defaultValue="Sales Manager"
                            className="block w-full sm:text-sm"
                          />
                        </div>
                        <div>
                          <label htmlFor="team" className="block text-sm font-medium text-neutral-700 mb-1">
                            Team
                          </label>
                          <Input
                            type="text"
                            id="team"
                            name="team"
                            defaultValue="Sales Team 1"
                            className="block w-full sm:text-sm"
                          />
                        </div>
                      </div>
                      <div className="mt-6">
                        <Button
                          type="submit"
                          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                        >
                          Save Changes
                        </Button>
                      </div>
                    </form>
                  </div>
                )}

                {/* Account Security */}
                {activeTab === "account" && (
                  <div>
                    <h3 className="text-lg font-medium mb-4">Account Security</h3>
                    <form onSubmit={handlePasswordChange}>
                      <div className="space-y-4 mb-4">
                        <div>
                          <label htmlFor="currentPassword" className="block text-sm font-medium text-neutral-700 mb-1">
                            Current Password
                          </label>
                          <Input
                            type="password"
                            id="currentPassword"
                            name="currentPassword"
                            className="block w-full sm:text-sm"
                          />
                        </div>
                        <div>
                          <label htmlFor="newPassword" className="block text-sm font-medium text-neutral-700 mb-1">
                            New Password
                          </label>
                          <Input
                            type="password"
                            id="newPassword"
                            name="newPassword"
                            className="block w-full sm:text-sm"
                          />
                        </div>
                        <div>
                          <label htmlFor="confirmPassword" className="block text-sm font-medium text-neutral-700 mb-1">
                            Confirm New Password
                          </label>
                          <Input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            className="block w-full sm:text-sm"
                          />
                        </div>
                      </div>
                      <div className="mt-6">
                        <Button
                          type="submit"
                          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                        >
                          Change Password
                        </Button>
                      </div>
                    </form>
                    
                    <div className="mt-8 pt-8 border-t border-neutral-100">
                      <h4 className="text-md font-medium mb-3">Two-Factor Authentication</h4>
                      <p className="text-sm text-neutral-500 mb-4">
                        Add an extra layer of security to your account by enabling two-factor authentication.
                      </p>
                      <Button
                        variant="outline"
                        onClick={() => toast({ title: "2FA Setup", description: "Two-factor authentication setup screen would open here" })}
                      >
                        Enable Two-Factor Authentication
                      </Button>
                    </div>
                  </div>
                )}

                {/* Notifications */}
                {activeTab === "notifications" && (
                  <div>
                    <h3 className="text-lg font-medium mb-4">Notification Preferences</h3>
                    <form onSubmit={handleNotificationChange}>
                      <div className="space-y-4">
                        <div className="flex items-start">
                          <div className="flex items-center h-5">
                            <Checkbox
                              id="emailNotif"
                              defaultChecked={true}
                            />
                          </div>
                          <div className="ml-3 text-sm">
                            <label htmlFor="emailNotif" className="font-medium text-neutral-700">Email Notifications</label>
                            <p className="text-neutral-500">Receive email updates about your account activity</p>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <div className="flex items-center h-5">
                            <Checkbox
                              id="smsNotif"
                              defaultChecked={false}
                            />
                          </div>
                          <div className="ml-3 text-sm">
                            <label htmlFor="smsNotif" className="font-medium text-neutral-700">SMS Notifications</label>
                            <p className="text-neutral-500">Receive text messages for critical updates</p>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <div className="flex items-center h-5">
                            <Checkbox
                              id="leadNotif"
                              defaultChecked={true}
                            />
                          </div>
                          <div className="ml-3 text-sm">
                            <label htmlFor="leadNotif" className="font-medium text-neutral-700">New Lead Alerts</label>
                            <p className="text-neutral-500">Be notified when new leads are assigned to you</p>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <div className="flex items-center h-5">
                            <Checkbox
                              id="taskNotif"
                              defaultChecked={true}
                            />
                          </div>
                          <div className="ml-3 text-sm">
                            <label htmlFor="taskNotif" className="font-medium text-neutral-700">Task Reminders</label>
                            <p className="text-neutral-500">Receive reminders for upcoming tasks and deadlines</p>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <div className="flex items-center h-5">
                            <Checkbox
                              id="marketingNotif"
                              defaultChecked={false}
                            />
                          </div>
                          <div className="ml-3 text-sm">
                            <label htmlFor="marketingNotif" className="font-medium text-neutral-700">Marketing Updates</label>
                            <p className="text-neutral-500">Receive news about product updates and features</p>
                          </div>
                        </div>
                      </div>
                      <div className="mt-6">
                        <Button
                          type="submit"
                          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                        >
                          Save Preferences
                        </Button>
                      </div>
                    </form>
                  </div>
                )}

                {/* Integrations */}
                {activeTab === "integrations" && (
                  <div>
                    <h3 className="text-lg font-medium mb-4">Integrations</h3>
                    <div className="space-y-6">
                      <div className="border rounded-lg p-4 flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="h-10 w-10 rounded-full bg-neutral-100 flex items-center justify-center">
                            <span className="material-icons">mail</span>
                          </div>
                          <div className="ml-3">
                            <h4 className="text-sm font-medium">Gmail</h4>
                            <p className="text-xs text-neutral-500">Sync your email for lead communication</p>
                          </div>
                        </div>
                        <Button 
                          variant="outline"
                          onClick={() => toast({ title: "Gmail Integration", description: "Gmail integration setup would start here" })}
                        >
                          Connect
                        </Button>
                      </div>
                      <div className="border rounded-lg p-4 flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="h-10 w-10 rounded-full bg-neutral-100 flex items-center justify-center">
                            <span className="material-icons">today</span>
                          </div>
                          <div className="ml-3">
                            <h4 className="text-sm font-medium">Google Calendar</h4>
                            <p className="text-xs text-neutral-500">Sync your calendar for meetings and calls</p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <span className="text-xs text-success-500 mr-2">Connected</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-neutral-400 hover:text-neutral-500"
                            onClick={() => toast({ title: "Calendar Disconnected", description: "Google Calendar has been disconnected" })}
                          >
                            <span className="material-icons text-sm">close</span>
                          </Button>
                        </div>
                      </div>
                      <div className="border rounded-lg p-4 flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="h-10 w-10 rounded-full bg-neutral-100 flex items-center justify-center">
                            <span className="material-icons">call</span>
                          </div>
                          <div className="ml-3">
                            <h4 className="text-sm font-medium">VoIP Phone System</h4>
                            <p className="text-xs text-neutral-500">Connect to make calls directly from the CRM</p>
                          </div>
                        </div>
                        <Button 
                          variant="outline"
                          onClick={() => toast({ title: "VoIP Integration", description: "VoIP system integration setup would start here" })}
                        >
                          Connect
                        </Button>
                      </div>
                      <div className="border rounded-lg p-4 flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="h-10 w-10 rounded-full bg-neutral-100 flex items-center justify-center">
                            <span className="material-icons">question_answer</span>
                          </div>
                          <div className="ml-3">
                            <h4 className="text-sm font-medium">Chat Integration</h4>
                            <p className="text-xs text-neutral-500">Connect your website chat for lead generation</p>
                          </div>
                        </div>
                        <Button 
                          variant="outline"
                          onClick={() => toast({ title: "Chat Integration", description: "Chat system integration setup would start here" })}
                        >
                          Connect
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}