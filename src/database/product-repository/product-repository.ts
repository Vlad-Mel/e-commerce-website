'use server'
import db from "@/database/db";
import { ActiveToggleDropdownItemProps } from "@/interfaces/Product";
import { notFound } from "next/navigation";

export async function getProductData() {
    const [activeCount, inactiveCount] = await Promise.all([
        db.product.count({ where: { isAvailableForPurchase: true }}),
        db.product.count({ where: { isAvailableForPurchase: false }})
    ])

    return {
        activeCount,
        inactiveCount
    }
}

export async function toggleProductAvailability(id: string, isAvailableForPurchase: boolean) {
    await db.product.update({
        where: {
            id
        }, 
        data: {
            isAvailableForPurchase
        }
    })
}

export async function deleteProduct(id: string) {
    const product = await db.product.delete({
        where: {
            id
        }
    })

    if (product == null) return notFound()
}