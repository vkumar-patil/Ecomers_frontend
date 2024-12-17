// import { createSlice } from "@reduxjs/toolkit";

// const cartslice = createSlice({
//   name: "cart",
//   initialState: { items: [], totalquantity: 0, totalprice: 0 },
//   reducers: {
//     addtocart: (state, action) => {
//       const newitem = action.payload;
//       const existingitem = state.items.find((item) => item.id === newitem.id);

//       if (existingitem) {
//         // Create a new items array and update the existing item
//         const updatedItems = state.items.map((item) =>
//           item.id === existingitem.id
//             ? {
//                 ...item,
//                 quantity: item.quantity + 1,
//                 totalprice: item.totalprice + newitem.price,
//               }
//             : item
//         );
//         return {
//           ...state,
//           items: updatedItems,
//           totalquantity: state.totalquantity + 1,
//           totalprice: state.totalprice + newitem.price,
//         };
//       } else {
//         // If item doesn't exist, add a new item
//         return {
//           ...state,
//           items: [
//             ...state.items,
//             {
//               id: newitem.id,
//               name: newitem.name,
//               price: newitem.price,
//               quantity: 1,
//               totalprice: newitem.price,
//             },
//           ],
//           totalquantity: state.totalquantity + 1,
//           totalprice: state.totalprice + newitem.price,
//         };
//       }
//     },

//     removeFromcart: (state, action) => {
//       const id = action.payload;
//       const existingitem = state.items.find((item) => item.id === id);

//       if (existingitem) {
//         const updatedItems = state.items.filter((item) => item.id !== id);
//         return {
//           ...state,
//           items: updatedItems,
//           totalquantity: state.totalquantity - existingitem.quantity,
//           totalprice: state.totalprice - existingitem.totalprice,
//         };
//       }
//       return state; // Return unchanged state if no item found
//     },
//   },
// });

// export const { addtocart, removeFromcart } = cartslice.actions;
// export default cartslice.reducer;
