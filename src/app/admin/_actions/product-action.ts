'use server'

import { z } from "zod"

import db from "@/database/db"
import fs from "fs/promises"
import { redirect } from "next/navigation"

const fileSchema = z.instanceof(File, {
    message: "Required"
})

const imageSchema = fileSchema.refine(file => file.size === 0 || file.type.startsWith("image/"))

const addSchema = z.object({
    name: z.string().min(1),
    description: z.string().min(1),
    priceInCents: z.coerce.number().int().min(1),
    file: fileSchema.refine(file => file.size > 0, "Required"),
    image: fileSchema.refine(file => file.size > 0, "Required")
})

export async function addProduct(prevState: unknown, formData: FormData) {
    const isAvailableForPurchase = false;

    const result = addSchema.safeParse(Object.fromEntries(formData.entries()))
    
    if (result.success === false) {
        return result.error.formErrors.fieldErrors;
    }

    const {name, description, priceInCents, file, image} = result.data

    await fs.mkdir("products", {recursive: true})
    const filePath = `products/${crypto.randomUUID()}-${file.name}`
    await fs.writeFile(filePath, Buffer.from(await file.arrayBuffer()))

    await fs.mkdir("public/products", {recursive: true})
    const imagePath = `/products/${crypto.randomUUID()}-${image.name}`
    await fs.writeFile(`public${imagePath}`, Buffer.from(await image.arrayBuffer()))

    await db.product.create({ data: {
        name,
        description,
        priceInCents,
        filePath,
        imagePath,
        isAvailableForPurchase
    }})

    redirect("/admin/products")
}