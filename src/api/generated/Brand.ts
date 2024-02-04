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

import { BrandEntity, CreateBrandRequest } from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class Brand<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags Brand
   * @name GetBrands
   * @request GET:/Brand
   */
  getBrands = (params: RequestParams = {}) =>
    this.request<BrandEntity[], any>({
      path: `/Brand`,
      method: "GET",
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Brand
   * @name CreateBrand
   * @request POST:/Brand
   */
  createBrand = (data: CreateBrandRequest, params: RequestParams = {}) =>
    this.request<BrandEntity, any>({
      path: `/Brand`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Brand
   * @name GetBrand
   * @request GET:/Brand/{id}
   */
  getBrand = (id: number, params: RequestParams = {}) =>
    this.request<BrandEntity, any>({
      path: `/Brand/${id}`,
      method: "GET",
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Brand
   * @name DeleteBrand
   * @request DELETE:/Brand/{id}
   */
  deleteBrand = (id: number, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/Brand/${id}`,
      method: "DELETE",
      ...params,
    });
}
