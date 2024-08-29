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
    <div className="w-64 bg-white items-center flex flex-col shadow-xl">
      <div className="rounded-md">
        <img
          src={imageUrl}
          alt="product"
          className="w-full h-40 object-cover"
        />
      </div>
      <div className="p-4">
        <h1 className="text-xl font-semibold">{name}</h1>
        <p className="text-gray-500">{address}</p>
        <p className="text-gray-500">
          {rating} {""} {`(${userRatingsTotal})`}
        </p>
        <p className="text-gray-500">
          {openingHours.openNow ? "Open" : "Closed"}
        </p>
      </div>
    </div>
  );
};

export default ProductCard;
