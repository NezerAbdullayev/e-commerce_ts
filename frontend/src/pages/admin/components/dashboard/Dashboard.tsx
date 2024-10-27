import { FC } from "react";
import { Box, Typography } from "@mui/material";
import { useTranslation } from "react-i18next"; // Import useTranslation
import { useGetAnalitcsQuery } from "../../../../redux/services/analyticsApi";
import { Line, Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, PointElement, Tooltip, Legend, ArcElement, Filler } from "chart.js";
import Loading from "../../../../components/Loading";

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Tooltip, Legend, ArcElement, Filler);

const Dashboard: FC = () => {
    const { t } = useTranslation();
    const { data, isLoading } = useGetAnalitcsQuery();

    const dailySalesData = data?.dailySalesData || [];
    const categoriesCount = data?.analyticsData?.categories || 0;

    const labels = dailySalesData.map((item) => item.date);
    const usersData = dailySalesData.map((item) => item.users);
    const productsData = dailySalesData.map((item) => item.products);

    const lineChartData = {
        labels,
        datasets: [
            {
                label: t("usersProductsDistribution"),
                data: usersData,
                borderColor: "rgba(75, 192, 192, 1)",
                backgroundColor: "rgba(75, 192, 192, 0.2)",
                fill: true,
                tension: 0.1,
            },
            {
                label: "Products",
                data: productsData,
                borderColor: "rgba(255, 99, 132, 1)",
                backgroundColor: "rgba(255, 99, 132, 0.2)",
                fill: true,
                tension: 0.1,
            },
        ],
    };

    const combinedDoughnutData = {
        labels: [t("totalUsers"), t("totalProducts")],
        datasets: [
            {
                data: [data?.analyticsData?.users || 0, data?.analyticsData?.products || 0],
                backgroundColor: ["rgba(75, 192, 192, 1)", "rgba(255, 99, 132, 1)"],
                hoverOffset: 4,
            },
        ],
    };

    const categoriesDoughnutData = {
        labels: [t("totalCategories")],
        datasets: [
            {
                data: [categoriesCount],
                backgroundColor: ["rgba(255, 206, 86, 1)"],
                hoverOffset: 4,
            },
        ],
    };

    if (isLoading) return <Loading />;

    return (
        <Box>
            <Typography variant="h4" gutterBottom>
                {t("dashboard")}
            </Typography>

            <Box>
                <Box className="flex items-center justify-evenly">
                    <Box width="400px" mb={4}>
                        <Typography variant="h6" align="center">
                            {t("usersProductsDistribution")}
                        </Typography>
                        <Doughnut data={combinedDoughnutData} />
                    </Box>

                    <Box width="400px" mb={4}>
                        <Typography variant="h6" align="center">
                            {t("totalCategories")}
                        </Typography>
                        <Doughnut data={categoriesDoughnutData} />
                    </Box>
                </Box>

                <Box mb={4}>
                    <Typography>
                        {t("totalProducts")}: {data?.analyticsData?.products || 0}
                    </Typography>
                    <Typography>
                        {t("totalUsers")}: {data?.analyticsData?.users || 0}
                    </Typography>
                </Box>

                <Box mb={4}>
                    <Line data={lineChartData} />
                </Box>
            </Box>
        </Box>
    );
};

export default Dashboard;
