import { FC } from "react";
import { useParams } from "react-router-dom";
import { parseIntSafe } from "../utils/parseIntSafe.ts";
import useSWR from "swr";
import { client, LOCAL_STORAGE_CART_KEY } from "../api/client.ts";
import { Button, Carousel } from "react-daisyui";

export const ShoePage: FC = () => {
  const params = useParams<{ id: string }>();

  const id = parseIntSafe(params.id, 0);

  const { data: shoe, isLoading: isShoeLoading } = useSWR(
    `shoe-${id}`,
    async () => {
      const shoe = await client.shoe.getShoe(id);
      return shoe.data;
    },
  );

  return (
    <div className="w-full flex flex-col">
      {isShoeLoading ? (
        <p>Загрузка...</p>
      ) : (
        <>
          <Carousel display="slider">
            {shoe?.imagesURLs.map((image) => (
              <Carousel.Item
                key={image}
                className="self-center"
                src={image}
                alt="shoe"
                width="half"
              />
            )) ?? []}
          </Carousel>

          <div className="w-full mt-2">
            <div className="flex flex-row items-center space-x-3 mb-2 mt-12">
              <img
                src={
                  shoe?.brand?.externalLogoId ??
                  "https://raw.githubusercontent.com/cshum/imagor/master/testdata/dancing-banana.gif"
                }
                className="max-w-xs w-10 h-10 object-contain"
              />
              <span className="font-mono font-black">
                {shoe?.brand?.name ?? "Бананбчики"}
              </span>
            </div>

            <h1 className="text-4xl font-mono font-bold">{shoe?.name}</h1>
            <p className="text-xl font-mono mt-3">{shoe?.description}</p>

            <h2 className="mt-6 font-mono text-2xl font-medium">
              Добавить в корзину
            </h2>

            <div className="mt-4 grid grid-cols-8 gap-4">
              {shoe?.shoeSizes?.map((size) => (
                <Button
                  key={size.id}
                  variant="outline"
                  onClick={() => {
                    const currentCartString =
                      localStorage.getItem(LOCAL_STORAGE_CART_KEY) ?? "[]";

                    const currentCart = JSON.parse(currentCartString) as {
                      sizeId: number;
                      quantity: number;
                    }[];

                    const index = currentCart.findIndex(
                      (item) => item.sizeId === size.id,
                    );

                    if (index === -1) {
                      currentCart.push({
                        sizeId: size.id ?? 0,
                        quantity: 1,
                      });
                    } else {
                      currentCart[index].quantity++;
                    }

                    localStorage.setItem(
                      LOCAL_STORAGE_CART_KEY,
                      JSON.stringify(currentCart),
                    );

                    window.location.href = "/cart";
                  }}
                >
                  {size.size} ({size.quantity})
                </Button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};
