import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDownIcon } from "lucide-react";
import React from "react";

interface productsmallinfoProps {
  title?: string;
  content?: string;
}

export const ProductSmallInfo: React.FC<productsmallinfoProps> = ({
  content,
  title,
}) => {
  return (
    <div>
      <Collapsible className="space-y-4 text-black rounded-md border bg-background p-4 shadow-sm">
        <div className="flex items-center justify-between space-x-4">
          <h3 className="text-lg font-medium">{title}</h3>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="sm">
              <ChevronDownIcon className="h-5 w-5 transition-transform duration-300 [data-state=open]:rotate-180" />
              <span className="sr-only">Toggle</span>
            </Button>
          </CollapsibleTrigger>
        </div>
        <CollapsibleContent className="space-y-2 text-muted-foreground">
          {content}
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};
