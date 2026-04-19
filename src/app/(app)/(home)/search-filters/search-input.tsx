"use client";

import { useState } from "react";
import { ListFilterIcon, SearchIcon } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { CategoriesSidebar } from "./categories-sidebar";
import { CustomerCategory } from "../types";

interface SearchInputProps {
  disabled?: boolean;
  data: CustomerCategory[];
}

export const SearchInput = ({ disabled, data }: SearchInputProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  return (
    <div className="flex items-center gap-2 w-full">
      <CategoriesSidebar data={data} open={isSidebarOpen} onOpenChange={setIsSidebarOpen}/>
      <div className="relative w-full">
        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-neutral-500" /> <Input className="px-8" placeholder="Search Products" disabled={disabled} />
      </div>
      <Button variant="elevated" className="shrink-0 size-12 flex lg:hidden" onClick={()=> setIsSidebarOpen(true)}>
<ListFilterIcon/>
      </Button>
    </div>
  );
};
