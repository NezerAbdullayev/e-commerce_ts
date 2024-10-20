import ProductModel from "../models/productModel.js";
import User from "../models/userModel.js";
import CategoriesModel from "../models/categoryModel.js"

export const getAnalyticsData = async () => {
    const totalUsers = await User.countDocuments();
    const totalProducts = await ProductModel.countDocuments();
    const totalCategories = await CategoriesModel.countDocuments()

    return {
        users: totalUsers,
        products: totalProducts,
        categories:totalCategories
    };
};

export const getDailySalesData = async (startDate, endDate) => {
    try {
        const dateArray = getDatesInRange(startDate, endDate);

        return await Promise.all(dateArray.map(async (date) => {
            const usersCount = await User.countDocuments({
                createdAt: {
                    $gte: new Date(date),
                    $lt: new Date(new Date(date).setDate(new Date(date).getDate() + 1)), 
                },
            });
            
            const productsCount = await ProductModel.countDocuments({
                createdAt: {
                    $gte: new Date(date),
                    $lt: new Date(new Date(date).setDate(new Date(date).getDate() + 1)),
                },
            });

            return {
                date,
                users: usersCount,
                products: productsCount,
            };
        }));
    } catch (error) {
        throw error;
    }
};




function getDatesInRange(startDate, endDate) {
    const dates = [];
    let currentDate = new Date(startDate);

    while (currentDate <= endDate) {
        dates.push(currentDate.toISOString().split("T")[0]);
        currentDate.setDate(currentDate.getDate() + 1);
    }

    return dates;
}
