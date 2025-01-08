// import {
//   fech_product_Request,
//   fech_product_Success,
//   fech_product_Fail,
//   update_product_quantity,
// } from "./cartAction";

// const initialState = {
//   product: [],
//   totalQuantity: 0,
//   totalPrice: 0,
//   isLoding: false,
//   error: null,
// };
// const cartReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case fech_product_Request:
//       return {
//         ...state,
//         isLoding: true,
//         error: null,
//       };
//     case fech_product_Success:
//       return {
//         ...state,
//         isLoding: false,
//         product: action.payload.product,
//         totalPrice: action.payload.totalPrice,
//         totalQuantity: action.payload.totalQuantity,
//       };
//     case fech_product_Fail:
//       return {
//         ...state,
//         isLoding: false,
//         error: action.paload,
//       };
//       case update_product_quantity:
//         return {
//           ...state,
//           product: state.product.map((item) =>
//             item.productID._id === action.payload.productID
//               ? { ...item, quantity: action.payload.quantity }
//               : item
//           ),
//         };
      

//     default:
//       return state;
//   }
// };
// export default cartReducer;
