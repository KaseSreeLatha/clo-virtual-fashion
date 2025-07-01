import { PricingOption } from "../constants";

interface FilterPanelProps {
  selectedFilters: PricingOption[];
  onFilterChange: (option: PricingOption) => void;
  onReset: () => void;
}

const FilterPanel = ({
  selectedFilters = [], 
  onFilterChange,
  onReset,
}: FilterPanelProps) => {
  return (
    <div className="text-white mt-4">
      <div className="mt-2  rounded px-6 py-4 bg-gray-900 flex items-center justify-between flex-wrap gap-y-2">
        <div className="flex items-center gap-6 flex-wrap">
          <span className="text-xs text-white font-medium">Pricing Option</span>

          <label className="flex items-center text-sm">
            <input
              type="checkbox"
              className="mr-2"
              checked={selectedFilters.includes(PricingOption.Paid)}
              onChange={() => onFilterChange(PricingOption.Paid)}
            />
            Paid
          </label>

          <label className="flex items-center text-sm">
            <input
              type="checkbox"
              className="mr-2"
              checked={selectedFilters.includes(PricingOption.Free)}
              onChange={() => onFilterChange(PricingOption.Free)}
            />
            Free
          </label>

          <label className="flex items-center text-sm">
            <input
              type="checkbox"
              className="mr-2"
              checked={selectedFilters.includes(PricingOption.ViewOnly)}
              onChange={() => onFilterChange(PricingOption.ViewOnly)}
            />
            View Only
          </label>
        </div>

        <button
          onClick={onReset}
          className="text-xs font-semibold text-white hover:underline"
        >
          RESET
        </button>
      </div>
    </div>
  );
};

export default FilterPanel;
