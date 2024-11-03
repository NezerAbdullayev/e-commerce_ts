import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
    en: {
        translation: {
            login: "Login",
            signUp: "Sign Up",
            logout: "Logout",
            home: "Home",
            products: "Products",
            unexpectedError: "An unexpected error occurred.",
            dontHaveAccount: "Don't have an account?",
            signUpNow: "Sign up now!",
            signup: "Signup",
            signupSuccessful: "Signup successful!",
            signupFailed: "Signup failed! Please try again.",
            alreadyHaveAccount: "Already have an account?",
            logInNow: "Log in now!",
            store: "Store",
            discoverProducts: "Discover amazing products at unbeatable prices!",
            galery: "Galery",

            //filters
            filters: "filters",
            search: "Search",
            searchProducts: "Search products",
            minimumPrice: "Minimum price",
            minPrice: "min price",
            maximumPrice: "Maximum price",
            maxPrice: "max price",
            categories: "Categories",
            rating: "Rating",

            // productsPagination
            please_log_in: "Please log in to your account or create a new one.",
            product_added_to_favorites: "Product added to the favorite successfully!",
            failed_to_add_favorite: "Failed to add the product to the favorite. Please try again.",
            product_added_to_basket: "Product added to the basket successfully!",
            failed_to_add_basket: "Failed to add the product to the basket. Please try again.",
            error_fetching_products: "An error occurred while fetching the products data.",
            no_products_found: "No products found.",

            // favorites
            confirm_remove_favorite: "Are you sure you want to remove this item from favorites?",
            yes: "Yes",
            no: "No",
            item_removed_from_favorites: "Item removed from favorites successfully!",
            failed_to_remove_item: "Failed to remove item from favorites.",
            confirm_add_to_cart: "Do you want to add this product to the cart?",
            failed_to_add_to_cart: "Failed to add product to cart.",
            favorites_cleared: "Favorites cleared successfully!",
            failed_to_clear_favorites: "Failed to clear favorites. Try again.",
            error_fetching_favorites: "An error occurred while fetching the favorites data.",
            favorites: "Favorites",
            image: "Image",
            name: "Name",
            price: "Price",
            action: "Action",
            product_not_found: "Product not found",
            remove_all_favorites: "Remove All Favorites",

            // cart
            confirm_change_quantity: "Do you want to change the product count?",
            quantity_updated_successfully: "Product quantity updated successfully!",
            failed_to_update_quantity: "Failed to update the product quantity. Please try again.",
            confirm_delete_cart: "Do you want to delete this Cart?",
            cart_item_deleted_successfully: "Cart item deleted successfully!",
            failed_to_delete_cart_item: "Failed to delete the cart item. Please try again.",
            error_fetching_cart_data: "An error occurred while fetching the cart data.",
            product: "Product",
            quantity: "Quantity",
            total_price: "Total Price",
            cart_empty_warning: "Your cart is empty.",

            // details
            error_fetching_details_data: "There was an error fetching the product details.",
            brand: "Brand",
            sellect_img: "Select an image",

            // details -> addtoButtonc
            login_prompt: "Please log in to your account or create a new one.",
            select_image_prompt: "Please select an image",
            product_added_success: "Product added to cart successfully!",
            product_add_failed: "Failed to add product to cart.",
            loading: "Loading...",
            add_to_cart: "Add To Cart",

            // details -> review
            no_review: ">No reviews yet.",

            // addnewreview
            addYourReview: "Add Your Review",
            successfullyAdded: "Review successfully added!",
            failedToAdd: "Failed to add review. Please try again.",
            youMustLogIn: "You must log in to add a comment",
            logIn: "Log In",
            addComment: "Add Comment",

            // admin page
            dashboard: "Dashboard",
            createNewProduct: "Create New Product",
            category: "Category",
            users: "Users",

            // dashboard
            usersProductsDistribution: "Users and Products Distribution",
            totalCategories: "Total Categories",
            totalProducts: "Total Products",
            totalUsers: "Total Users",

            // add new product component
            addNewProduct: "Add new product",
            productCreatedSuccess: "Product created successfully!",
            productCreationFailed: "Failed to create the product. Please try again.",
            categoryNotFound: "Category not found",
            createProduct: "Create Product",

            // details bar
            description: "Description",
            reviews: "Reviews",
            add_review: "Add review",

            // categories
            addCategory: "Add New Category",
            categoryName: "Category name:",
            deleteSuccess: "Category deleted successfully!",
            deleteError: "Failed to delete category. Please try again.",
            createCategory: "Create Category",
            updateCategory: "Update Category",
            errorFetching: "There was an error fetching the categories.",
            edit: "Edit",
            delete: "Delete",

            // table products
            deleteConfirmation: "Do you want to delete this product?",
            editSuccess: "Product updated successfully!",
            editError: "Failed to update the product. Please try again.",
            fetchError: "There was an issue fetching the products. Please try again later.",
            save: "Save",
            editProduct: "Edit Product",
            error_categories: "An error occurred while fetching the categories",
            edit_product: "Edit Product",
            okText: "Update",

            // logo
            change_logo_success_message: "Logo changed successfully!",
            change_logo_fail_message: "Failed to update logo. Please try again.",
            change_logo: "Change logo",
            logo_input_placeholder: "Enter new logo name",
            saving: "Saving",
        },
    },
    az: {
        translation: {
            login: "Daxil ol",
            signUp: "Qeydiyyat",
            logout: "Çıxış",
            home: "Ana səhifə",
            products: "Məhsullar",
            unexpectedError: "Gözlənilməz bir xəta baş verdi.",
            dontHaveAccount: "Hesabınız yoxdur?",
            signUpNow: "İndi qeydiyyatdan keçin!",
            signup: "Qeydiyyat",
            signupSuccessful: "Qeydiyyat uğurlu oldu!",
            signupFailed: "Qeydiyyat uğursuz oldu! Zəhmət olmasa, yenidən cəhd edin.",
            alreadyHaveAccount: "Artıq hesabınız var?",
            logInNow: "İndi daxil olun!",
            store: "Mağaza",
            discoverProducts: "Möhtəşəm məhsulları unikal qiymətlərlə kəşf edin!",
            galery: "Qaleriya",

            // filters
            filters: "Filtirlə",
            search: "Axtar ",
            searchProducts: "Məhsulları axtarın",
            minimumPrice: "Minimum qiymət",
            minPrice: "minimum qiymət",
            maximumPrice: "Maksimum qiymət",
            maxPrice: "maksimum qiymət",
            categories: "Kateqoriyalar",
            rating: "Reytinq",

            // productsPagination
            please_log_in: "Xahiş edirəm, hesabınıza daxil olun və ya yeni birini yaradın.",
            product_added_to_favorites: "Məhsul uğurla sevimlilərə əlavə edildi!",
            failed_to_add_favorite: "Məhsulu sevimlilərə əlavə etmək mümkün olmadı. Xahiş edirəm, yenidən cəhd edin.",
            product_added_to_basket: "Məhsul uğurla səbətə əlavə edildi!",
            failed_to_add_basket: "Məhsulu səbətə əlavə etmək mümkün olmadı. Xahiş edirəm, yenidən cəhd edin.",
            error_fetching_products: "Məhsul məlumatlarını əldə edərkən bir xəta baş verdi.",
            no_products_found: "Heç bir məhsul tapılmadı.",

            // favorites
            confirm_remove_favorite: "Bu əşyayı sevimlilərdən çıxarmaq istəyirsiniz?",
            yes: "Bəli",
            no: "Xeyr",
            item_removed_from_favorites: "Əşya sevimlilərdən uğurla çıxarıldı!",
            failed_to_remove_item: "Əşyayı sevimlilərdən çıxarmaq mümkün olmadı.",
            confirm_add_to_cart: "Bu məhsulu səbətə əlavə etmək istəyirsiniz?",
            failed_to_add_to_cart: "Məhsulu səbətə əlavə etmək mümkün olmadı.",
            favorites_cleared: "Sevimlilər uğurla silindi!",
            failed_to_clear_favorites: "Sevimliləri silmək mümkün olmadı. Yenidən cəhd edin.",
            error_fetching_favorites: "Sevimli məhsulları əldə edərkən bir xəta baş verdi.",
            favorites: "Sevimlilər",
            image: "Şəkil",
            name: "Ad",
            price: "Qiymət",
            action: "Fəaliyyət",
            product_not_found: "Məhsul tapılmadı",
            remove_all_favorites: "Bütün Sevimliləri Sil",

            // cart
            confirm_change_quantity: "Məhsul sayını dəyişmək istəyirsiniz?",
            quantity_updated_successfully: "Məhsulun sayı uğurla yeniləndi!",
            failed_to_update_quantity: "Məhsulun sayını yeniləmək mümkün olmadı. Zəhmət olmasa, yenidən cəhd edin.",
            confirm_delete_cart: "Bu səbəti silmək istəyirsiniz?",
            cart_item_deleted_successfully: "Səbət maddəsi uğurla silindi!",
            failed_to_delete_cart_item: "Səbət maddəsini silmək mümkün olmadı. Zəhmət olmasa, yenidən cəhd edin.",
            error_fetching_cart_data: "Səbət məlumatlarını əldə edərkən səhv baş verdi.",
            product: "Məhsul",
            quantity: "Sayı",
            total_price: "Cəmi Qiymət",
            cart_empty_warning: "Səbətiniz boştur.",

            // details
            error_fetching_details_data: "Məhsul detalları əldə edilərkən səhv baş verdi.",
            brand: "Marka",
            sellect_img: "Şəkil seçin",

            // details-> addtoButtonc
            login_prompt: "Zəhmət olmasa hesabınıza daxil olun və ya yeni bir hesab yaradın.",
            select_image_prompt: "Zəhmət olmasa, bir şəkil seçin",
            product_added_success: "Məhsul müvəffəqiyyətlə səbətə əlavə edildi!",
            product_add_failed: "Məhsulu səbətə əlavə etmək mümkün olmadı.",
            loading: "Yüklənir...",
            add_to_cart: "Səbətə əlavə et",

            // details -> review
            no_review: "Hələ ki, heç bir rəy yoxdur.",

            // add new review
            addYourReview: "Rəyinizi əlavə edin",
            successfullyAdded: "Rəy uğurla əlavə olundu!",
            failedToAdd: "Rəy əlavə etməkdə xəta baş verdi. Zəhmət olmasa, yenidən cəhd edin.",
            youMustLogIn: "Şərh əlavə etmək üçün daxil olmalısınız",
            logIn: "Daxil Ol",
            addComment: "Şərh əlavə et",

            // detailsbar
            description: "Təsvir",
            reviews: "Rəylər",
            add_review: "Rəy əlavə et",

            // admin page
            dashboard: "İdarəetmə Paneli",
            createNewProduct: "Yeni Məhsul Yarat",
            category: "Kateqoriya",
            users: "İstifadəçilər",

            // dashboard
            usersProductsDistribution: "İstifadəçi və Məhsullar",
            totalCategories: "Cəmi Kateqoriyalar",
            totalProducts: "Cəmi Məhsullar",
            totalUsers: "Cəmi İstifadəçilər",

            // add new product com.
            addNewProduct: "Yeni məhsul əlavə et",
            productCreatedSuccess: "Məhsul uğurla yaradıldı!",
            productCreationFailed: "Məhsul yaratmaq alınmadı. Zəhmət olmasa yenidən cəhd edin.",
            categoryNotFound: "Kateqoriya tapılmadı",
            createProduct: "Məhsul yarat",

            // categories
            addCategory: "Yeni Kateqoriya Əlavə Et",
            categoryName: "Kateqoriya adı:",
            deleteSuccess: "Kateqoriya uğurla silindi!",
            deleteError: "Kateqoriyanı silmək mümkün olmadı. Zəhmət olmasa yenidən cəhd edin.",
            createCategory: "Kateqoriya Yarat",
            updateCategory: "Kateqoriyanı Yenilə",
            errorFetching: "Kateqoriyaları əldə etməkdə xəta baş verdi.",
            edit: "Redaktə",
            delete: "Sil",

            // table products
            deleteConfirmation: "Bu məhsulu silmək istədiyinizə əminsiniz?",
            editSuccess: "Məhsul uğurla yeniləndi!",
            editError: "Məhsulu yeniləmək alınmadı. Zəhmət olmasa yenidən cəhd edin.",
            fetchError: "Məhsulları gətirməkdə problem yarandı. Zəhmət olmasa sonra yenidən cəhd edin.",
            save: "Yadda saxla",
            editProduct: "Məhsulu redaktə et",
            error_categories: "Kateqoriyaları gətirərkən bir xəta baş verdi",
            edit_product: "Məhsul redaktəsi",
            okText: "yenilə",

            // logo
            change_logo_success_message: "Logo uğurla dəyişdirildi!",
            change_logo_fail_message: "Logonu dəyişərkən xəta baş verdi.Bir daha sınayın!",
            change_logo: "Logonu dəyişdir",
            logo_input_placeholder: "Yeni Logonu daxil edin",
            saving: "Saxlanır...",
        },
    },
};

i18n.use(initReactI18next).init({
    resources,
    lng: "en",
    fallbackLng: "en",
    interpolation: {
        escapeValue: false,
    },
});

export default i18n;
