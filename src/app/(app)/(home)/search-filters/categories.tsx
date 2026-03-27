import { Category } from "@/payload-types";
import { CategoryDropdown } from "./category-dropdown";

interface categoriesProps {
  data: any;
}

export const Categories = ({ data }: categoriesProps) => {
  return (
    <div>{data.map((category: Category)=>(
      <div className="" key={category.id}>
        <CategoryDropdown category={category} isActive={false} isNavigationHovered={false} />
      </div>
    ))}</div>
  )
}
