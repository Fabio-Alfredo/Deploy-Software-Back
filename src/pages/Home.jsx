import { Button, Icon } from "@mui/material";

import React from "react";
import { Link } from "react-router-dom";
import CustomInput from "../components/generic/CustomInput";
import { loginSchema } from "../validations/LoginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { People } from "@mui/icons-material";

const Home = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="bg-dominant_color_light flex min-h-screen flex-1 items-center flex-col justify-center py-12 sm:px-6 lg:px-8">
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto">
        <CustomInput
          name="example"
          placeholder="Enter your name"
          // errors={{ message: "This field is required" }}
          icon={<People />}
          hoverEffect={true}
        />
        <CustomInput
          innerRef={register("email")}
          name="email"
          type="email"
          placeholder="Correo electrónico"
          errors={errors.email}
        />
        <CustomInput
          innerRef={register("password")}
          name="password"
          type="password"
          placeholder="Contraseña"
          errors={errors.password}
        />
        <button
          type="submit"
          className="mt-8 w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600"
        >
          Iniciar sesión
        </button>
      </form>

      <div className="flex flex-col gap-6 max-w-[300px] w-full">
        <CustomInput
          innerRef={null}
          name="name"
          ariaLabel="AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"
          placeholder="PLACEEEEEEEEEEEEEEEEEEEEEEHOLDERRRRRRRRR"
          errors={""}
        />
        <Link
          to="/login"
          className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Si ven esto en azul, funciona react-router y tailwind en react.js
          jajsjs
        </Link>

        <Button
          variant="contained"
          color="primary"
          component={Link}
          to="/login"
        >
          Si ven este Link, es que funciona MUI
        </Button>
      </div>
    </div>
  );
};
export default Home;
