import Button from "@mui/material/Button";

const CustomerPage = () => {
    return (
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
                    <Button className="text-start mx-4" variant="contained" size="large" href="/">
                        Volver al Inicio
                    </Button>
                    <Button className="text-start" variant="contained" size="large" href="https://play.google.com/store/games?hl=es_MX" target="_blank">
                        Descargar app
                    </Button>
                    
                </div>
                <div className="col ">
                    <img className="phone-image" src="phone.png" alt="phone" />
                </div>
            </div>
        </div>
    )
};

export default CustomerPage;
