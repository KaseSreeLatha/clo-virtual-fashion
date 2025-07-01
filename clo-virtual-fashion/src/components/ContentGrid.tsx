import { useEffect, useState } from "react";
import ContentCard from "./ContentCard";
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

  return (
    <div className="mt-4 text-white">
      <h2 className="text-lg font-semibold text-green-400 flex items-center space-x-2">
        <span className="w-5 h-5 bg-green-500 rounded-full inline-flex items-center justify-center text-black text-sm font-semibold">
          2
        </span>
        <span>Contents List</span>
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 mt-2 p-2 border border-green-500">
        {items.map((item) => (
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
  );
};

export default ContentGrid;
