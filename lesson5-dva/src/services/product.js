import request from "../utils/request";

export async function getProductData(params) {
  return request("/api/getProductData", {
    data: params,
    method: "post"
  });
}
