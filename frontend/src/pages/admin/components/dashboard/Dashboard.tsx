import { Box, Typography } from "@mui/material";
import { useGetAnalitcsQuery } from "../../../../redux/services/analyticsApi";
import { Line, Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, PointElement, Tooltip, Legend, ArcElement, Filler } from "chart.js";
import { FC } from "react";
import Loading from "../../../../components/Loading";

// Chart.js-in qeydiyyatı
ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Tooltip, Legend, ArcElement, Filler);

const Dashboard: FC = () => {
    const { data, isLoading } = useGetAnalitcsQuery();

    const dailySalesData = data?.dailySalesData || [];
    const categoriesCount = data?.analyticsData.categories;

    const labels = dailySalesData.map((item) => item.date);
    const usersData = dailySalesData.map((item) => item.users);
    const productsData = dailySalesData.map((item) => item.products);

    const lineChartData = {
        labels: labels,
        datasets: [
            {
                label: "Users",
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
        labels: ["Users", "Products"],
        datasets: [
            {
                data: [data?.analyticsData.users, data?.analyticsData.products],
                backgroundColor: ["rgba(75, 192, 192, 1)", "rgba(255, 99, 132, 1)"],
                hoverOffset: 4,
            },
        ],
    };

    const categoriesDoughnutData = {
        labels: ["Categories"],
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
                Dashboard
            </Typography>

            <Box>
                <Box className="flex items-center justify-evenly">
                    <Box width="400px" mb={4}>
                        <Typography variant="h6" align="center">
                            Users and Products Distribution
                        </Typography>
                        <Doughnut data={combinedDoughnutData} />
                    </Box>

                    <Box width="400px" mb={4}>
                        <Typography variant="h6" align="center">
                            Total Categories
                        </Typography>
                        <Doughnut data={categoriesDoughnutData} />
                    </Box>
                </Box>

                <Box>
                    <Box mb={2}>
                        <Typography>Total Products: {data?.analyticsData.products}</Typography>
                        <Typography>Total Users: {data?.analyticsData.users}</Typography>
                    </Box>

                    <Box mb={4}>
                        <Line data={lineChartData} />
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default Dashboard;
