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

import { AuthenticateRequest, AuthenticateResponse, CreateUserRequest, UserEntity } from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class User<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags User
   * @name GetUsers
   * @request GET:/User
   */
  getUsers = (params: RequestParams = {}) =>
    this.request<UserEntity[], any>({
      path: `/User`,
      method: "GET",
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags User
   * @name CreateUser
   * @request POST:/User
   */
  createUser = (data: CreateUserRequest, params: RequestParams = {}) =>
    this.request<UserEntity, any>({
      path: `/User`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags User
   * @name GetUser
   * @request GET:/User/{id}
   */
  getUser = (id: number, params: RequestParams = {}) =>
    this.request<UserEntity, any>({
      path: `/User/${id}`,
      method: "GET",
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags User
   * @name DeleteUser
   * @request DELETE:/User/{id}
   */
  deleteUser = (id: number, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/User/${id}`,
      method: "DELETE",
      ...params,
    });
  /**
   * No description
   *
   * @tags User
   * @name GetMe
   * @request GET:/User/me
   */
  getMe = (params: RequestParams = {}) =>
    this.request<UserEntity, any>({
      path: `/User/me`,
      method: "GET",
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags User
   * @name Authenticate
   * @request POST:/User/authenticate
   */
  authenticate = (data: AuthenticateRequest, params: RequestParams = {}) =>
    this.request<AuthenticateResponse, any>({
      path: `/User/authenticate`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
}
