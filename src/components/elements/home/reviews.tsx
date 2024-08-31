/* eslint-disable react/no-unescaped-entities */

import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import { StarIcon } from "lucide-react";
import React from "react";
import { Card } from "../../ui/card";

interface reviewsProps {}

export const Reviews: React.FC<reviewsProps> = ({}) => {
  return (
    <section className="w-full max-w-7xl">
      <h2 className="text-center text-2xl font-bold">Bewertungen</h2>
      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="p-4">
          <div className="flex items-center space-x-4">
            <Avatar>
              <AvatarImage src="/placeholder-user.jpg" alt="Benutzer 1" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="text-lg font-semibold">John Doe</h3>
              <div className="flex items-center space-x-2">
                <StarIcon className="h-4 w-4 text-yellow-500" />
                <StarIcon className="h-4 w-4 text-yellow-500" />
                <StarIcon className="h-4 w-4 text-yellow-500" />
                <StarIcon className="h-4 w-4 text-yellow-500" />
                <StarIcon className="h-4 w-4 text-gray-300" />
              </div>
            </div>
          </div>
          <p className="mt-4 text-gray-700">
            "Ich benutze GroceryGo schon seit einiger Zeit und bin wirklich\n
            beeindruckt vom Service. Die Auswahl ist groß, die Lieferung\n ist
            schnell und die Preise sind angemessen. Sehr zu\n empfehlen!"
          </p>
        </Card>
        <Card className="p-4">
          <div className="flex items-center space-x-4">
            <Avatar>
              <AvatarImage src="/placeholder-user.jpg" alt="Benutzerin 2" />
              <AvatarFallback>SA</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="text-lg font-semibold">Sarah Anderson</h3>
              <div className="flex items-center space-x-2">
                <StarIcon className="h-4 w-4 text-yellow-500" />
                <StarIcon className="h-4 w-4 text-yellow-500" />
                <StarIcon className="h-4 w-4 text-yellow-500" />
                <StarIcon className="h-4 w-4 text-yellow-500" />
                <StarIcon className="h-4 w-4 text-gray-300" />
              </div>
            </div>
          </div>
          <p className="mt-4 text-gray-700">
            "Ich liebe die Bequemlichkeit von GroceryGo. Ich kann meine\n
            Lebensmittel direkt vor meine Tür liefern lassen, ohne das\n Haus
            verlassen zu müssen. Die App ist einfach zu bedienen und\n die
            Auswahl ist groß."
          </p>
        </Card>
        <Card className="p-4">
          <div className="flex items-center space-x-4">
            <Avatar>
              <AvatarImage src="/placeholder-user.jpg" alt="Benutzer 3" />
              <AvatarFallback>MJ</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="text-lg font-semibold">Michael Johnson</h3>
              <div className="flex items-center space-x-2">
                <StarIcon className="h-4 w-4 text-yellow-500" />
                <StarIcon className="h-4 w-4 text-yellow-500" />
                <StarIcon className="h-4 w-4 text-yellow-500" />
                <StarIcon className="h-4 w-4 text-gray-300" />
                <StarIcon className="h-4 w-4 text-gray-300" />
              </div>
            </div>
          </div>
          <p className="mt-4 text-gray-700">
            "Ich hatte ein paar Probleme mit meinen Bestellungen, aber das\n
            Kundenserviceteam war immer hilfreich bei der Lösung. Ich schätze\n
            ihre Reaktionsfähigkeit und die Bereitschaft, Dinge in Ordnung\n zu
            bringen."
          </p>
        </Card>
      </div>
    </section>
  );
};
