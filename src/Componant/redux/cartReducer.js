import {
  fech_product_Request,
  fech_product_Success,
  fech_product_Fail,
} from "./cartAction";

const initialState = {
  product: [],
  isLoding: false,
  error: null,
};
const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case fech_product_Request:
      return {
        ...state,
        isLoding: true,
        error: null,
      };
    case fech_product_Success:
      return {
        ...state,
        isLoding: false,
        product: action.payload,
      };
    case fech_product_Fail:
      return {
        ...state,
        isLoding: false,
        error: action.paload,
      };
    default:
      return state;
  }
};
export default cartReducer;
