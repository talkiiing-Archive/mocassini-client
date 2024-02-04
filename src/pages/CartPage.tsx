import { FC, useEffect, useState } from "react";
import { client, LOCAL_STORAGE_CART_KEY } from "../api/client.ts";
import useSWR from "swr";
import { Button, Form, Input, Join, Link, Table } from "react-daisyui";

export const CartPage: FC = () => {
  const [countryCode, setCountryCode] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [street, setStreet] = useState("");
  const [building, setBuilding] = useState("");
  const [apartment, setApartment] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [comment, setComment] = useState("");

  const [items, setItems] = useState<
    {
      sizeId: number;
      quantity: number;
    }[]
  >(
    (() => {
      const items = localStorage.getItem(LOCAL_STORAGE_CART_KEY) ?? "[]";
      return JSON.parse(items);
    })(),
  );

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_CART_KEY, JSON.stringify(items));
  }, [items]);

  const { data = [], isLoading } = useSWR(
    ["cart", items.map((item) => item.sizeId)],
    async () => {
      const cart = await client.shoe.getShoesBySizes({
        sizes: items.map((item) => item.sizeId),
      });

      return cart.data;
    },
  );

  const appendedCart = data.map((shoeSize) => {
    const item = items.find((item) => item.sizeId === shoeSize.id);

    return {
      ...shoeSize,
      quantityToOrder: item?.quantity ?? 0,
    };
  });

  const totalOrderPrice = appendedCart.reduce((acc, shoeSize) => {
    return acc + ((shoeSize.shoe?.price ?? 0) * shoeSize.quantityToOrder) / 100;
  }, 0);

  return (
    <div className="w-full">
      <h1 className="text-4xl font-bold">Корзина</h1>

      {isLoading ? (
        <p>Загрузка...</p>
      ) : (
        <Table className="w-full mt-8" size="lg">
          <Table.Head>
            <span />
            <span>Позиция</span>
            <span>Размер</span>
            <span>Количество</span>
            <span>Сумма</span>
          </Table.Head>

          <Table.Body>
            {appendedCart.map((shoeSize, i) => {
              const shoe = shoeSize.shoe;
              const totalPrice =
                ((shoeSize.shoe?.price ?? 0) * shoeSize.quantityToOrder) / 100;

              return (
                <Table.Row key={shoeSize.id}>
                  <span>{i + 1}</span>
                  <span>
                    <Link href={`/shoes/${shoe?.id}`}>
                      {shoe?.brand?.name}{" "}
                      <span className="font-bold">{shoe?.name}</span>
                    </Link>
                  </span>
                  <span>{shoeSize.size}</span>
                  <span>
                    <Join>
                      <Button
                        onClick={() => {
                          if (shoeSize.quantityToOrder === 1) {
                            return;
                          }

                          const newItems = items.map((item) => {
                            if (item.sizeId === shoeSize.id) {
                              return {
                                ...item,
                                quantity: item.quantity - 1,
                              };
                            }

                            return item;
                          });

                          setItems(newItems);
                        }}
                      >
                        -
                      </Button>
                      <Button>{shoeSize.quantityToOrder}</Button>
                      <Button
                        onClick={() => {
                          if (shoeSize.quantityToOrder === shoeSize.quantity) {
                            return alert(
                              `Нельзя добавить больше товара, чем есть на складе (${shoeSize.quantity})`,
                            );
                          }

                          const newItems = items.map((item) => {
                            if (item.sizeId === shoeSize.id) {
                              return {
                                ...item,
                                quantity: item.quantity + 1,
                              };
                            }

                            return item;
                          });

                          setItems(newItems);
                        }}
                      >
                        +
                      </Button>
                    </Join>

                    <Button
                      className="ml-3"
                      variant="outline"
                      color="error"
                      onClick={() => {
                        const newItems = items.filter(
                          (item) => item.sizeId !== shoeSize.id,
                        );
                        setItems(newItems);
                      }}
                    >
                      Удалить
                    </Button>
                  </span>
                  <span>{totalPrice.toLocaleString("ru")} ₽</span>
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table>
      )}

      <div className="mt-8">
        <p className="text-3xl font-mono">
          Итого:{" "}
          <span className="font-bold">
            {totalOrderPrice.toLocaleString("ru")} ₽
          </span>
        </p>
      </div>

      <Form
        className="mt-8"
        onSubmit={async (e) => {
          e.preventDefault();

          await client.order.createOrder({
            items: items.map((item) => ({
              shoeSizeId: item.sizeId,
              quantity: item.quantity,
            })),
            address: {
              countryCode,
              state,
              city,
              street,
              building,
              apartment,
              zipCode,
            },
            comment,
          });

          localStorage.setItem(LOCAL_STORAGE_CART_KEY, "[]");
          window.location.href = "/profile";
        }}
      >
        <div className="form-control">
          <label className="label">Страна</label>

          <Input
            placeholder="Введите страну"
            value={countryCode}
            onChange={(e) => setCountryCode(e.target.value)}
          />
        </div>

        <div className="form-control">
          <label className="label">Область/край/республика</label>

          <Input
            placeholder="Введите область/край/республику"
            value={state}
            onChange={(e) => setState(e.target.value)}
          />
        </div>

        <div className="form-control">
          <label className="label">Город</label>

          <Input
            placeholder="Введите город"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </div>

        <div className="form-control">
          <label className="label">Улица</label>

          <Input
            placeholder="Введите улицу"
            value={street}
            onChange={(e) => setStreet(e.target.value)}
          />
        </div>

        <div className="form-control">
          <label className="label">Дом</label>

          <Input
            placeholder="Введите дом"
            value={building}
            onChange={(e) => setBuilding(e.target.value)}
          />
        </div>

        <div className="form-control">
          <label className="label">Квартира</label>

          <Input
            placeholder="Введите квартиру"
            value={apartment}
            onChange={(e) => setApartment(e.target.value)}
          />
        </div>

        <div className="form-control">
          <label className="label">Индекс</label>

          <Input
            placeholder="Введите индекс"
            value={zipCode}
            onChange={(e) => setZipCode(e.target.value)}
          />
        </div>

        <div className="form-control">
          <label className="label">Комментарий</label>

          <Input
            placeholder="Введите комментарий"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </div>

        <Button className="mt-16" size="lg" color="primary" type="submit">
          Оформить заказ
        </Button>
      </Form>
    </div>
  );
};
