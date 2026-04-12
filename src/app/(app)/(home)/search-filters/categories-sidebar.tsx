import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";

import { CustomerCategory } from "../types";

interface CategoriesSidebarProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  data: CustomerCategory[]; //TODO: remove this later
}

export const CategoriesSidebar = ({
  open,
  onOpenChange,
  data,
}: CategoriesSidebarProps) => {
  const router = useRouter();

  const [parentCategories, setParentCategories] = useState<
    CustomerCategory[] | null
  >(null);
  const [selectedCategory, setSelectedCategory] =
    useState<CustomerCategory | null>(null);

  //if we have parent categories, show those, otherwise show root categories
  const currentCategories = parentCategories ?? data ?? [];

  const handleOpenChange = (open: boolean) => {
    setSelectedCategory(null);
    setParentCategories(null);
    onOpenChange(open);
  }

  const handleCategoryClick = (category: CustomerCategory) => {
    if (category.subcategories && category.subcategories.length > 0) {
      setParentCategories(category.subcategories as CustomerCategory[]);
      setSelectedCategory(category);
    } else {
      //this is a leaf category not a subcategory
      if (parentCategories && selectedCategory) {
        //this is a subcategory, we need to navigate to the /category/subcategory page
        router.push(`/${selectedCategory.slug}/${category.slug}`);
      } else {
        //This is a main a category, we need to navigate to the /category page
        if ((category.slug = "all")) {
          router.push(`/`);
        } else {
          router.push(`/${category.slug}`);
        }
      }
      handleOpenChange(false);
    }
  };

  const backgroundColor = selectedCategory?.color || "white";
  return (
    <Sheet open={open} onOpenChange={handleOpenChange}>
      <SheetContent
        side="left"
        className="p-0 transition-none"
        style={{ backgroundColor: "white" }}
      >
        <SheetHeader className="p-4 border-b">
          <SheetTitle>Categories</SheetTitle>
        </SheetHeader>
        <ScrollArea className="flex flex-col overflow-y-auto h-full pb-2">
          {parentCategories && (
            <button
              onClick={() => {}}
              className="w-full text-left p-4 hover:bg-black cursor-pointer hover:text-white flex items-center text-base font-medium"
            >
              <ChevronLeftIcon className="size-4 mr-2" /> Back
            </button>
          )}
          {currentCategories.map((category) => (
            <button
              onClick={() => handleCategoryClick(category)}
              key={category.slug}
              className="w-full text-left p-4 hover:bg-black cursor-pointer hover:text-white flex items-center justify-between text-base font-medium"
            >
              {category.name}
              {category.subcategories && category.subcategories.length > 0 && (
                <ChevronRightIcon className="size-4" />
              )}
            </button>
          ))}
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};
