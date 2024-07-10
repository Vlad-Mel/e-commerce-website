'use server'
import db from "@/database/db";

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