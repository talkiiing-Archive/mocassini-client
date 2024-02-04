import { FC } from "react";
import { Card } from "react-daisyui";

type ShoeCardProps = {
  id: number;
  name: string;
  brandName: string;
  price: number;
  imageUrl: string;
};

export const ShoeCard: FC<ShoeCardProps> = ({
  id,
  name,
  brandName,
  price,
  imageUrl,
}) => {
  return (
    <a href={`/shoes/${id}`}>
      <Card>
        <Card.Image
          className="aspect-square object-contain"
          src={imageUrl}
          alt="Card image"
        />
        <Card.Body>
          <Card.Title>
            {brandName} {name}
          </Card.Title>

          <p>{price.toLocaleString("ru")} ₽</p>
        </Card.Body>
      </Card>
    </a>
  );
};
