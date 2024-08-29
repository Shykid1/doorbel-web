import React from "react";

interface ProductCardProps {
  name: string;
  imageUrl: string;
  address: string;
  userRatingsTotal: number;
  rating: number;
  openingHours: {
    openNow: boolean;
  };
}

const ProductCard: React.FC<ProductCardProps> = ({
  name,
  imageUrl,
  address,
  userRatingsTotal,
  rating,
  openingHours,
}) => {
  return (
    <div className="w-64 h-[332px] bg-white items-center flex flex-col shadow-xl rounded-md">
      <div className="rounded-md">
        <img
          src={imageUrl}
          alt="product"
          className="w-full h-40 object-cover rounded-md"
        />
      </div>
      <div className="p-4 gap-1">
        <h1 className="text-lg font-semibold text-center">{name}</h1>
        <p className="text-gray-500 text-sm">{address}</p>
        <p className="text-gray-500 text-sm">
          {rating} {"⭐"} {""} {`(${userRatingsTotal})`}
        </p>
        <p className="text-gray-500 text-sm">
          {openingHours.openNow ? "Open" : "Closed"}
        </p>
      </div>
    </div>
  );
};

export default ProductCard;
