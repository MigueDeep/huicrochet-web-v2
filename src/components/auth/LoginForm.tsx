import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Button,
  CircularProgress,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import React, { useState } from "react";
import AuthService from "../../service/AuthService";
import { useNavigate } from "react-router-dom";

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Correo inválido")
    .required("El correo es requerido"),
  password: Yup.string().required("La contraseña es requerida"),
});

const Loginform = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setIsLoading(true);
      try {
        const response = await AuthService.login(values);
        localStorage.setItem("token", response.data.token);
        window.location.replace("/dashboard");
      } catch (error) {
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
  });

  return (
    <div className="card" style={styles.card}>
      <div className="card-body d-flex flex-column">
        <h5 className="text-wine" style={{ fontWeight: "inherit" }}>
          Bienvenido!
        </h5>
        <h2 className="text-wine mt-4">Iniciar sesión</h2>
        <h6 className="text-wine" style={{ fontWeight: "inherit" }}>
          Calidad en cada puntada, arte en cada detalle.
        </h6>
        <form onSubmit={formik.handleSubmit}>
          <FormControl
            sx={{ width: "100%" }}
            variant="outlined"
            className="mt-5"
          >
            <TextField
              id="email"
              label="Correo"
              variant="outlined"
              placeholder="Ingresa tu correo"
              style={styles.input}
              {...formik.getFieldProps("email")}
              error={formik.touched.email && Boolean(formik.errors.email)}
            />
            {formik.touched.email && formik.errors.email && (
              <p style={{ color: "red" }}>{formik.errors.email}</p>
            )}
          </FormControl>

          <FormControl
            sx={{ width: "100%" }}
            variant="outlined"
            className="mt-4"
          >
            <InputLabel htmlFor="outlined-adornment-password">
              Contraseña
            </InputLabel>
            <OutlinedInput
              id="password"
              type={showPassword ? "text" : "password"}
              {...formik.getFieldProps("password")}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Contraseña"
              error={formik.touched.password && Boolean(formik.errors.password)}
            />
            {formik.touched.password && formik.errors.password && (
              <p style={{ color: "red" }}>{formik.errors.password}</p>
            )}
          </FormControl>

          <FormControl
            sx={{ width: "100%" }}
            variant="outlined"
            className="mt-4"
          >
            <Button
              sx={{ p: 1.5 }}
              variant="contained"
              type="submit"
              disabled={isLoading}
              startIcon={
                isLoading && <CircularProgress size={24} color="inherit" />
              }
            >
              {isLoading ? "Cargando..." : "Iniciar sesión"}
            </Button>
          </FormControl>
        </form>
      </div>
    </div>
  );
};

export default Loginform;

const styles = {
  input: {
    width: "100%",
  },
  card: {
    height: "61%",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
    borderRadius: 18,
    border: "none",
    padding: 20,
  },
};
