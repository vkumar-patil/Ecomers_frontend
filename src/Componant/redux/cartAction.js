import axios from "axios";

export const fech_product_Request = "fech_product_Request";
export const fech_product_Success = "fech_product_Success";
export const fech_product_Fail = "fech_product_Fail";

export const fechProductRequest = () => {
  return {
    type: fech_product_Request,
  };
};
export const fechProductSuccess = (product) => {
  return {
    type: fech_product_Success,
    payload: product,
  };
};
export const fechProductFail = (error) => {
  return { type: fech_product_Fail, payload: error };
};
export const fechdata = () => {
  const token = localStorage.getItem("token");

  return async (dispach) => {
    dispach(fechProductRequest());
    try {
      const response = await axios.get(
        "http://localhost:8001/api/user/get-cart",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const product = response.data?.data;
      console.log(product);
      dispach(fechProductSuccess(product.items));
    } catch (error) {
      dispach(fechProductFail(error));
    }
  };
};
