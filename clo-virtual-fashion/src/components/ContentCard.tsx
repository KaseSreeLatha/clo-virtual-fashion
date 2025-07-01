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
        return <span className="text-white">FREE</span>;
      case PricingOption.ViewOnly:
        return <span className="text-white">View Only</span>;
      default:
        return "N/A";
    }
  };

  return (
    <div className="bg-gray-900 text-white rounded overflow-hidden shadow hover:shadow-lg transition-all">
      <div className="aspect-[3/4] bg-white flex items-center justify-center overflow-hidden">
        {imageUrl ? (
          <img src={imageUrl} alt={title} className="object-cover w-full h-full" />
        ) : (
          <div className="text-gray-500">Image</div>
        )}
      </div>

      <div className="bg-black px-3 py-2 flex justify-between items-start text-sm">
        <div>
          <p className="font-semibold">{title}</p>
          <p className="text-gray-400">{author}</p>
        </div>
        <p className="font-semibold">{getDisplayPrice()}</p>
      </div>
    </div>
  );
};

export default ContentCard;
