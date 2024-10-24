import React, { useState } from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Rating from "@mui/material/Rating";
import CardActions from "@mui/material/CardActions";

interface CardProductProps {
  image: string;
  title: string;
  description: string;
  price: string;
  rating: number;
}

const CardProductVertical: React.FC<CardProductProps> = ({
  image,
  title,
  description,
  price,
  rating,
}) => {
  const theme = useTheme();
  const [value, setValue] = useState<number | null>(rating);

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        margin: 5,
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
        borderRadius: 2,
        overflow: "hidden",
      }}
    >
      <CardMedia
        component="img"
        sx={{ height: 200, width: 300 }}
        image={image}
        title={title}
      />
      <Box
        sx={{ display: "flex", flexDirection: "column", flex: 1, padding: 2 }}
      >
        <CardContent sx={{ textAlign: "left" }}>
          <Typography variant="h6" component="div" className="card-title">
            {title}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            className="text-secondary"
          >
            {description}
          </Typography>
          <Typography
            variant="h6"
            component="div"
            className="fw-bold text-pink"
          >
            {price}
          </Typography>
          <Rating
            value={value}
            onChange={(event, newValue) => setValue(newValue)}
          />
        </CardContent>
        <CardActions>
          <Button variant="contained" color="primary" fullWidth>
            Ver producto
          </Button>
        </CardActions>
      </Box>
    </Card>
  );
};

export default CardProductVertical;
