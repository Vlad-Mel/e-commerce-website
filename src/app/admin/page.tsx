import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import db from "@/database/db";
import { getProductData } from "@/database/product-repository/product-repository";
import { getSalesData } from "@/database/sales-repository/sales-repository";
import { getUserData } from "@/database/user-repository/user-repository";
import { DashboardCardProps } from "@/interfaces/Dashboard";
import { formatCurrency, formatNumber } from "@/lib/formatters";

export default async function AdminDashboard () {
    const [salesData, userData, productData] = await Promise.all([
        getSalesData(),
        getUserData(),
        getProductData()
    ])

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <DashboardCard 
                title={"Sales"} 
                subtitle={formatNumber(salesData.numberOfSales)} 
                body={formatCurrency(salesData.amount)} 
            />

            <DashboardCard 
                title={"Customer"} 
                subtitle={`${formatCurrency(userData.averageValuePerUser)} Average Value`} 
                body={formatNumber(userData.userCount)} 
            />

            <DashboardCard 
                title={"Active Products"} 
                subtitle={`${formatNumber(productData.inactiveCount)} Inactive Products`} 
                body={formatNumber(productData.activeCount)} 
            />
        </div>
    )
}

function DashboardCard({title, subtitle, body}: DashboardCardProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription>{subtitle}</CardDescription>
            </CardHeader>  

            <CardContent>
                <p>{body}</p>
            </CardContent>
        </Card>
    )
}