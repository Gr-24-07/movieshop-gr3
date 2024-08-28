'use client';

import {
    Line,
    LineChart,
    XAxis,
    YAxis,
    CartesianGrid,
    ResponsiveContainer
} from 'recharts';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from '@/components/ui/card';
const StatisticsChart = () => {
    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle>Statistic</CardTitle>
                    <CardDescription>View</CardDescription>
                </CardHeader>
                <CardContent>
                    <div style={{ width: '100%', height: 300, }}>
                        <ResponsiveContainer>
                            <LineChart width={1100} height={300}>
                                <Line type='monotone' dataKey='uv' stroke='' />
                                <CartesianGrid stroke='' />
                                <XAxis dataKey='name' />
                                <YAxis />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </CardContent>

            </Card>
        </>
    );
}

export default StatisticsChart;