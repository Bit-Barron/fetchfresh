import React, { useState } from "react";
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
import Image from "next/image";
import { useRouter } from "next/navigation";
import MarketMap from "./market-map";

interface MarketDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  pickupMarkets: any[];
}

export default function MarketDrawer({
  isOpen,
  onClose,
  pickupMarkets,
}: MarketDrawerProps) {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredMarkets = pickupMarkets?.filter((market) =>
    market.companyName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Drawer open={isOpen} onClose={onClose}>
      <DrawerContent className="md:w-[500px] md:h-[800px] fixed bottom-4 left-4 rounded-lg shadow-lg bg-white text-foreground">
        <DrawerHeader>
          <DrawerTitle>Find Markets</DrawerTitle>
          <DrawerDescription>Search for markets near you.</DrawerDescription>
        </DrawerHeader>
        <div className="px-4 py-2">
          <Input
            id="market-search"
            type="text"
            placeholder="Search markets"
            className="w-full mb-2"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <DrawerFooter className="flex-grow overflow-y-auto">
          <div className="grid grid-cols-1 gap-4">
            {filteredMarkets?.map((market) => {
              console.log(market);
              return (
                <Card
                  key={market.wwIdent}
                  className="flex flex-col items-center space-y-2 p-2"
                >
                  {/* {market.imageUrl ? (
                    <Image
                      src={market.imageUrl}
                      width={100}
                      height={100}
                      alt={market.name}
                    />
                  ) : (
                    <div>No image</div>
                  )} */}

                  <p className="text-xs text-gray-600">{market.companyName}</p>
                  <p className="text-xs text-gray-600">
                    {market.streetWithHouseNumber}, {market.zipCode}{" "}
                    {market.city}
                  </p>
                  <Button
                    className="bg-black text-white w-full text-xs py-1"
                    onClick={() =>
                      router.push(`/store/${market.slug}/storefront`)
                    }
                  >
                    Select
                  </Button>
                  <MarketMap
                    latitude={market.latitude}
                    longitude={market.longitude}
                    name={market.displayName}
                  />
                </Card>
              );
            })}
          </div>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
