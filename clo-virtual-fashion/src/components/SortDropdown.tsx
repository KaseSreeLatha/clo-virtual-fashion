import { ChevronDownIcon } from "@heroicons/react/24/solid";

interface SortDropdownProps {
  sortOption: string;
  onSortChange: (value: string) => void;
}

const SortDropdown = ({ sortOption, onSortChange }: SortDropdownProps) => {
  return (
    <div className="flex justify-end mt-4">
      <div className="flex items-center space-x-6">
        <span className="text-sm text-white font-medium">Sort By</span>
        <div className="relative inline-block">
          <select
            value={sortOption}
            onChange={(e) => onSortChange(e.target.value)}
            className="text-white border-b border-white bg-neutral-900 text-sm py-2 px-2 appearance-none focus:outline-none min-w-[200px] focus:bg-neutral-900 hover:bg-neutral-900"
          >
            <option value="name" className="bg-neutral-900 text-white">Item Name</option>
            <option value="high" className="bg-neutral-900 text-white">Higher Price</option>
            <option value="low" className="bg-neutral-900 text-white">Lower Price</option>
          </select>
          <ChevronDownIcon className="h-4 w-4 text-white absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
        </div>
      </div>
    </div>
  );
};

export default SortDropdown;
