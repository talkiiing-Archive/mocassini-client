import { FC } from "react";
import useSWR from "swr";
import { client } from "../api/client.ts";
import { ShoeCard } from "../components/ShoeCard.tsx";

export const Home: FC = () => {
  const { data: shoes, isLoading: isLoadingShoes } = useSWR(
    "shoes-list",
    async () => {
      const shoes = await client.shoe.getShoes();

      return shoes.data;
    },
  );

  return (
    <div>
      {isLoadingShoes ? (
        <p>Загрузка...</p>
      ) : (
        <div className="grid grid-cols-3 gap-4">
          {shoes?.map((shoe) => (
            <ShoeCard
              key={shoe.id}
              name={shoe.name}
              id={shoe.id ?? 0}
              imageUrl={shoe.imagesURLs[0]}
              brandName={shoe.brand?.name ?? "Аибас"}
              price={shoe.price / 100}
            />
          ))}
        </div>
      )}
    </div>
  );
};
