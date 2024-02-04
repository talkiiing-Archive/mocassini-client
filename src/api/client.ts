import { Brand } from "./generated/Brand.ts";
import { Shoe } from "./generated/Shoe.ts";
import { User } from "./generated/User.ts";
import { Order } from "./generated/Order.ts";

export const LOCAL_STORAGE_TOKEN_KEY = "api_token";
export const LOCAL_STORAGE_CART_KEY = "cart";

const API_TOKEN = localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY);

const API_URL = "http://localhost:5022";
const BASE_API_PARAMS = API_TOKEN
  ? { headers: { Authorization: `Bearer ${API_TOKEN}` } }
  : {};

export const client = {
  brand: new Brand({
    baseUrl: API_URL,
    baseApiParams: BASE_API_PARAMS,
  }),
  shoe: new Shoe({
    baseUrl: API_URL,
    baseApiParams: BASE_API_PARAMS,
  }),
  user: new User({
    baseUrl: API_URL,
    baseApiParams: BASE_API_PARAMS,
  }),
  order: new Order({
    baseUrl: API_URL,
    baseApiParams: BASE_API_PARAMS,
  }),
};
