'use client'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import { formatCurrency, formatNumber } from "@/lib/formatters";
import { CheckCircle2, MoreVertical, XCircle } from "lucide-react";
import { ActiveToggleDropdownItem, DeleteDropdownItem } from "./ProductActions";
import Link from "next/link";
import { ProductTableDto } from "@/interfaces/Product";
import { useEffect, useState } from "react";

interface ItemStatus {
    [key: string] : boolean
}

export function ProductBodyTable({products} : { products: ProductTableDto[] }) {
    const [activeProducts, setActiveProducts] = useState<ItemStatus>(
        products.reduce((acc, product) => {
            acc[product.id] = product.isAvailableForPurchase
            return acc;
        }, {} as ItemStatus)
    )

    const [deletedProducts, setDeletedProducts] = useState(
        products.reduce((acc, product) => {
            acc[product.id] = false;
            return acc;
        }, {} as ItemStatus)
    )

    const toggleActiveProductStatus = (id: string) => {
        setActiveProducts((prevStatus) => ({
          ...prevStatus,
          [id]: !prevStatus[id],
        }));
    };

    const removeProductRow = (id: string) => {
        setDeletedProducts((prevStatus) => ({
            ...prevStatus,
            [id]: true
        }))
    }

    return (
        <TableBody>
                {products.map(product => (
                    !deletedProducts[product.id] && <TableRow key={product.id}>
                        <TableCell>{activeProducts[product.id] ? (
                            <>
                                <CheckCircle2 className="stroke-green-400" />
                                <span className="sr-only">Available</span>
                            </>
                        ) : (
                            <>
                                <XCircle className="stroke-destructive" />
                                <span className="sr-only">Unavailable</span>
                            </>
                        )
                        }</TableCell>
                        <TableCell>{product.name}</TableCell>
                        <TableCell>{formatCurrency(product.priceInCents / 100)}</TableCell>
                        <TableCell>{formatNumber(product._count.orders)}</TableCell>
                        <TableCell>
                            <DropdownMenu>
                                <DropdownMenuTrigger>
                                    <MoreVertical/>
                                    <span className="sr-only">Actions</span>
                                </DropdownMenuTrigger>
                                
                                <DropdownMenuContent>
                                    <DropdownMenuItem asChild>
                                        <a download href={`/admin/products/${product.id}/download`}>
                                            Download
                                        </a>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem asChild>
                                        <Link href={`/admin/products/${product.id}/edit`}>
                                            Edit
                                        </Link>
                                    </DropdownMenuItem>
                                    <ActiveToggleDropdownItem 
                                        id={product.id} 
                                        isAvailableForPurchase={activeProducts[product.id]}
                                        onClick={toggleActiveProductStatus}
                                    />

                                    <DropdownMenuSeparator />
                                    
                                    <DeleteDropdownItem 
                                        id={product.id} 
                                        disabled={product._count.orders > 0}
                                        onClick={removeProductRow}
                                    />
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
    )
}