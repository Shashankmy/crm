import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

interface BulkActionsBarProps {
  selectedCount: number;
  onSelectAll: (checked: boolean) => void;
  isAllSelected: boolean;
  isIndeterminate: boolean;
  onAssign: () => void;
  onEdit: () => void;
  onEmail: () => void;
  onCall: () => void;
  onDelete: () => void;
}

export function BulkActionsBar({
  selectedCount,
  onSelectAll,
  isAllSelected,
  isIndeterminate,
  onAssign,
  onEdit,
  onEmail,
  onCall,
  onDelete,
}: BulkActionsBarProps) {
  const isDisabled = selectedCount === 0;

  const handleSelectAllChange = (checked: boolean) => {
    onSelectAll(checked);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 mb-6 border border-neutral-100">
      <div className="flex flex-col sm:flex-row items-center justify-between">
        <div className="flex items-center mb-2 sm:mb-0">
          <Checkbox
            id="select-all"
            checked={isAllSelected}
            className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded"
            onCheckedChange={handleSelectAllChange}
            ref={(input) => {
              if (input) {
                input.indeterminate = isIndeterminate;
              }
            }}
          />
          <label htmlFor="select-all" className="ml-2 block text-sm text-neutral-700">
            Select All
          </label>
          <span className="ml-2 text-sm text-neutral-500">{selectedCount} selected</span>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button
            variant="outline"
            size="sm"
            disabled={isDisabled}
            onClick={onAssign}
            className={`inline-flex items-center px-3 py-1.5 border border-neutral-200 text-sm font-medium rounded ${
              isDisabled
                ? "text-neutral-400 bg-neutral-50 cursor-not-allowed"
                : "text-neutral-700 bg-white hover:bg-neutral-50"
            }`}
          >
            <span className="material-icons text-sm mr-1">assignment</span>
            Assign
          </Button>
          <Button
            variant="outline"
            size="sm"
            disabled={isDisabled}
            onClick={onEdit}
            className={`inline-flex items-center px-3 py-1.5 border border-neutral-200 text-sm font-medium rounded ${
              isDisabled
                ? "text-neutral-400 bg-neutral-50 cursor-not-allowed"
                : "text-neutral-700 bg-white hover:bg-neutral-50"
            }`}
          >
            <span className="material-icons text-sm mr-1">edit</span>
            Edit
          </Button>
          <Button
            variant="outline"
            size="sm"
            disabled={isDisabled}
            onClick={onEmail}
            className={`inline-flex items-center px-3 py-1.5 border border-neutral-200 text-sm font-medium rounded ${
              isDisabled
                ? "text-neutral-400 bg-neutral-50 cursor-not-allowed"
                : "text-neutral-700 bg-white hover:bg-neutral-50"
            }`}
          >
            <span className="material-icons text-sm mr-1">send</span>
            Email
          </Button>
          <Button
            variant="outline"
            size="sm"
            disabled={isDisabled}
            onClick={onCall}
            className={`inline-flex items-center px-3 py-1.5 border border-neutral-200 text-sm font-medium rounded ${
              isDisabled
                ? "text-neutral-400 bg-neutral-50 cursor-not-allowed"
                : "text-neutral-700 bg-white hover:bg-neutral-50"
            }`}
          >
            <span className="material-icons text-sm mr-1">phone</span>
            Call
          </Button>
          <Button
            variant="outline"
            size="sm"
            disabled={isDisabled}
            onClick={onDelete}
            className={`inline-flex items-center px-3 py-1.5 border border-neutral-200 text-sm font-medium rounded ${
              isDisabled
                ? "text-neutral-400 bg-neutral-50 cursor-not-allowed"
                : "text-neutral-700 bg-white hover:bg-neutral-50"
            }`}
          >
            <span className="material-icons text-sm mr-1">delete</span>
            Delete
          </Button>
          <div className="relative inline-block text-left">
            <Button
              variant="outline"
              size="sm"
              disabled={isDisabled}
              className={`inline-flex items-center px-3 py-1.5 border border-neutral-200 text-sm font-medium rounded ${
                isDisabled
                  ? "text-neutral-400 bg-neutral-50 cursor-not-allowed"
                  : "text-neutral-700 bg-white hover:bg-neutral-50"
              }`}
            >
              <span>More</span>
              <span className="material-icons text-sm ml-1">arrow_drop_down</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BulkActionsBar;
