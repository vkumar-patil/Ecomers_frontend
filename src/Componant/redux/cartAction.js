// import axios from "axios";

// export const fech_product_Request = "fech_product_Request";
// export const fech_product_Success = "fech_product_Success";
// export const fech_product_Fail = "fech_product_Fail";
// export const update_product_quantity = "update_product_quantity";
// export const fechProductRequest = () => {
//   return {
//     type: fech_product_Request,
//   };
// };
// export const fechProductSuccess = (product, totalPrice, totalQuantity) => {
//   return {
//     type: fech_product_Success,
//     payload: { product, totalPrice, totalQuantity },
//   };
// };
// export const fechProductFail = (error) => {
//   return { type: fech_product_Fail, payload: error };
// };
// export const UpdateProductQuantity = (updateQuantity) => {
//   return {
//     type: update_product_quantity,
//     payload: updateQuantity,
//   };
// };

// export const fechdata = () => {
//   const token = localStorage.getItem("token");

//   return async (dispach) => {
//     dispach(fechProductRequest());
//     try {
//       const response = await axios.get(
//         "http://localhost:8001/api/user/get-cart",
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       const product = response.data?.data?.items || [];
//       const totalQuantity = response.data?.data?.totalQuantity || 0;
//       const totalPrice = response.data?.data?.totalPrice || 0;

//       console.log(product);
//       console.log(totalPrice);
//       console.log(totalQuantity);
//       dispach(fechProductSuccess(product, totalPrice, totalQuantity));
//     } catch (error) {
//       dispach(fechProductFail(error));
//     }
//   };
// };
// export const updateProductQuantity = (productId, newQuantity) => {
//   const token = localStorage.getItem("token");

//   return async (dispatch) => {
//     try {
//       const response = await axios.put(
//         `http://localhost:8001/api/user/update-quantity/${productId}`,
//         { quantity: newQuantity }, // Ensure this matches the backend expectation
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       if (response.status === 200) {
//         const updateQuantity = response.data?.data;
//         dispatch(UpdateProductQuantity(updateQuantity));
//       } else {
//         throw new Error("Failed to update product quantity");
//       }
//     } catch (error) {
//       console.error("Error in updateProductQuantity:", error);
//       dispatch(fechProductFail(error));
//     }
//   };
// };
