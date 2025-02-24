import { useContext } from "react";

import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";

import { CartContext } from "../contexts/cart";
import CardProductItem from "./cart-products-item";


const CartSheet = () => {
    const {isOpen, toogleCart, products} = useContext(CartContext)
    return ( 
        <Sheet open={isOpen} onOpenChange={toogleCart}>
        <SheetContent className="w-[80%]">
            <SheetHeader>
                <SheetTitle className="text-left">Sacola</SheetTitle>
            </SheetHeader>
           <div className="py-5">
             {products.map(product => (
               <CardProductItem key={product.id} product={product}/>
             ))}
           </div>
        </SheetContent>
    </Sheet>
     );
}
 
export default CartSheet;