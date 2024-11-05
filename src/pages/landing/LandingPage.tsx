import "../../styles/landing/landing.css";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Rating from "@mui/material/Rating";
import React from "react";
const LandingPage = () => {
  const [value, setValue] = React.useState<number | null>(2);
  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <div className="navbar row">
        <div className="logo text-white col-5">
          <img className="logo_image" src="/logo.png" alt="logo" />
          HUICROCHET
        </div>
        <div className="menu col-7 text-white text-semibold click">
          <a onClick={() => scrollToSection("inicio")}>Inicio</a>
          <a onClick={() => scrollToSection("categorias")}>Categorías</a>
          <a onClick={() => scrollToSection("productos")}>Productos</a>
          <a onClick={() => scrollToSection("contacto")}>Contacto</a>
        </div>
      </div>
      <div id="inicio" className="container text-center">
        <div className="row banner">
          <div className="col img-container">
            <img src="banner.png" alt="banner" />
          </div>
          <div className="col card-banner align-self-end">
            <div className="banner-text-container">
              <h1 className="text-start title-white ">
                Arte en cada puntada, calidad en cada detalle.
              </h1>
              <p className="text-start text-white">
                ¡Bienvenidos a nuestra exclusiva colección de crochet, diseñada
                para los amantes de la artesanía y el estilo sofisticado!
              </p>
              <Button
                onClick={() => scrollToSection("app")}
                variant="contained"
              >
                Comprar ahora
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <p className="text-center text-brown mt-4 ">
          Sumérgete en el mundo del crochet con nuestra amplia gama de
          categorías, donde la tradición artesanal se fusiona con la moda y el
          diseño contemporáneo.
        </p>
        <h1 id="categorias" className="text-center title">
          Nuestras categorías
        </h1>
        <div className="container text-center">
          <div className="row">
            <div className="col">
              <img className="img-category" src="/pajaro.jpg" alt="category" />
              <p className="card-title">Figuras</p>
            </div>
            <div className="col">
              <img className="img-category" src="ropa.jpg" alt="category" />
              <p className="card-title">Ropa</p>
            </div>
            <div className="col">
              <img
                className="img-category"
                src="interiores.jpg"
                alt="category"
              />
              <p className="card-title">Decoración</p>
            </div>
          </div>
        </div>
        <div className="container my-5">
          <h1 id="productos" className="text-center title">
            Nuestros productos
          </h1>
          <div className="row text-center g-4">
            <div className="col-md-4">
              <Card>
                <CardMedia
                  sx={{ height: 300 }}
                  image="/snoopyVerde.jpg"
                  title="Pajaro"
                />
                <CardContent className="text-start">
                  <p className="card-title">Snoopy Verde</p>
                  <p className="text-secondary">
                    El perro mas fabuloso verde
                  </p>
                  <p className="fw-bold text-pink">$230.00</p>
                  <Rating
                    value={value}
                    onChange={(event, newValue) => setValue(newValue)}
                    disabled
                  />
                </CardContent>
                <CardActions>
                  <Button   onClick={() => scrollToSection("app")}variant="contained">Comprar ahora</Button>
                </CardActions>
              </Card>
            </div>
            <div className="col-md-4">
              <Card>
                <CardMedia
                  sx={{ height: 300 }}
                  image="/snoopyAzul.jpg"
                  title="Pajaro"
                />
                <CardContent className="text-start">
                  <p className="card-title">Snoopy</p>
                  <p className="text-secondary">
                    El perro mas fabuloso
                  </p>
                  <p className="fw-bold text-pink">$240.00</p>
                  <Rating
                    value={value}
                    onChange={(event, newValue) => setValue(newValue)}
                  />
                </CardContent>
                <CardActions>
                 <Button
                onClick={() => scrollToSection("app")}
                variant="contained"
              >
                Comprar ahora
              </Button>
                </CardActions>
              </Card>
            </div>
            <div className="col-md-4">
              <Card>
                <CardMedia
                  sx={{ height: 300 }}
                  image="/stich.jpg"
                  title="Pajaro"
                />
                <CardContent className="text-start">
                  <p className="card-title">Stich</p>
                  <p className="text-secondary">
                    Un alienijena muy tierno y alocado 
                  </p>
                  <p className="fw-bold text-pink">$300.00</p>
                  <Rating
                    value={value}
                    onChange={(event, newValue) => setValue(newValue)}
                  />
                </CardContent>
                <CardActions>
                  <Button
                onClick={() => scrollToSection("app")}
                variant="contained"
              >
                Comprar ahora
              </Button>
                </CardActions>
              </Card>
            </div>
            <div className="col-md-4">
              <Card>
                <CardMedia
                  sx={{ height: 300 }}
                  image="/sueterazul.jpg"
                  title="Pajaro"
                />
                <CardContent className="text-start">
                  <p className="card-title">Sueter   </p>
                  <p className="text-secondary">
                    Abrigo de invierno acogedor
                  </p>
                  <p className="fw-bold text-pink">400.00</p>
                  <Rating
                    value={value}
                    onChange={(event, newValue) => setValue(newValue)}
                  />
                </CardContent>
                <CardActions>
                <Button
                onClick={() => scrollToSection("app")}
                variant="contained"
              >
                Comprar ahora
              </Button>
                </CardActions>
              </Card>
            </div>
            <div className="col-md-4">
              <Card>
                <CardMedia
                  sx={{ height: 300 }}
                  image="/hellokitty.jpg"
                  title="Pajaro"
                />
                <CardContent className="text-start">
                  <p className="card-title">Hello Kitty </p>
                  <p className="text-secondary">
                   Gatita muy tierna
                  </p>
                  <p className="fw-bold text-pink">$180.00</p>
                  <Rating
                    value={value}
                    onChange={(event, newValue) => setValue(newValue)}
                  />
                </CardContent>
                <CardActions>
                <Button
                onClick={() => scrollToSection("app")}
                variant="contained"
              >
                Comprar ahora
              </Button>
                </CardActions>
              </Card>
            </div>
            <div className="col-md-4">
              <Card>
                <CardMedia
                  sx={{ height: 300 }}
                  image="/bolsa.jpg"
                  title="Pajaro"
                />
                <CardContent className="text-start">
                  <p className="card-title">Bola de mano</p>
                  <p className="text-secondary">
                  Increible bolsa de mano tejida
                  </p>
                  <p className="fw-bold text-pink">$240.00</p>
                  <Rating
                    value={value}
                    onChange={(event, newValue) => setValue(newValue)}
                  />
                </CardContent>
                <CardActions>
                <Button
                onClick={() => scrollToSection("app")}
                variant="contained"
              >
                Comprar ahora
              </Button>
                </CardActions>
              </Card>
            </div>
          </div>
          <div className="text-center mt-4">
            <Button   onClick={() => scrollToSection("app")} variant="outlined">Ver todos los productos</Button>
          </div>
        </div>
      </div>
      <div id='app' className=" text-center">
        <div className="row download mt-4 align-items-center ">
          <div className="col">
            <p className="title-white text-start">Obten HUICROCHET APP</p>
            <p className="text-start text-white ">
              No te pierdas ni un solo detalle de nuestras colecciones
              exclusivas, ofertas y novedades. Con nuestra nueva app móvil,
              tendrás acceso directo a todo nuestro catálogo de productos de
              crochet de alta calidad, en cualquier momento y lugar.
            </p>
            <Button className="text-start" variant="contained" size="large" href="https://play.google.com/store/games?hl=es_MX" target="_blank">
              Descargar app
            </Button>
          </div>
          <div className="col ">
            <img className="phone-image" src="phone.png" alt="phone" />
          </div>
        </div>
      </div>
      <div>
        <footer id="contacto" className="text-center text-lg-start ">
          <div className=" p-4 pb-0">
            <section className="">
              <div className="row">
                <div className="col-md-3 col-lg-3 col-xl-3 mx-auto mt-3">
                  <h6 className="text-uppercase mb-4 font-weight-bold">
                    Huicrochet
                  </h6>
                  <p>
                    Santa Maria Ahucatitlan Prolongación Independencia 9,
                    Cuernavaca Morelos
                  </p>
                </div>

                <hr className="w-100 clearfix d-md-none" />

                <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mt-3">
                  <h6 className="text-uppercase mb-4 font-weight-bold">
                    Links
                  </h6>
                  <p>
                    <a>Inicio</a>
                  </p>
                  <p>
                    <a>Categorías</a>
                  </p>
                  <p>
                    <a>Nuestros productos</a>
                  </p>
                  <p>
                    <a>Contacto</a>
                  </p>
                </div>

                <hr className="w-100 clearfix d-md-none" />

                <div className="col-md-3">
                  <img
                    src="/appleStore.png"
                    alt="apple"
                    className="footer-image-a"
                  />
                </div>

                <hr className="w-100 clearfix d-md-none" />

                <div className="col-md-3">
                  <img
                    src="/playStore.png"
                    alt="play"
                    className="footer-image"
                  />
                </div>
              </div>
            </section>

            <hr className="my-3" />

            <section className="p-3 pt-0">
              <div className="row d-flex align-items-center">
                <div className="col-md-7 col-lg-8 text-center text-md-start">
                  <div className="p-3">
                    2024 HUICROCHET. Todos los derechos reservados
                  </div>
                </div>
              </div>
            </section>
          </div>
        </footer>
      </div>
    </>
  );
};

export default LandingPage;
