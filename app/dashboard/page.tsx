import DashboardCard from "./dashboardCard";
import StatisticsChart from "./statisticsChart"
import Sidebar from './sidebar';
import { FaUsers, FaSitemap } from "react-icons/fa";
import { MdLocalMovies } from "react-icons/md";
import { GoMail } from "react-icons/go";
export default function Dashboard() {
    return (

        <div className="flex">
            <div className="w-[250px] h-[100vh] m-4">
                <Sidebar />
            </div>

            <div className="flex flex-col flex-1">
                <div className="flex flex-row justify-between gap-1 mb-5">
                    <DashboardCard
                        title='Users'
                        count={100}
                        icon={<FaUsers />}
                    />
                    <DashboardCard
                        title='Orders'
                        icon={<FaSitemap />}
                        count={100}

                    />
                    <DashboardCard
                        title='Movies'
                        count={100}
                        icon={<MdLocalMovies />}
                    />
                    <DashboardCard
                        title='E-mail'
                        count={100}
                        icon={<GoMail />}
                    />
                </div>
                <div className="mt-5">
                    <StatisticsChart />
                </div>

            </div>



        </div>








    );
}
