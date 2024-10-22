import { useEffect, useCallback, FC } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { debounce } from "lodash";
import { validationSchema } from "../../validations/filter.validation";

const FilterForm: FC = () => {
    // Validation schema
    // const validationSchema = Yup.object().shape({
    //     search: Yup.string(),
    //     rating: Yup.number().min(0).max(5, "Rating must be between 0 and 5"),
    //     price: Yup.number().positive("Price must be positive"),
    //     category: Yup.string(),
    // });
    const {
        register,
        watch,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(validationSchema),
        defaultValues: {
            search: "",
            rating: "",
            price: "",
            category: "",
        },
    });

    // Watch form fields
    const watchFields = watch(["search", "rating", "price", "category"]);

    // Debounced function for search
    const debouncedSearch = useCallback(
        debounce((searchTerm) => {
            // Simulate API call with the search term
            console.log("Debounced Search Query: ", searchTerm);
            // fetchFilteredResults({ search: searchTerm, rating: watchFields[1], price: watchFields[2], category: watchFields[3] });
        }, 500), // 500ms debounce
        [],
    );

    useEffect(() => {
        // Only debounce the search field
        const filterData = {
            search: watchFields[0],
            rating: watchFields[1],
            price: watchFields[2],
            category: watchFields[3],
        };

        // Debounce only the search input
        debouncedSearch(filterData.search);

        // Call your API or update state with other fields instantly if needed
        console.log("Rating, Price, and Category: ", filterData.rating, filterData.price, filterData.category);
    }, [watchFields]); // Listen for changes in all fields

    return (
        <form>
            <div>
                <label>Search:</label>
                <input type="text" {...register("search")} />
                {errors.search && <p>{errors.search.message}</p>}
            </div>

            <div>
                <label>Rating:</label>
                <input type="number" {...register("rating")} />
                {errors.rating && <p>{errors.rating.message}</p>}
            </div>

            <div>
                <label>Price:</label>
                <input type="number" {...register("price")} />
                {errors.price && <p>{errors.price.message}</p>}
            </div>

            <div>
                <label>Category:</label>
                <select {...register("category")}>
                    <option value="">Select...</option>
                    <option value="electronics">Electronics</option>
                    <option value="fashion">Fashion</option>
                    {/* More options */}
                </select>
                {errors.category && <p>{errors.category.message}</p>}
            </div>
        </form>
    );
};

export default FilterForm;
