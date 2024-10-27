import { ProductCardGrid } from "./ProductCardGrid";

const products = [
  {
    id: 1,
    image: "/snoopyVerde.jpg",
    title: "Snoopy",
    description: "El perro mas fabuloso verde",
    category: "Jugetes",
    quantity: 67,
    price: 230.0,
    status: 1,
    colors: ["pink", "blue", "green"],
    onEdit: () => console.log("Edit product 1"),
  },
  {
    id: 2,
    image: "/ropa.jpg",
    title: "Snoopy",
    description: "El perro mas fabuloso rosa",
    category: "Jugetes",
    quantity: 67,
    price: 230.0,
    status: 1,

    colors: ["pink", "blue", "green"],
    onEdit: () => console.log("Edit product 2"),
  },
  {
    id: 3,
    image: "/snoopyAzul.jpg",
    title: "Snoopy",
    description: "El perro mas fabuloso azul",
    category: "Jugetes",
    quantity: 67,
    price: 230.0,
    colors: ["pink", "blue", "green"],
    status: 1,

    onEdit: () => console.log("Edit product 3"),
  },
  {
    id: 4,
    image: "/sueterazul.jpg",
    title: "Snoopy",
    description: "El perro mas fabuloso amarillo",
    category: "Jugetes",
    quantity: 67,
    price: 230.0,
    status: 1,

    colors: ["pink", "blue", "green"],
    onEdit: () => console.log("Edit product 4"),
  },
  {
    id: 5,
    image: "/perro.jpeg",
    title: "Snoopy",
    description: "El perro mas fabuloso rojo",
    category: "Jugetes",
    quantity: 67,
    price: 230.0,
    status: 1,

    colors: ["pink", "blue", "green"],
    onEdit: () => console.log("Edit product 5"),
  },
  {
    id: 6,
    image: "/pajaro.jpg",
    title: "Snoopy",
    description: "El perro mas fabuloso naranja",
    category: "Jugetes",
    quantity: 67,
    status: 1,

    price: 230.0,
    colors: ["pink", "blue", "green"],
    onEdit: () => console.log("Edit product 6"),
  },
];

<div className="container-fluid">
  <div className="row text-center">
    {products.map((product) => (
      <div key={product.id} className="mb-4 col-12 col-sm-6 col-md-3">
        <ProductCardGrid {...product} />
      </div>
    ))}
  </div>
</div>;
