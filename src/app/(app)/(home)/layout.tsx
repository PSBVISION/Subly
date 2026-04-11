import { Category } from '@/payload-types';
import configPromise from '@payload-config'
import { getPayload } from 'payload'

import { Footer } from "./footer";
import { Navbar } from "./navbar";
import { SearchFilters } from "./search-filters";
import { CustomerCategory } from './types';

interface Props {
  children: React.ReactNode;
}

const layout = async ({ children }: Props) => {
  const payload = await getPayload({
      config: configPromise,
    })
    const data = await payload.find({
      collection: "categories",
      depth:1, //populate sub-categories
      pagination: false, //get all categories without pagination
      where:{
        parent:{
          exists:false,
        }
      },
      sort:"name"
    })

    const formattedData: CustomerCategory[] = data.docs.map((doc) => ({
      ...doc,
      subcategories:(doc.subcategories?.docs ?? []).map((doc)=>({
        //Because of the depth:1, the subcategories are populated as well, so we can directly map them to the Category type
        ...(doc as Category),
        subcategories:undefined,
      }))
    }))

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <SearchFilters data={formattedData} />
      <div className="flex-1 bg-[#f4f4f0]">{children}</div>
      <Footer />
    </div>
  );
};

export default layout;
