import ProtectedRoute from "@/component/protectedRoute";

const Dashboard = () => {
    return (
        <h1>Dashboard</h1>
    )
}

export default ProtectedRoute(Dashboard);