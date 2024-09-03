import React from "react";
import { CheckIcon } from "lucide-react";

interface ProductAttributes {
  isOrganic?: boolean;
  isVegan?: boolean;
  isVegetarian?: boolean;
  isDairyFree?: boolean;
  isGlutenFree?: boolean;
  isRegional?: boolean;
  [key: string]: boolean | undefined;
}

interface ProductSpecificationsProps {
  product: {
    attributes?: ProductAttributes;
  };
}

const ProductSpecifications: React.FC<ProductSpecificationsProps> = ({
  product,
}) => {
  const attributes = product.attributes || {};

  return (
    <div className="grid mt-6">
      <h3 className="text-lg font-semibold md:text-xl">Spezifikationen</h3>
      <ul className="text-muted-foreground grid gap-1">
        {[
          { key: "isOrganic", label: "Bio" },
          { key: "isVegan", label: "Vegan" },
          { key: "isVegetarian", label: "Vegetarisch" },
          { key: "isDairyFree", label: "Lactosefrei" },
          { key: "isGlutenFree", label: "Glutenfrei" },
          { key: "isRegional", label: "Regional" },
        ].map(({ key, label }) => (
          <li key={key}>
            <CheckIcon className="mr-2 inline h-4 w-4" />
            {attributes[key] ? label : `Nicht ${label}`}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductSpecifications;
