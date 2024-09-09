"use client";

import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { ResponsiveLine } from "@nivo/line"
import { ClassAttributes, HTMLAttributes, JSX } from "react"
import Sidebar from '@/app/dashboard/sidebar';
import { DollarSign, UsersRound, Film } from 'lucide-react';
import AddMovie from "@/app/dashboard/addMovie"

export default function adminDashboard() {
  return (
    <div className="flex min-h-screen w-full container mx-auto my-10">
      <Sidebar />
      <div className="flex flex-1 flex-col">
        <header className="bg-background border-b-2 px-4 py-3 sm:px-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <Button
            variant="ghost"
            size="sm"
            className="flex items-center gap-2 rounded-md px-3 py-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <AddMovie />
          </Button>
        </header>
        <main className="flex-1 p-4 sm:p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="flex items-center justify-between">
              <div className="bg-primary rounded-md p-2 text-primary-foreground">
                <Film className="w-6 h-6" />
              </div>
              <div className="text-center">
                <CardTitle className="text-2xl font-bold">12,345</CardTitle>
                <CardDescription className="text-muted-foreground">Movies</CardDescription>
              </div>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="flex items-center justify-between">
              <div className="bg-accent rounded-md p-2 text-accent-foreground">
                <UsersRound className="w-6 h-6" />
              </div>
              <div className="text-center">
                <CardTitle className="text-2xl font-bold">1,234</CardTitle>
                <CardDescription className="text-muted-foreground">Customers</CardDescription>
              </div>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="flex items-center justify-between">
              <div className="bg-secondary rounded-md p-2 text-secondary-foreground">
                <DollarSign className="w-6 h-6" />
              </div>
              <div className="text-center">
                <CardTitle className="text-2xl font-bold">$45,678</CardTitle>
                <CardDescription className="text-muted-foreground">Total Revenue</CardDescription>
              </div>
            </CardHeader>
          </Card>
        </main>
        <div className="p-4 sm:p-6">
          <Card>
            <CardHeader>
              <CardTitle>Statistics</CardTitle>
            </CardHeader>
            <CardContent>
              <LineChart className="aspect-[4/3]" />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}


function LineChart(props: JSX.IntrinsicAttributes & ClassAttributes<HTMLDivElement> & HTMLAttributes<HTMLDivElement>) {
  return (
    <div {...props}>
      <ResponsiveLine
        data={[
          {
            id: "Desktop",
            data: [
              { x: "Jan", y: 43 },
              { x: "Feb", y: 137 },
              { x: "Mar", y: 61 },
              { x: "Apr", y: 145 },
              { x: "May", y: 26 },
              { x: "Jun", y: 154 },
              { x: "Jul", y: 154 },
            ],
          },
          {
            id: "Mobile",
            data: [
              { x: "1", y: 60 },
              { x: "2", y: 48 },
              { x: "3", y: 177 },
              { x: "4", y: 78 },
              { x: "5", y: 96 },
              { x: "6", y: 204 },
              { x: "7", y: 204 },
            ],
          },
        ]}
        margin={{ top: 10, right: 10, bottom: 40, left: 40 }}
        xScale={{
          type: "point",
        }}
        yScale={{
          type: "linear",
        }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 0,
          tickPadding: 16,
        }}
        axisLeft={{
          tickSize: 0,
          tickValues: 5,
          tickPadding: 16,
        }}
        colors={["#2563eb", "#e11d48"]}
        pointSize={6}
        useMesh={true}
        gridYValues={6}
        theme={{
          tooltip: {
            chip: {
              borderRadius: "9999px",
            },
            container: {
              fontSize: "12px",
              textTransform: "capitalize",
              borderRadius: "6px",
            },
          },
          grid: {
            line: {
              stroke: "#f3f4f6",
            },
          },
        }}
        role="application"
      />
    </div>
  )
}

