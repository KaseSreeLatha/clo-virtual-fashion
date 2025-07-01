import { Range } from "react-range";
import { useEffect, useState } from "react";
import { PricingOption } from "../constants";

interface FilterPanelProps {
  selectedFilters: PricingOption[];
  onFilterChange: (option: PricingOption) => void;
  onReset: () => void;
  onPriceRangeChange?: (range: [number, number]) => void;
}

const MIN = 0;
const MAX = 999;
const MIN_DISTANCE = 10;

const FilterPanel = ({
  selectedFilters = [],
  onFilterChange,
  onReset,
  onPriceRangeChange,
}: FilterPanelProps) => {
  const [rangeValues, setRangeValues] = useState<[number, number]>([MIN, MAX]);
  const isPaidSelected = selectedFilters.includes(PricingOption.Paid);

  useEffect(() => {
    if (isPaidSelected && onPriceRangeChange) {
      onPriceRangeChange(rangeValues);
    }
  }, [rangeValues, isPaidSelected, onPriceRangeChange]);

  return (
    <div className="text-gray-400 mt-4">
      <style>
        {`
        input[type="checkbox"].peer:checked::after {
        content: '✓';
        position: absolute;
        top: -2px;
        left: 2px;
        font-size: 12px;
        color: white;
      }`}
      </style>
      <div className="rounded px-5 py-4 bg-neutral-950 flex items-center justify-between flex-wrap gap-y-2">
        <div className="flex items-center gap-6 flex-wrap">
          <span className="text-xs font-medium">Pricing Option</span>

          <label className="flex items-center text-sm">
            <input
              type="checkbox"
              className="peer mr-2 w-4 h-4 appearance-none border bg-neutral-700 rounded-sm 
               checked:bg-neutral-800 relative"
              checked={selectedFilters.includes(PricingOption.Paid)}
              onChange={() => onFilterChange(PricingOption.Paid)}
            />
            Paid
          </label>

          <label className="flex items-center text-sm">
            <input
              type="checkbox"
              className="peer mr-2 w-4 h-4 appearance-none border bg-neutral-700 rounded-sm 
               checked:bg-neutral-800 relative"
              checked={selectedFilters.includes(PricingOption.Free)}
              onChange={() => onFilterChange(PricingOption.Free)}
            />
            Free
          </label>

          <label className="flex items-center text-sm">
            <input
              type="checkbox"
              className="peer mr-2 w-4 h-4 appearance-none border bg-neutral-700 rounded-sm 
               checked:bg-neutral-800 relative"
              checked={selectedFilters.includes(PricingOption.ViewOnly)}
              onChange={() => onFilterChange(PricingOption.ViewOnly)}
            />
            View Only
          </label>

          <div
            className={`ml-4 flex items-center gap-4 ${isPaidSelected ? "opacity-100" : "opacity-50 pointer-events-none"
              }`}
          >
            <span className="text-xs w-10 text-right">${rangeValues[0]}</span>

            <Range
              step={1}
              min={MIN}
              max={MAX}
              values={rangeValues}
              onChange={(values) => {
                const [minVal, maxVal] = values;
                if (maxVal - minVal >= MIN_DISTANCE) {
                  setRangeValues([minVal, maxVal]);
                }
              }}
              renderTrack={({ props, children }) => (
                <div
                  {...props}
                  className="w-40 h-1 bg-cyan-800 rounded relative"
                >
                  {children}
                </div>
              )}
              renderThumb={({ props }) => (
                <div
                  {...props}
                  className="h-4 w-4 bg-white rounded-full border border-gray-300 shadow"
                />
              )}
            />

            <span className="text-xs w-12 text-left">
              {rangeValues[1] === MAX ? "$999+" : `$${rangeValues[1]}`}
            </span>
          </div>
        </div>

        <button
          onClick={onReset}
          className="text-xs font-semibold cursor-pointer hover:text-white"
        >
          RESET
        </button>
      </div>
    </div>
  );
};

export default FilterPanel;
