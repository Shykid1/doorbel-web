// CategoryCard.tsx
import React from "react";

interface CategoryCardProps {
  title: string;
  imageUrl: string;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ title, imageUrl }) => {
  return (
    <div className="p-4 bg-white shadow-md rounded-md flex-shrink-0 lg:w-48 h-32 w-40">
      <img
        src={imageUrl}
        alt={title}
        className="w-full h-20 object-cover rounded-t-md"
      />
      <h2 className="mt-2 text-lg font-semibold text-center">{title}</h2>
    </div>
  );
};

export default CategoryCard;
