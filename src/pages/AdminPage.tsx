import { FC, useState } from "react";
import useSWR from "swr";
import { client } from "../api/client.ts";
import { OrderEntity, OrderStatus } from "../api/generated/data-contracts.ts";

const STATUSES = [
  OrderStatus.Pending,
  OrderStatus.Processing,
  OrderStatus.Shipped,
  OrderStatus.Delivered,
  OrderStatus.Cancelled,
];

const AdminPageRow: FC<{ order: OrderEntity }> = ({ order }) => {
  const [trackingNumber, setTrackingNumber] = useState(order.trackingNumber);
  const [status, setStatus] = useState(order.status);
  const [isUpdating, setIsUpdating] = useState<boolean>(false);

  return (
    <div className="flex flex-col space-y-5 p-5 border border-gray-300 rounded-md">
      <p>Номер заказа: {order.id}</p>
      <p>Дата заказа: {order.createdAt}</p>

      <div>Статус: </div>
      <select
        className="select select-accent"
        value={status}
        onChange={(e) => setStatus(e.target.value as OrderStatus)}
      >
        {STATUSES.map((status) => (
          <option value={status}>{status}</option>
        ))}
      </select>

      {/*<p>Сумма заказа: {order.totalPrice}</p>*/}
      <p>Товары:</p>
      {order.items?.map((orderItem) => (
        <div>
          <p>Название: {orderItem.shoeSize?.shoe?.name}</p>
          <p>Цена: {(orderItem.shoeSize?.shoe?.price ?? 0) / 100} руб</p>
          <p>Количество: {orderItem.quantity}</p>
          <p>Размер: {orderItem.shoeSize?.size}</p>
        </div>
      ))}

      {order.trackingNumber ? (
        <a href={`https://www.pochta.ru/tracking#${trackingNumber}`}>
          Отследить на сайте Почты России
        </a>
      ) : (
        <div>
          <p>Трекинг-номер ещё не выдан</p>

          <div>Выдать: </div>
          <input
            type="text"
            className="input input-sm input-accent"
            value={trackingNumber ?? ""}
            onChange={(e) => setTrackingNumber(e.target.value)}
          />
        </div>
      )}

      <button
        className="btn"
        onClick={() => {
          setIsUpdating(true);
          client.order
            .patchOrder(order.id ?? 0, {
              trackingNumber: trackingNumber,
              status: status,
            })
            .then(() => setIsUpdating(false));
        }}
      >
        {isUpdating ? "Сохранение..." : "Сохранить"}
      </button>
    </div>
  );
};

export const AdminPage: FC = () => {
  const {
    data: orders,
    isLoading,
    error,
  } = useSWR("all-orders/admin", () => {
    return client.order.getAllOrders().then((res) => res.data);
  });

  if (isLoading) {
    return <p>Загрузка...</p>;
  }

  if (error) {
    return <p>Ошибка: {JSON.stringify(error)}</p>;
  }

  return (
    <div>
      <h1 className="text-4xl">Admin</h1>

      <div className="flex flex-col space-y-5">
        {orders?.map((order) => <AdminPageRow order={order} key={order.id} />)}
      </div>
    </div>
  );
};
