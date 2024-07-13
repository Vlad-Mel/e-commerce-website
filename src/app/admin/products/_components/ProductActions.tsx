'use client'

import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { deleteProduct, toggleProductAvailability } from "@/database/product-repository/product-repository";
import { ActiveToggleDropdownItemProps, DeleteDropdownItemProps } from "@/interfaces/Product";
import { startTransition, useTransition } from "react";

export function ActiveToggleDropdownItem({id, isAvailableForPurchase, onClick} : ActiveToggleDropdownItemProps) {
    const [isPending, startTransition] = useTransition();

    const click = () => {
        startTransition( async () => {
            await toggleProductAvailability(id, !isAvailableForPurchase)
            onClick(id)
        })
    }

    return <DropdownMenuItem onClick={click} disabled={isPending}>
        {isAvailableForPurchase ? "Deactivate" : "Activate"}
    </DropdownMenuItem>
}

export function DeleteDropdownItem({id, disabled, onClick} : DeleteDropdownItemProps) {
    const [isPending, startTransition] = useTransition();

    const click = () => {
        startTransition( async () => {
            await deleteProduct(id)
            onClick(id)
        })
    }

    return <DropdownMenuItem variant="destructive" onClick={click} disabled={isPending || disabled}>
        Delete
    </DropdownMenuItem>
}