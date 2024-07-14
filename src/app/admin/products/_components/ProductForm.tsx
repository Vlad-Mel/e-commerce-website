'use client'

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea";
import { formatCurrency } from "@/lib/formatters";
import { useState } from "react"
import { addProduct } from "../../_actions/product-action";
import { useFormState, useFormStatus } from "react-dom";
import { FormError } from "@/components/shared/form-error";
import { Product } from "@prisma/client";
import Image from "next/image";

export default function ProductForm({ product } : {
    product?: Product | null
}) {
    const [error, action] = useFormState(addProduct, {})
    const [priceInCents, setPriceInCents] = useState<number | undefined>(product?.priceInCents);

    return (
        <form action={action} className="space-y-8">
            <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input type="text" id="name" name="name" 
                       required 
                       defaultValue={product?.name || ""}
                />
                {error.name && <FormError title="Error with Name" message={error.name.join('')} />}
            </div>

            <div className="space-y-2">
                <Label htmlFor="priceInCents">Price In Cents</Label>
                <Input type="text" id="priceInCents" name="priceInCents" 
                       required
                       value={priceInCents}
                       onChange={e => setPriceInCents(Number(e.target.value) || undefined)} 
                />

                <div className="text-muted-foreground">{formatCurrency((priceInCents || 0) / 100)}</div>
                {error.priceInCents && <FormError title="Error with Price" message={error.priceInCents.join('')} />}
            </div>

            <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea 
                    id="description" 
                    name="description" 
                    required 
                    defaultValue={product?.description || ""}
                />
                {error.description && <FormError title="Error with Description" message={error.description.join('')} />}
            </div>

            <div className="space-y-2">
                <Label htmlFor="file">File</Label>
                <Input 
                    type="file" 
                    id="file" 
                    name="file"
                    required={product == null}
                />
                {product != null && (
                    <div className="text-muted-foreground">{product.filePath}</div>
                )}
                {error.file && <FormError title="Error with File" message={error.file.join('')} />}
            </div>

            <div className="space-y-2">
                <Label htmlFor="image">Image</Label>
                <Input 
                    type="file" 
                    id="image" 
                    name="image"  
                    required={product == null}
                />
                {(product !== null && product !== undefined) && (
                    <Image src={product?.imagePath} height="400" width="400" alt="Product Image" />
                )}
                {error.image && <FormError title="Error with Image" message={error.image.join('')} />}
            </div>

            <SubmitButton />
        </form>
    )
}

function SubmitButton() {
    const {pending} = useFormStatus();

    return (
        <Button type='submit' disabled={pending}>
            {pending ? "Saving..." : "Save"}    
        </Button>
    )   
}