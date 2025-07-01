import { PricingOption } from "../constants";

interface ContentCardProps {
  title: string;
  author: string;
  pricingOption: PricingOption;
  price?: number;
  imageUrl?: string;
}

const ContentCard = ({ title, author, pricingOption, price, imageUrl }: ContentCardProps) => {
  const getDisplayPrice = () => {
    switch (pricingOption) {
      case PricingOption.Paid:
        return `$${price ?? "N/A"}`;
      case PricingOption.Free:
        return <span>FREE</span>;
      case PricingOption.ViewOnly:
        return <span>View Only</span>;
      default:
        return "N/A";
    }
  };

  return (
    <div className="group rounded overflow-hidden shadow hover:shadow-lg transition-all text-white cursor-pointer">
      <div className="aspect-[3/4] flex items-center justify-center overflow-hidden">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={title}
            className="object-cover w-full h-full transform transition-transform duration-300 ease-in-out group-hover:scale-105"
          />
        ) : (
          <div className="text-gray-500">Image</div>
        )}
      </div>

      <div className="px-3 py-2 flex justify-between items-start text-sm">
        <div>
          <p className="font-semibold text-neutral-400">{title}</p>
          <p className="text-gray-400">{author}</p>
        </div>
        <p className="font-semibold">{getDisplayPrice()}</p>
      </div>
    </div>
  );
};

export default ContentCard;
