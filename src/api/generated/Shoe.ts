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

import { CreateShoeRequest, ShoeEntity, ShoeSizeEntity } from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class Shoe<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags Shoe
   * @name GetShoes
   * @request GET:/Shoe
   */
  getShoes = (
    query?: {
      Name?: string;
      /** @format int32 */
      BrandId?: number;
      /** @format int32 */
      MinPrice?: number;
      /** @format int32 */
      MaxPrice?: number;
    },
    params: RequestParams = {},
  ) =>
    this.request<ShoeEntity[], any>({
      path: `/Shoe`,
      method: "GET",
      query: query,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Shoe
   * @name CreateShoe
   * @request POST:/Shoe
   */
  createShoe = (data: CreateShoeRequest, params: RequestParams = {}) =>
    this.request<ShoeEntity, any>({
      path: `/Shoe`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Shoe
   * @name GetShoe
   * @request GET:/Shoe/{id}
   */
  getShoe = (id: number, params: RequestParams = {}) =>
    this.request<ShoeEntity, any>({
      path: `/Shoe/${id}`,
      method: "GET",
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Shoe
   * @name DeleteShoe
   * @request DELETE:/Shoe/{id}
   */
  deleteShoe = (id: number, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/Shoe/${id}`,
      method: "DELETE",
      ...params,
    });
  /**
   * No description
   *
   * @tags Shoe
   * @name GetShoesBySizes
   * @request GET:/Shoe/sizes
   */
  getShoesBySizes = (
    query?: {
      sizes?: number[];
    },
    params: RequestParams = {},
  ) =>
    this.request<ShoeSizeEntity[], any>({
      path: `/Shoe/sizes`,
      method: "GET",
      query: query,
      format: "json",
      ...params,
    });
}
