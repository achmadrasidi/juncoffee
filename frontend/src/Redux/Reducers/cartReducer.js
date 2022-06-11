import { ADD_TO_CART, EMPTY_CART, REMOVE_CART_ITEM } from "../Constants/CartConstants";

export const cartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const { product, variant } = action.payload;
      const prevItems = [...state.cartItems];
      const cartItems = [{ id: product.id, name: product.name, variant, image: product.image }];
      let newItems;
      if (prevItems) {
        const prevItemsIndex = prevItems.findIndex((val) => val.id === product.id);
        if (prevItemsIndex > -1) {
          const preVariantIndex = prevItems[prevItemsIndex].variant.findIndex((v) => v.size === variant[0].size);
          if (preVariantIndex > -1) {
            prevItems[prevItemsIndex].variant[preVariantIndex].quantity += variant[0].quantity;
          } else {
            newItems = [...prevItems[prevItemsIndex].variant, variant[0]];
            prevItems[prevItemsIndex].variant = newItems;
          }
          return { ...state, cartItems: prevItems };
        }
        const objCartItems = Object.assign(...cartItems);
        return { ...state, cartItems: [...prevItems, objCartItems] };
      }
      return { ...state, cartItems };

    case REMOVE_CART_ITEM:
      return { ...state, cartItems: action.payload };
    case EMPTY_CART:
      return { ...state, cartItems: action.payload };
    default:
      return state;
  }
};
