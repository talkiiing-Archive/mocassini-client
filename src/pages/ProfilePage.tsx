import { FC } from "react";
import useSWR from "swr";
import { client } from "../api/client.ts";

export const ProfilePage: FC = () => {
  const { data: orders, isLoading: isLoadingOrders } = useSWR(
    "orders",
    async () => {
      const { data } = await client.order.getMyOrders();

      return data;
    },
  );

  return (
    <div>
      <h1>Profile</h1>

      {isLoadingOrders ? (
        <p>Загрузка...</p>
      ) : (
        <div className="flex flex-col space-y-5">
          {orders?.map((order) => (
            <div>
              <p>Номер заказа: {order.id}</p>
              <p>Дата заказа: {order.createdAt}</p>
              <p>Статус заказа: {order.status}</p>
              {/*<p>Сумма заказа: {order.totalPrice}</p>*/}
              <p>Товары:</p>
              {order.items?.map((orderItem) => (
                <div>
                  <p>Название: {orderItem.shoeSize?.shoe?.name}</p>
                  <p>Цена: {orderItem.shoeSize?.shoe?.price}</p>
                  <p>Количество: {orderItem.quantity}</p>
                  <p>Размер: {orderItem.shoeSize?.size}</p>
                </div>
              ))}

              {order.trackingNumber ? (
                <a
                  href={`https://www.pochta.ru/tracking#${order.trackingNumber}`}
                >
                  Отследить на сайте Почты России
                </a>
              ) : (
                <p>Трекинг-номер ещё не выдан</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
