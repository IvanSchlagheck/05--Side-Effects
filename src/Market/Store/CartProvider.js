//React Import
import { useReducer } from "react";
// Components Imports
import CartContext from "./cart-context";

const defaultCartState = {
  items: [],
  totalAmount: 0,
};
const cartReducer = (state, action) => {

  //Add item in the cart logic
  if (action.type === "ADD") {
    //I update the new total amount
    const updatedTotalAmount =
      state.totalAmount + action.item.price * action.item.amount;

    const existingCartItemIndex = state.items.findIndex(item => item.id === action.item.id); //i save the indexes of the items in the cart
    const existingCartItem = state.items[existingCartItemIndex]; // i save the existing item in the cart
    let updatedItems;

    if (existingCartItem){ // if it exist, i update the amount
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + action.item.amount
      };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    } else { // if it doesnt exist, i create a new one
      updatedItems = state.items.concat(action.item)
    }

    // Remove item from the cart logic
    
    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }
  if (action.type === "REMOVE") {
    //Update the cart/existing cartItemn if the amount is more than 1
    const existingCartItemIndex = state.items.findIndex(item => item.id === action.id); //i find the index of an existing item in the cart
    const existingItem = state.items[existingCartItemIndex]; // getting the item itself
    
    const updatedTotalAmount = state.totalAmount - existingItem.price // decreases the total amount by the price of the item selected
    let updatedItems;
    if (existingItem.amount === 1) { // if we only have one item left in the car we want to delete it from the cart
      updatedItems = state.items.filter(item => item.id !== action.id); // we generate a new array and there
                                                                        //we make sure here that all items where the id is not equal to the action.id are kept
    } else { // we want to keep the item in the cart but decrease the amount
      const updatedItem = { ...existingItem, amount: existingItem.amount - 1 }; //we update the amount copying the existing object with the spread operator
                                                                              // and we just update the amount
      updatedItems = [...state.items]; // creates a new array with the new items
      updatedItems[existingCartItemIndex] = updatedItem; //and we override the updated item with the new values
    }
    return { // we return everything updated back in this object
      items: updatedItems,
      totalAmount: updatedTotalAmount
    }
  }
  return defaultCartState;
};



const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  const addItemToCartHandler = (item) => {
    dispatchCartAction({ type: "ADD", item: item });
  };

  const removeItemFromCartHandler = (id) => {
    dispatchCartAction({ type: "REMOVE", id: id });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
  };
  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
