import { useGetAnalitcsQuery } from "../../../../redux/services/analyticsApi";

function Dashboard() {
    const { data } = useGetAnalitcsQuery();

    console.log(data);
    
    return <div></div>;
}

export default Dashboard;
