import { Button } from "@/components/ui/button";
import PageHeader from "../_components/PageHeader";
import Link from "next/link";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import db from "@/database/db";
import { CheckCircle2, MoreVertical, XCircle } from "lucide-react";
import { formatCurrency, formatNumber } from "@/lib/formatters";
import { ActiveToggleDropdownItem, DeleteDropdownItem } from "./_components/ProductActions";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ProductBodyTable } from "./_components/ProductBodyTable";

export default function AdminProductPage() {
    return (
    <>
        <div className="flex justify-between items-center gap-4">
            <PageHeader>Products</PageHeader>
            <Button>
                <Link href={"/admin/products/new"}>Add Product</Link>
            </Button>
        </div>

        <ProductsTable />
    </>
        
    )
}

async function ProductsTable() {
    const products = await db.product.findMany({ 
        select: {
            id: true, 
            name: true,
            priceInCents: true,
            isAvailableForPurchase: true, 
            _count: {
                select: {
                    orders: true
                }
            }
        },
        orderBy: {name : "asc"}
    })
 
    if (products.length === 0) return <p>No products found</p>

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-0">
                        <span className="sr-only"></span>
                    </TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Orders</TableHead>
                    <TableHead className="w-0">
                        <span className="sr-only">Actions</span>
                    </TableHead>
                </TableRow>
            </TableHeader>
            
            <ProductBodyTable products={products} />
           
        </Table>
    )
}