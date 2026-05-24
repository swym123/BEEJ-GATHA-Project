import { PRODUCTS as initialProducts } from "../pages/product"; // Adjust path to your component

const STORAGE_KEY = "beej_gatha_inventory";

export interface ProductItem {
    id: number;
    category: string;
    name: string;
    code: string;
    tag: string;
    icon: string;
    img: string;
    yield: string;
    maturity: string;
    resistance: string;
    season: string;
    spacing: string;
    desc: string;
    fullDesc: string;
    badge: "green" | "blue" | "amber";
}

export const getStoredProducts = (): ProductItem[] => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(initialProducts));
        return initialProducts as ProductItem[];
    }
    return JSON.parse(stored);
};

export const saveStoredProducts = (products: ProductItem[]): void => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
};