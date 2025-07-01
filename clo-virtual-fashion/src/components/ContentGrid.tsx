import { useEffect, useState, useRef, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import ContentCard from "./ContentCard";
import FilterPanel from "./FilterPanel";
import SearchBar from "./SearchBar";
import SortDropdown from "./SortDropdown";
import ContentSkeleton from "./ContentSkeleton";
import { PricingOption } from "../constants";

interface ApiItem {
  id: string;
  creator: string;
  title: string;
  pricingOption: PricingOption;
  imagePath: string;
  price?: number;
}

const ITEMS_PER_PAGE = 12;

const ContentGrid = () => {
  const [allItems, setAllItems] = useState<ApiItem[]>([]);
  const [visibleItems, setVisibleItems] = useState<ApiItem[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const observerRef = useRef<HTMLDivElement | null>(null);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const [priceRange, setPriceRange] = useState<[number, number]>([0, 999]);

  const initialFilters = searchParams.get("filters")
    ?.split(",")
    .map((val) => parseInt(val, 10) as PricingOption)
    .filter((val) => !isNaN(val)) || [];

  const initialSearch = searchParams.get("search") || "";
  const initialSort = searchParams.get("sort") || "name";

  const [selectedFilters, setSelectedFilters] = useState<PricingOption[]>(initialFilters);
  const [searchKeyword, setSearchKeyword] = useState(initialSearch);
  const [sortOption, setSortOption] = useState(initialSort);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await fetch("https://closet-recruiting-api.azurewebsites.net/api/data");
        const data = await res.json();
        setAllItems(data);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch content data", err);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const query: any = {};
    if (selectedFilters.length > 0) query.filters = selectedFilters.join(",");
    if (searchKeyword.trim()) query.search = searchKeyword.trim();
    if (sortOption !== "name") query.sort = sortOption;
    setSearchParams(query);
    setPage(1);
  }, [selectedFilters, searchKeyword, sortOption, setSearchParams]);

  const filteredItems = allItems
    .filter((item) => {
      const matchesFilter =
        selectedFilters.length === 0 || selectedFilters.includes(item.pricingOption);

      const matchesSearch =
        searchKeyword.trim() === "" ||
        item.title.toLowerCase().includes(searchKeyword.toLowerCase()) ||
        item.creator.toLowerCase().includes(searchKeyword.toLowerCase());

      const matchesPriceRange = (() => {
        if (item.pricingOption === PricingOption.Paid) {
          if (!selectedFilters.includes(PricingOption.Paid)) return true;
          if (item.price === undefined) return false;
          if (priceRange[1] === 999) {
            return item.price >= priceRange[0];
          }
          return item.price >= priceRange[0] && item.price <= priceRange[1];
        }
        return true; 
      })();

      return matchesFilter && matchesSearch && matchesPriceRange;
    })
    .sort((a, b) => {
      if (sortOption === "high") {
        const aPrice = a.price ?? 0;
        const bPrice = b.price ?? 0;
        if (a.pricingOption === PricingOption.Paid && b.pricingOption === PricingOption.Paid) {
          return bPrice - aPrice;
        }
        if (a.pricingOption === PricingOption.Paid) return -1;
        if (b.pricingOption === PricingOption.Paid) return 1;
        return a.pricingOption - b.pricingOption;
      }

      if (sortOption === "low") {
        const aPrice = a.price ?? 0;
        const bPrice = b.price ?? 0;
        if (a.pricingOption === PricingOption.Paid && b.pricingOption === PricingOption.Paid) {
          return aPrice - bPrice;
        }
        if (a.pricingOption === PricingOption.Paid) return -1;
        if (b.pricingOption === PricingOption.Paid) return 1;
        return a.pricingOption - b.pricingOption;
      }

      return a.title.localeCompare(b.title);
    });

  useEffect(() => {
    const start = 0;
    const end = page * ITEMS_PER_PAGE;
    setVisibleItems(filteredItems.slice(start, end));
  }, [filteredItems, page]);

  const handleObserver = useCallback((entries: IntersectionObserverEntry[]) => {
    const target = entries[0];
    if (target.isIntersecting && visibleItems.length < filteredItems.length) {
      setPage((prev) => prev + 1);
    }
  }, [visibleItems.length, filteredItems.length]);

  useEffect(() => {
    const option = { root: null, rootMargin: "100px", threshold: 0.1 };
    const observer = new IntersectionObserver(handleObserver, option);
    if (observerRef.current) observer.observe(observerRef.current);
    return () => observer.disconnect();
  }, [handleObserver]);

  const handleFilterChange = (option: PricingOption) => {
    setSelectedFilters((prev) =>
      prev.includes(option) ? prev.filter((f) => f !== option) : [...prev, option]
    );
  };

  const handleReset = () => {
    setSelectedFilters([]);
    setSearchKeyword("");
    setPriceRange([0, 999]);
    setSortOption("name");
  };

  return (
    <>
      <SearchBar search={searchKeyword} onSearchChange={setSearchKeyword} />

      <FilterPanel
        selectedFilters={selectedFilters}
        onFilterChange={handleFilterChange}
        onReset={handleReset}
        onPriceRangeChange={setPriceRange}
      />

      <SortDropdown sortOption={sortOption} onSortChange={setSortOption} />

      <div className="mt-4">
        <div className="mt-6 p-2 min-h-[200px]">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
              {Array.from({ length: 8 }).map((_, index) => (
                <ContentSkeleton key={index} />
              ))}
            </div>
          ) : visibleItems.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
              {visibleItems.map((item) => (
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
          ) : (
            <div className="text-center text-gray-400 py-10 text-sm">
              No matching content found.
            </div>
          )}
        </div>

        <div ref={observerRef} className="h-10" />
      </div>
    </>
  );
};

export default ContentGrid;
