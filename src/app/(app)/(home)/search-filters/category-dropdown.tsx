"use client";
import { useRef, useState } from "react";

import { cn } from "@/lib/utils";
import { Category } from "@/payload-types";
import { Button } from "@/components/ui/button";
import { useDropdownPosition } from "./use-dropdown-position";

interface CategoryProps {
  category: Category;
  isActive?: boolean;
  isNavigationHovered?: boolean;
}

export const CategoryDropdown = ({
  category,
  isActive,
  isNavigationHovered,
}: CategoryProps) => {
   const [isOpen, setIsOpen]=useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { getDropdownPosition } = useDropdownPosition(dropdownRef);

  const onMouseEnter =()=>{
    if(category.subcategories){
      setIsOpen(true);
    }
  }
  const onMouseLeave =()=>{
    setIsOpen(false);
  }
  return (
    <div className="relative" ref={dropdownRef} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      <div className="relative">
    <Button
    variant="elevated"
    className={cn(
      "h-11 px-4 bg-transparent border-transparent rounded-full hover:bg-white hover:border-primary text-black",
      isActive && !isNavigationHovered && "bg-white border-primary",
    )}
    >
      {category.name}
    </Button>
    {category.subcategories && category.subcategories.length>0 && (
      <div className={cn("opacity-0 absolute -bottom-3 w-0 h-0 border-l-10  border-r-10 border-b-10 border-l=transparent border-b-block left-1/2 -translate-x-1/2", isOpen && "opacity-100")}></div>
    )}
      </div>
    </div>
  );
};
