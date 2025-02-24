"use client";
import { Product } from "@prisma/client"
import { createContext, ReactNode, useState } from "react"

export interface CartProduct extends 
 Pick<Product, "id" | "name" | "price" | "imageUrl">{
    quantity: number;
}
export interface ICartContext{
    isOpen: boolean;
    products: CartProduct[];
    toogleCart: () => void;
    addProduct: (product: CartProduct) => void;
    descreaseProductQuantity: (productId: string) => void;
    increaseProductQuantity: (producId: string) => void;
    removeProduct: (producId: string) => void;
}

export const CartContext = createContext<ICartContext>({
    isOpen: false,
    products: [],
    toogleCart: () => {},
    addProduct: () => {},
    descreaseProductQuantity: () => {},
    increaseProductQuantity: () => {},
    removeProduct: () => {},
}); 

export const CartProvider = ({children}: {children: ReactNode}) =>{
    const [products, setProducts] = useState<CartProduct[]>([]);
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const toogleCart = () =>{
        setIsOpen(prev => !prev)
    }
    const addProduct = (product: CartProduct) => {
        const productIsAlreadyOnTheCart = products.some(
            (prevProduct) => prevProduct.id === product.id,
        );
        if (!productIsAlreadyOnTheCart) {
            return setProducts((prev) => [...prev, product])
        }
        setProducts(prevProducts => {
            return prevProducts.map(prevProducts => {
                if (prevProducts.id === product.id) {
                    return{
                        ...prevProducts,
                        quantity: prevProducts.quantity + product.quantity,
                    }
                }
                return prevProducts
            })
        })
    }
    const descreaseProductQuantity = (productId: string) => {
        setProducts(prevProducts => {
            return prevProducts.map(prevProduct => {
                if (prevProduct.id !== productId) {
                    return prevProduct;
                }
                if (prevProduct.quantity === 1) {
                    return prevProduct;
                }
                return {...prevProduct, quantity: prevProduct.quantity - 1}
            })
        })
    }

    const increaseProductQuantity = (productId: string) => {
        setProducts(prevProducts => {
            return prevProducts.map(prevProduct => {
                if (prevProduct.id !== productId) {
                    return prevProduct;
                }
                return {...prevProduct, quantity: prevProduct.quantity + 1}
            });
        });
    };
    const removeProduct = (productId: string) => {
        setProducts(prevProducts => prevProducts.filter(prevProduct => prevProduct.id !== productId));
    }
    return(
        <CartContext.Provider
            value={{
                isOpen,
                products,
                toogleCart,
                addProduct,
                descreaseProductQuantity,
                increaseProductQuantity,
                removeProduct,
            }}
        >
            {children}
        </CartContext.Provider>
    )
}