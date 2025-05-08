import { Button } from "@/components/ui/button";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
}

export function PageHeader({ title, subtitle }: PageHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
      <div>
        <h1 className="text-2xl font-semibold text-neutral-800">{title}</h1>
        {subtitle && <p className="mt-1 text-sm text-neutral-500">{subtitle}</p>}
      </div>
      <div className="mt-4 md:mt-0 flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-3">
        <Button className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-primary-500 rounded-md shadow-sm hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
          <span className="material-icons text-sm mr-2">add</span>
          Add New Lead
        </Button>
        <Button variant="outline" className="inline-flex items-center px-4 py-2 text-sm font-medium text-neutral-700 bg-white rounded-md border border-neutral-300 shadow-sm hover:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
          <span className="material-icons text-sm mr-2">filter_list</span>
          Filter
        </Button>
        <Button variant="outline" className="inline-flex items-center px-4 py-2 text-sm font-medium text-neutral-700 bg-white rounded-md border border-neutral-300 shadow-sm hover:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
          <span className="material-icons text-sm mr-2">download</span>
          Export
        </Button>
      </div>
    </div>
  );
}

export default PageHeader;
