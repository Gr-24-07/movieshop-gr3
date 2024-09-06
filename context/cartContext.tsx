import React, { createContext, useContext, useState, useEffect } from 'react';
import { getCart, addToCart, removeFromCart, updateCart, clearCart } from '@/app/actions/cart';
import { Cart, Item } from '@/app/actions/cart';

// Define the context type
type CartContextType = {
  cart: Cart;
  addItem: (item: Item) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  cartCount: number
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [cart, setCart] = useState<Cart>({});

    // ####################### Get cart ############################
    useEffect(() => {
        const loadCart = async () => {
            try {
                const initialCart = await getCart(); 
                setCart(initialCart);
            } catch (error) {
                console.error('Error loading cart:', error);
            }
        };

        loadCart();
    }, []);
    // ############################ Add item to cart ############################   
    const addItem = async (item: Item) => {
        try {
            await addToCart(item);
            setCart(await getCart()); 
        } catch (error) {
            console.error('Error adding item to cart:', error);
        }
    };


    // ########################### Remove item from cart ############################
    const removeItem = async (itemId: string) => {
        try {
            await removeFromCart(itemId);
            setCart(await getCart()); 
        } catch (error) {
            console.error('Error removing item from cart:', error);
        }
    };

  //##################### Update Quantity ##################################
    const updateQuantity = async (itemId: string, quantity: number) => {
        try {
            await updateCart(itemId, quantity); 
            setCart(await getCart()); 
        } catch (error) {
            console.error('Error updating item quantity in cart:', error);
        }
    };

    // ############################ Clear the cart ##############################
    const clear = async () => {
        try {
            await clearCart(); 
             setCart(await getCart()); 
        } catch (error) {
            console.error('Error clearing cart:', error);
        }
    };

    const cartCount = Object.values(cart).reduce((acc, item) => acc + item.quantity, 0);
    return (
        <CartContext.Provider value={{ cart, addItem, removeItem, updateQuantity, clearCart: clear, cartCount }}>
        {children}
        </CartContext.Provider>
    );
};

//##################################### Custom hook to use the cart context ##################################
export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};
