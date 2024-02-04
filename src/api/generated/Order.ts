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

import { CreateOrderRequest, OrderEntity, PatchOrderRequest } from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class Order<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags Order
   * @name CreateOrder
   * @request POST:/Order
   */
  createOrder = (data: CreateOrderRequest, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/Order`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags Order
   * @name GetMyOrders
   * @request GET:/Order
   */
  getMyOrders = (params: RequestParams = {}) =>
    this.request<OrderEntity[], any>({
      path: `/Order`,
      method: "GET",
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Order
   * @name GetAllOrders
   * @request GET:/Order/all
   */
  getAllOrders = (params: RequestParams = {}) =>
    this.request<OrderEntity[], any>({
      path: `/Order/all`,
      method: "GET",
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Order
   * @name PatchOrder
   * @request PATCH:/Order/{id}
   */
  patchOrder = (id: number, data: PatchOrderRequest, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/Order/${id}`,
      method: "PATCH",
      body: data,
      type: ContentType.Json,
      ...params,
    });
}
