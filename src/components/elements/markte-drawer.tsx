import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { X } from "lucide-react";

interface MarketMapDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  pickupMarkets: any[];
}

const MarketMapDrawer = ({
  isOpen,
  onClose,
  pickupMarkets,
}: MarketMapDrawerProps) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredMarkets = pickupMarkets?.filter((market) =>
    market.companyName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const svgIcon = L.divIcon({
    html: `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
        <path fill="#FF0000" d="M12 0C7.31 0 3.5 3.81 3.5 8.5C3.5 14.88 12 24 12 24S20.5 14.88 20.5 8.5C20.5 3.81 16.69 0 12 0ZM12 12C10.07 12 8.5 10.43 8.5 8.5C8.5 6.57 10.07 5 12 5C13.93 5 15.5 6.57 15.5 8.5C15.5 10.43 13.93 12 12 12Z"/>
      </svg>
    `,
    className: "svg-icon",
    iconSize: [24, 24],
    iconAnchor: [12, 24],
  });

  const MarketCard = ({ market }: { market: any }) => {
    console.log(market);
    return (
      <Card className="flex flex-col items-start space-y-2 p-4 mb-4 w-full">
        <div className="flex justify-between items-start w-full">
          <div>
            <p className="text-sm font-semibold">{market.companyName}</p>
            <p className="text-xs text-gray-600">
              {market.streetWithHouseNumber}, {market.zipCode} {market.city}
            </p>
          </div>
        </div>
        <div className="h-[150px] w-full mt-2">
          <MapContainer
            center={[parseFloat(market.latitude), parseFloat(market.longitude)]}
            zoom={15}
            style={{ height: "100%", width: "100%" }}
            scrollWheelZoom={false}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker
              position={[
                parseFloat(market.latitude),
                parseFloat(market.longitude),
              ]}
              icon={svgIcon}
            >
              <Popup>{market.companyName}</Popup>
            </Marker>
          </MapContainer>
        </div>
        <Button className="bg-black text-white text-xs py-1 px-3 w-full mt-2">
          Auswählen
        </Button>
      </Card>
    );
  };

  return (
    <Drawer open={isOpen} onClose={onClose}>
      <DrawerContent className="fixed left-4 bottom-4 w-[500px] h-[800px] rounded-lg shadow-lg bg-white text-foreground overflow-hidden">
        <DrawerHeader className="flex justify-between items-center sticky top-0 bg-white z-10 pb-2">
          <div>
            <DrawerTitle className="text-lg">Märkte finden</DrawerTitle>
            <DrawerDescription className="text-xs">
              Suchen Sie nach Märkten in Ihrer Nähe.
            </DrawerDescription>
          </div>
          <Button
            onClick={onClose}
            variant="ghost"
            size="icon"
            className="h-6 w-6 p-0"
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Schließen</span>
          </Button>
        </DrawerHeader>
        <div className="px-4 py-2 sticky top-[72px] bg-white z-10">
          <Input
            id="market-search"
            type="text"
            placeholder="Märkte suchen"
            className="w-full text-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <DrawerFooter className="flex-grow overflow-y-auto pt-2 px-2">
          <div className="flex flex-col items-center w-full">
            {filteredMarkets?.map((market) => (
              <MarketCard key={market.wwIdent} market={market} />
            ))}
          </div>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default MarketMapDrawer;
