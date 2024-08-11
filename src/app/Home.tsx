import Header from "@/component/header/Header";
import Auth from "./auth/Auth";
import Dashboard from "./dashboard/page";
import Data from "./data/Data";
import Predict from "./predict/Predict";
import Profile from "./profile/Profile";


export default function Home() {
  return (
    <main className="max-w-md mx-auto">
        <h1>Welcome To HydroSentinel</h1>
        <Auth />
        <Dashboard />
        <Data />
        <Predict />
        <Profile />
    </main>
  );
}