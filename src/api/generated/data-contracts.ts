/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface AddressVO {
  countryCode?: string | null;
  state?: string | null;
  city?: string | null;
  street?: string | null;
  building?: string | null;
  apartment?: string | null;
  zipCode?: string | null;
}

export interface AuthenticateRequest {
  /** @minLength 1 */
  username: string;
  /** @minLength 1 */
  password: string;
}

export interface AuthenticateResponse {
  /** @format int32 */
  id?: number;
  username?: string | null;
  role?: Role;
  token?: string | null;
}

export interface BrandEntity {
  /** @format int32 */
  id?: number;
  /**
   * @minLength 1
   * @maxLength 50
   * @pattern ^[a-zA-Zа-яёА-ЯЁ0-9 ]*$
   */
  name: string;
  /**
   * @minLength 1
   * @maxLength 500
   * @pattern ^[a-zA-Zа-яёА-ЯЁ0-9 ]*$
   */
  description: string;
  externalLogoId?: string | null;
  shoes?: ShoeEntity[] | null;
}

export interface CreateBrandRequest {
  name?: string | null;
  description?: string | null;
  externalLogoId?: string | null;
}

export interface CreateOrderRequest {
  items?: CreateOrderRequestItem[] | null;
  address?: AddressVO;
  comment?: string | null;
}

export interface CreateOrderRequestItem {
  /** @format int32 */
  shoeSizeId?: number;
  /** @format int32 */
  quantity?: number;
}

export interface CreateShoeRequest {
  name?: string | null;
  description?: string | null;
  barcode?: string | null;
  /** @format int32 */
  brandId?: number;
  /** @format int32 */
  price?: number;
  shoeSizes?: Record<string, number>;
}

export interface CreateUserRequest {
  name?: string | null;
  surname?: string | null;
  username?: string | null;
  password?: string | null;
}

export interface OrderEntity {
  /** @format int32 */
  id?: number;
  address: AddressVO;
  /** @format int32 */
  userId: number;
  user?: UserEntity;
  status: OrderStatus;
  comment?: string | null;
  trackingNumber?: string | null;
  items?: OrderItemEntity[] | null;
  /** @format date-time */
  createdAt: string;
}

export interface OrderItemEntity {
  /** @format int32 */
  id?: number;
  /** @format int32 */
  quantity: number;
  /** @format int32 */
  shoeSizeId: number;
  shoeSize?: ShoeSizeEntity;
  /** @format int32 */
  orderId: number;
  order?: OrderEntity;
}

export enum OrderStatus {
  Pending = "Pending",
  Processing = "Processing",
  Shipped = "Shipped",
  Delivered = "Delivered",
  Cancelled = "Cancelled",
}

export interface PatchOrderRequest {
  status?: OrderStatus;
  trackingNumber?: string | null;
}

export enum Role {
  Customer = "Customer",
  Storekeeper = "Storekeeper",
}

export interface ShoeEntity {
  /** @format int32 */
  id?: number;
  /**
   * @minLength 1
   * @maxLength 50
   * @pattern ^[a-zA-Zа-яёА-ЯЁ0-9 ]*$
   */
  name: string;
  /**
   * @format int32
   * @min 0
   * @max 2147483647
   */
  price: number;
  /**
   * @minLength 1
   * @maxLength 50
   */
  barcode: string;
  /**
   * @minLength 1
   * @maxLength 500
   * @pattern ^[a-zA-Zа-яёА-ЯЁ0-9 ]*$
   */
  description: string;
  gender: ShoeGender;
  imagesURLs: string[];
  /** @format int32 */
  brandId: number;
  brand?: BrandEntity;
  shoeSizes?: ShoeSizeEntity[] | null;
}

export enum ShoeGender {
  Male = "Male",
  Female = "Female",
  Unisex = "Unisex",
}

export interface ShoeSizeEntity {
  /** @format int32 */
  id?: number;
  /** @format int32 */
  shoeId: number;
  shoe?: ShoeEntity;
  /** @format int32 */
  size: number;
  /** @format int32 */
  quantity: number;
  orderItems?: OrderItemEntity[] | null;
}

export interface UserEntity {
  /** @format int32 */
  id?: number;
  /**
   * @minLength 1
   * @maxLength 50
   * @pattern ^[a-zA-Zа-яёА-ЯЁ0-9 ]*$
   */
  name: string;
  /**
   * @minLength 1
   * @maxLength 50
   * @pattern ^[a-zA-Zа-яёА-ЯЁ0-9 ]*$
   */
  surname: string;
  /** @format tel */
  phoneNumber?: string | null;
  /**
   * @minLength 1
   * @maxLength 50
   * @pattern ^[a-zA-Zа-яёА-ЯЁ0-9 ]*$
   */
  username: string;
  role: Role;
  orders?: OrderEntity[] | null;
}
