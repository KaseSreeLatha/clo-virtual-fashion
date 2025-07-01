import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";

interface SearchBarProps {
  search: string;
  onSearchChange: (value: string) => void;
}

const SearchBar = ({ search, onSearchChange }: SearchBarProps) => (
  <div className="relative">
    <input
      type="text"
      value={search}
      onChange={(e) => onSearchChange(e.target.value)}
      placeholder="Find the items you’re looking for"
      className="w-full bg-neutral-800 px-5 py-4 rounded-md outline-none text-gray-400"
    />
    <MagnifyingGlassIcon className="h-5 w-5 text-white absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
  </div>
);

export default SearchBar;
