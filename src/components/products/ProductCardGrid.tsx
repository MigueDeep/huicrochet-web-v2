import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import ColorCircle from "../common/ColorCircle";
import { Chip } from "@nextui-org/react";
import { ButtonGroup, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
interface ProductCardGridProps {
  image: string;
  title: string;
  description: string;
  category: string;
  quantity: number;
  price: number;
  colors: string[];
  status: number;
  onView: () => void;
  onEdit: () => void;
  onChangeStatus: () => void;
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
  onChangeStatus,
  onView,
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
          <p className="text-secondary mt-1">{description}</p>
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
        <CardActions sx={{ justifyContent: "end", padding: 2 }}>
          <ButtonGroup>
            <IconButton aria-label="Ver detalles" onClick={onView}>
              <RemoveRedEyeOutlinedIcon />
            </IconButton>
            <IconButton aria-label="Editar" onClick={onEdit}>
              <EditIcon />
            </IconButton>
            <IconButton
              aria-label={status === 1 ? "Desactivar" : "Activar"}
              onClick={onChangeStatus}
            >
              <DeleteOutlineIcon />
            </IconButton>
          </ButtonGroup>
        </CardActions>
      </Card>
    </Box>
  );
};
