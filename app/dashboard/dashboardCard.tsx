import { Card, CardContent } from "@/components/ui/card";
import { ReactNode } from "react";


interface DashboardCardProps {
    title: string;
    count: number;
    icon: ReactNode;
}



const DashboardCard = ({ title, count, icon }: DashboardCardProps) => {
    return (
        <Card className="dashboardCard p-4 pb-0 mt-3 h-32">
            <CardContent>
                <h3 className="text-2xl text-center font-bold text-white mt-2">
                    {title}
                </h3>
                <div className="flex justify-center items-center gap-5 text-white text-3xl mx-2">
                    {icon}
                    <h3 className="text-2xl font-semibold text-white">
                        {count}
                    </h3>
                </div>

            </CardContent>
        </Card>
    );
}

export default DashboardCard;