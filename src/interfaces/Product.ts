export interface ActiveToggleDropdownItemProps {
    id: string,
    isAvailableForPurchase: boolean
    onClick: (id: string) => void
}

export interface DeleteDropdownItemProps {
    id: string,
    disabled: boolean,
    onClick: (id: string) => void
}

export interface ProductTableDto {
    id: string,
    name: string,
    priceInCents: number,
    isAvailableForPurchase: boolean,
    _count: {
        orders: number
    }
}