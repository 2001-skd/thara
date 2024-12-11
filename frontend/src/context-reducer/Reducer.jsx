export const cartReducer = (state, action) => {
  switch (action.type) {
    case "add_to_cart":
      return [...state, { ...action.payload, qty: 1 }];

    // case for deleting
    case "delete_from_cart":
      return state.filter((item) => item.id !== action.payload.id);

    case "update_quantity":
      return state.map((item) =>
        item.id === action.payload.id
          ? { ...item, qty: action.payload.qty } // Update the quantity
          : item
      );

    default:
      return state;
  }
};
