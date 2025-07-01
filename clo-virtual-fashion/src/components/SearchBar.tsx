import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";

const SearchBar = () => (
  <div className="relative">
    <input
      type="text"
      placeholder="Find the items you’re looking for"
      className="w-full bg-gray-900 text-white pr-10 pl-4 py-4 rounded-md outline-none placeholder:text-gray-400"
    />
    <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
  </div>
);

export default SearchBar;
