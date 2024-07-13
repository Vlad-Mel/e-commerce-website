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

export default function ProductForm() {
    const [error, action] = useFormState(addProduct, {})
    const [priceInCents, setPriceInCents] = useState<number | undefined>();

    return (
        <form action={action} className="space-y-8">
            <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input type="text" id="name" name="name" required />
                {error.name && <FormError title="Error with Name" message={error.name.join('')} />}
            </div>

            <div className="space-y-2">
                <Label htmlFor="priceInCents">Price In Cents</Label>
                <Input type="text" id="priceInCents" name="priceInCents" required
                       value={priceInCents}
                       onChange={e => setPriceInCents(Number(e.target.value) || undefined)} />

                <div className="text-muted-foreground">{formatCurrency((priceInCents || 0) / 100)}</div>
                {error.priceInCents && <FormError title="Error with Price" message={error.priceInCents.join('')} />}
            </div>

            <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" name="description" required />
                {error.description && <FormError title="Error with Description" message={error.description.join('')} />}
            </div>

            <div className="space-y-2">
                <Label htmlFor="file">File</Label>
                <Input type="file" id="file" name="file" required />
                {error.file && <FormError title="Error with File" message={error.file.join('')} />}
            </div>

            <div className="space-y-2">
                <Label htmlFor="image">Image</Label>
                <Input type="file" id="image" name="image" required />
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