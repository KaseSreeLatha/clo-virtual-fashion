import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ContentCard from "./ContentCard";
import FilterPanel from "./FilterPanel";
import { PricingOption } from "../constants";

interface ApiItem {
  id: string;
  creator: string;
  title: string;
  pricingOption: PricingOption;
  imagePath: string;
  price?: number;
}

const ContentGrid = () => {
  const [items, setItems] = useState<ApiItem[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();

  // 🟢 Step 3.1: Read filters from query
  const initialFilters = searchParams.get("filters")
    ?.split(",")
    .map((val) => parseInt(val, 10) as PricingOption)
    .filter((val) => !isNaN(val)) || [];

  const [selectedFilters, setSelectedFilters] = useState<PricingOption[]>(initialFilters);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("https://closet-recruiting-api.azurewebsites.net/api/data");
        const data = await res.json();
        setItems(data);
      } catch (err) {
        console.error("Failed to fetch content data", err);
      }
    };

    fetchData();
  }, []);

  // 🟢 Step 3.2: Update query param when filters change
  useEffect(() => {
    if (selectedFilters.length > 0) {
      setSearchParams({ filters: selectedFilters.join(",") });
    } else {
      setSearchParams({});
    }
  }, [selectedFilters, setSearchParams]);

  const handleFilterChange = (option: PricingOption) => {
    setSelectedFilters((prev) =>
      prev.includes(option)
        ? prev.filter((f) => f !== option)
        : [...prev, option]
    );
  };

  const handleReset = () => {
    setSelectedFilters([]);
  };

  const filteredItems =
    selectedFilters.length === 0
      ? items
      : items.filter((item) => selectedFilters.includes(item.pricingOption));

  return (
    <>
      <FilterPanel
        selectedFilters={selectedFilters}
        onFilterChange={handleFilterChange}
        onReset={handleReset}
      />

      <div className="mt-4 text-white">
        <h2 className="text-lg font-semibold text-green-400 flex items-center space-x-2">
          <span className="w-5 h-5 bg-green-500 rounded-full inline-flex items-center justify-center text-black text-sm font-semibold">
            2
          </span>
          <span>Contents List</span>
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 mt-2 p-2 border border-green-500">
          {filteredItems.map((item) => (
            <ContentCard
              key={item.id}
              title={item.title}
              author={item.creator}
              pricingOption={item.pricingOption}
              price={item.price}
              imageUrl={item.imagePath}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default ContentGrid;
