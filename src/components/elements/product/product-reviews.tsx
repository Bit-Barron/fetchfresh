import React from 'react';
import { StarIcon } from "lucide-react";

const CustomerReviews: React.FC = () => (
  <div className="grid gap-2">
    <h3 className="text-lg font-semibold md:text-xl">Kundenbewertungen</h3>
    <div className="grid gap-4">
      <div className="grid gap-2">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-0.5">
            <StarIcon className="fill-primary h-5 w-5" />
            <span className="text-sm">4.5</span>
          </div>
        </div>
        <p className="text-sm">Tolles Produkt!</p>
      </div>
    </div>
  </div>
);

export default CustomerReviews;