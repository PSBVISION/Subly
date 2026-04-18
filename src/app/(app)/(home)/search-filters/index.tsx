import { CustomerCategory } from "../types";
import { Categories } from "./categories";
import { SearchInput } from "./search-input";

interface SearchFiltersProps {
  data: CustomerCategory[];
}

export const SearchFilters = ({ data }: SearchFiltersProps) => {
  return (
    <div className="px-4 lg:px-12 py-8 border-b flex flex-col gap-4 w-full">
      <SearchInput />
      <div className="hidden lg:block">
      <Categories data={data} />
      </div>
    </div>
  );
};
