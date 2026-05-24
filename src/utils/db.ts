import { INITIAL_FALLBACK_PRODUCTS } from "../data/products";
import type { ProductItem } from "../data/products";

const STORAGE_KEY = "beej_gatha_inventory";

export type { ProductItem };

export const getStoredProducts = (): ProductItem[] => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_FALLBACK_PRODUCTS));
        return INITIAL_FALLBACK_PRODUCTS;
    }
    return JSON.parse(stored);
};

export const saveStoredProducts = (products: ProductItem[]): void => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
};