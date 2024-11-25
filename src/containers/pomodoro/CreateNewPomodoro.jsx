import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { sessionSchema } from "../../validations/SessionSchema";
import { Autocomplete, Box, Button, Modal, TextField } from "@mui/material";
import PropTypes from "prop-types";

const CreateNewPomodoro = ({
    isModalOpen,
    handleCloseModal,
    handleSavePomodoroTask,
    options
}) => {
    const {
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(sessionSchema),
        defaultValues: {
            tasks: [],
        },
    });

    const tasks = watch("tasks");

    const handleTaskSelection = (event, value) => {
        setValue("tasks", value);
    };

    const onSubmit = (data) => {
        handleSavePomodoroTask(data);
        setValue("tasks", []);
        handleCloseModal();
    };

    return (
        <Modal open={isModalOpen} onClose={handleCloseModal}>
            <Box
                sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    maxWidth: 500,
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
                    <Autocomplete
                        multiple
                        options={options}
                        getOptionLabel={(option) => option.title}
                        onChange={handleTaskSelection}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Selecciona tareas"
                                error={!!errors.tasks}
                                helperText={errors.tasks?.message}
                            />
                        )}
                    />

                    {/* Mostrar las tareas seleccionadas */}
                    <ul>
                        {tasks.map((task, index) => (
                            <li key={task._id || index}>{task.title}</li>
                        ))}
                    </ul>

                    <Box mt={2} display="flex" justifyContent="flex-end">
                        <Button onClick={handleCloseModal} style={{ marginRight: "8px" }}>
                            Cancelar
                        </Button>
                        <Button type="submit" variant="contained" color="primary">
                            Guardar
                        </Button>
                    </Box>
                </form>
            </Box>
        </Modal>
    );
};

CreateNewPomodoro.propTypes = {
    isModalOpen: PropTypes.bool.isRequired,
    handleCloseModal: PropTypes.func.isRequired,
    handleSavePomodoroTask: PropTypes.func.isRequired,
    options: PropTypes.array.isRequired,
};

export default CreateNewPomodoro;