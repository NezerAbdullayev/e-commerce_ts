import { FC } from "react";
import { useGetAllCategoryQuery } from "../../../../redux/services/categoryApi";

const Categories: FC = () => {
    const { data: CategoryData } = useGetAllCategoryQuery();
    console.log(CategoryData);
    return <div>Categories</div>;
};

export default Categories;
