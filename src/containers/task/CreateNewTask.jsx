import React, { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Modal, Box, Button, FormLabel } from "@mui/material";
import PropTypes from "prop-types";
import { CirclePicker } from "react-color";
import { taskSchema } from "../../validations/TaskSchema";
import CustomInput from "../../components/generic/CustomInput";
import { DeleteOutline } from "@mui/icons-material";

const CreateNewTask = ({
  isModalOpen,
  handleCloseModal,
  currentTask,
  handleSaveTask,
  handleUpdateTask,
  onDeleteTask,
}) => {
  const [color, setColor] = React.useState("#f44336");

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(taskSchema),
  });

  // Load the task details into the form when editing
  useEffect(() => {
    if (currentTask) {
      setValue("title", currentTask.title);
      setValue("description", currentTask.description);
      setColor(currentTask.color || "#000");
    } else {
      reset(); // Clear the form for a new task
      setColor("#f44336");
    }
  }, [currentTask, setValue, reset]);

  const onSubmit = async (data) => {
    const { title, description } = data;
    if (currentTask) {
      // Update the existing task
      handleUpdateTask({ ...currentTask, title, description, color });
    } else {
      // Create a new task
      handleSaveTask({ title, description, color });
    }
  };

  const handleColorChange = (color) => {
    setColor(color.hex);
  };

  return (
    <Modal open={isModalOpen} onClose={handleCloseModal}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          maxWidth: 550,
          width: "95%",
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="space-y-6"
        >
          <CustomInput
            innerRef={register("title")}
            labelText="Título"
            name="title"
            type="text"
            placeholder="Escribe el título de la tarea"
            errors={errors.title}
          />

          <CustomInput
            innerRef={register("description")}
            labelText="Descripción"
            name="description"
            placeholder="Escribe la descripción de la tarea"
            errors={errors.description}
            multiline
            rows={4}
          />

          <div>
            <FormLabel
              htmlFor="color"
              sx={{
                color: "#202124",
                fontWeight: "800",
                lineHeight: "45px",
                marginBottom: 2,
              }}
              className="!text-xl"
            >
              Color
            </FormLabel>

            <CirclePicker
              width="100%"
              color={color}
              onChangeComplete={handleColorChange}
            />
          </div>

          <Box mt={2} display="flex" justifyContent="flex-end" gap={2} flexWrap="wrap">
            {currentTask && (
              <Button
                variant="outlined"
                color="error"
                onClick={onDeleteTask}
                startIcon={<DeleteOutline />}
              >
                Eliminar Tarea
              </Button>
            )}
            <Button onClick={handleCloseModal} style={{ marginRight: "8px" }}>
              Cancelar
            </Button>
            <Button type="submit" variant="contained" color="primary">
              {currentTask ? "Actualizar" : "Guardar"}
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
};

CreateNewTask.propTypes = {
  isModalOpen: PropTypes.bool.isRequired,
  handleCloseModal: PropTypes.func.isRequired,
  currentTask: PropTypes.object,
  handleSaveTask: PropTypes.func.isRequired,
  handleUpdateTask: PropTypes.func.isRequired,
  onDeleteTask: PropTypes.func.isRequired,
};

export default CreateNewTask;
