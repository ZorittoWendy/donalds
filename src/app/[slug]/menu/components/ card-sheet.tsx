import { useContext } from "react";

import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";

import { CartContext } from "../contexts/cart";


const CartSheet = () => {
    const {isOpen, toogleCart, products} = useContext(CartContext)
    return ( 
        <Sheet open={isOpen} onOpenChange={toogleCart}>
        <SheetContent>
            <SheetHeader>
                <SheetTitle>
                    <SheetDescription>
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Soluta, fugit consequuntur 
                        officiis iure ex quidem aliquid magni ullam alias similique sit eveniet voluptas porro autem, 
                        amet, 
                        tempora quam. Rem, in?
                    </SheetDescription>
                </SheetTitle>
            </SheetHeader>
            {products.map(product => (
                <h1 key={product.id}>
                    {product.name} = {product.quantity}
                </h1>
            ))}
        </SheetContent>
    </Sheet>
     );
}
 
export default CartSheet;