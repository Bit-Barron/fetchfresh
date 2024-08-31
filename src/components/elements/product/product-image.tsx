import React from "react";
import Image from "next/image";

interface ProductImageProps {
  imageURL?: string;
  title: string;
}

const ProductImage: React.FC<ProductImageProps> = ({ imageURL, title }) =>
  imageURL ? (
    <div className="lg:64 relative h-32 w-full overflow-hidden md:h-64">
      <Image
        src={imageURL}
        alt={title}
        layout="fill"
        objectFit="cover"
        className="object-cover"
      />
    </div>
  ) : (
    <div className="flex items-center justify-center bg-gray-200 text-gray-600">
      Kein Bild verfügbar
    </div>
  );

export default ProductImage;
