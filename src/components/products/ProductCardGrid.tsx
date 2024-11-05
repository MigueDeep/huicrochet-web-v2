import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import ColorCircle from "../common/ColorCircle";
import { Chip } from "@nextui-org/react";

interface ProductCardGridProps {
  image: string;
  title: string;
  description: string;
  category: string;
  quantity: number;
  price: number;
  colors: string[];
  status: number;
  onEdit: () => void;
}

export const ProductCardGrid: React.FC<ProductCardGridProps> = ({
  image,
  title,
  description,
  category,
  quantity,
  price,
  colors,
  status,
  onEdit,
}) => {
  return (
    <Box sx={{ width: 400 }}>
      <Card>
        <CardMedia
          sx={{ height: 400, width: 400 }}
          image={image}
          title={title}
        />
        <CardContent className="text-start">
          <p className="card-title">{title}</p>
          <p className="text-secondary">{description}</p>
          <p className="text-secondary">{category}</p>
          <p className="text-secondary">{quantity}</p>
          <p className="fw-bold text-pink">${price.toFixed(2)}</p>
          <div className="d-flex gap-2">
            {colors.map((color, index) => (
              <ColorCircle key={index} color={color} />
            ))}
          </div>
          <Chip
            className="mt-2"
            variant="flat"
            color={status === 1 ? "success" : "danger"}
          >
            {status === 1 ? "Disponible" : "No disponible"}
          </Chip>
        </CardContent>
        <CardActions>
          <Button variant="contained" onClick={onEdit}>
            Ver detalles
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
};
