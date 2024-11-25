import React, { useState, useRef, useEffect } from "react";
import PageContainer from "../../containers/home/PageContainer";
import SectionIntro from "../../components/generic/SectionIntro";
import {
  Grid2,
  Fab,
  DialogActions,
  DialogContentText,
  DialogContent,
  DialogTitle,
  Dialog,
  Button,
} from "@mui/material";
import Title from "../../components/generic/Title";
import Column from "../../containers/task/Column";
import CreateNewTask from "../../containers/task/CreateNewTask";
import {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
} from "../../services/task.sevice";
import { useAuth } from "../../context/AuthContext";
import { TODO_STATE } from "../../lib/const";
import TaskSkeleton from "../../containers/task/TaskSkeleton";
import { Add } from "@mui/icons-material";

const TaskPage = () => {
  const [loadingFetch, setLoadingFetch] = useState(true);
  const { user, loading } = useAuth();

  const [pendingTasks, setPendingTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [predictedColumn, setPredictedColumn] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const pendingRef = useRef(null);
  const completedRef = useRef(null);

  useEffect(() => {
    if (loading) return;

    const fetchTasks = async () => {
      setLoadingFetch(true);
      try {
        const tasks = await getTasks(user?.token);

        // Separación de tareas pendientes y completadas
        const pending = tasks.filter(
          (task) => task.state === TODO_STATE.PENDING
        );
        const completed = tasks.filter(
          (task) => task.state === TODO_STATE.COMPLETE
        );

        setPendingTasks(pending);
        setCompletedTasks(completed);
      } catch (error) {
        console.error("Error al obtener las tareas", error);
      } finally {
        setLoadingFetch(false);
      }
    };

    fetchTasks();
  }, [loading, user?.token]);

  const moveTask = async (task, toCompleted, revertState = false) => {
    const originalState = task.state;
    const updatedState = toCompleted ? TODO_STATE.COMPLETE : TODO_STATE.PENDING;

    // Actualiza el estado de la tarea en el UI
    if (!revertState) {
      if (toCompleted) {
        setPendingTasks((prev) => prev.filter((t) => t._id !== task._id));
        setCompletedTasks((prev) => [
          ...prev,
          { ...task, state: updatedState },
        ]);
      } else {
        setCompletedTasks((prev) => prev.filter((t) => t._id !== task._id));
        setPendingTasks((prev) => [...prev, { ...task, state: updatedState }]);
      }
    }

    try {
      const updatedTask = await updateTask(
        task._id,
        { state: updatedState },
        user?.token
      );
      // Actualiza el estado de la tarea en el UI
      if (toCompleted) {
        setCompletedTasks((prev) => [
          ...prev.filter((t) => t._id !== task._id),
          updatedTask,
        ]);
      } else {
        setPendingTasks((prev) => [
          ...prev.filter((t) => t._id !== task._id),
          updatedTask,
        ]);
      }
    } catch (error) {
      console.error("Error al actualizar el estado de la tarea", error);

      if (!revertState) {
        moveTask(task, !toCompleted, true);
      }
    } finally {
      setPredictedColumn(null);
    }
  };

  const handleTaskClick = (task) => {
    setCurrentTask(task);
    setIsModalOpen(true);
  };

  const handleDrag = (event, fromColumn) => {
    const pendingBox = pendingRef.current.getBoundingClientRect();
    const completedBox = completedRef.current.getBoundingClientRect();

    const draggedX = event.clientX;
    const draggedY = event.clientY;

    if (
      draggedX > pendingBox.left &&
      draggedX < pendingBox.right &&
      draggedY > pendingBox.top &&
      draggedY < pendingBox.bottom
    ) {
      setPredictedColumn(TODO_STATE.PENDING);
    } else if (
      draggedX > completedBox.left &&
      draggedX < completedBox.right &&
      draggedY > completedBox.top &&
      draggedY < completedBox.bottom
    ) {
      setPredictedColumn(TODO_STATE.COMPLETE);
    } else {
      setPredictedColumn(fromColumn);
    }
  };

  const handleDragEnd = (event, task, fromPending) => {
    const pendingBox = pendingRef.current.getBoundingClientRect();
    const completedBox = completedRef.current.getBoundingClientRect();

    const droppedX = event.clientX;
    const droppedY = event.clientY;

    if (
      droppedX > pendingBox.left &&
      droppedX < pendingBox.right &&
      droppedY > pendingBox.top &&
      droppedY < pendingBox.bottom
    ) {
      if (!fromPending) moveTask(task, false);
    } else if (
      droppedX > completedBox.left &&
      droppedX < completedBox.right &&
      droppedY > completedBox.top &&
      droppedY < completedBox.bottom
    ) {
      if (fromPending) moveTask(task, true);
    }
    setPredictedColumn(null);
  };

  const handleCheckboxChange = async (task, fromPending) => {
    moveTask(task, fromPending);
  };

  const handleSaveTask = async ({ title, description, color }) => {
    try {
      const task = await createTask({ title, description, color }, user?.token);

      // Agrega la tarea a la lista correspondiente
      if (task.state === TODO_STATE.PENDING) {
        setPendingTasks((prev) => [...prev, task]);
      } else if (task.state === TODO_STATE.COMPLETE) {
        setCompletedTasks((prev) => [...prev, task]);
      }

      setIsModalOpen(false);
      setCurrentTask(null);
    } catch (error) {
      console.error("Error al crear la tarea", error);
    }
  };

  const handleUpdateTask = async (updatedTask) => {
    try {
      const task = await updateTask(updatedTask._id, updatedTask, user?.token);

      if (task.state === TODO_STATE.PENDING) {
        setPendingTasks((prev) =>
          prev.map((t) => (t._id === task._id ? task : t))
        );
      } else if (task.state === TODO_STATE.COMPLETE) {
        setCompletedTasks((prev) =>
          prev.map((t) => (t._id === task._id ? task : t))
        );
      }
      setIsModalOpen(false);
      setCurrentTask(null);
    } catch (error) {
      console.error("Error al actualizar la tarea", error);
    }
  };

  const handleOpenDeleteDialog = () => {
    setIsDeleteDialogOpen(true);
  };

  const handleCloseDeleteDialog = () => {
    setIsDeleteDialogOpen(false);
  };

  const handleDeleteTask = async () => {
    try {
      await deleteTask(currentTask._id, user?.token);
      setPendingTasks((prev) => prev.filter((t) => t._id !== currentTask._id));
      setCompletedTasks((prev) =>
        prev.filter((t) => t._id !== currentTask._id)
      );
      setIsDeleteDialogOpen(false);
      setIsModalOpen(false);
      setCurrentTask(null);
    } catch (error) {
      console.error("Error al eliminar la tarea", error);
    }
  };

  if (loadingFetch) return <TaskSkeleton />;

  return (
    <PageContainer>
      <Title
        title="Tus"
        highlight="tareas"
        description="Gestiona tus tareas de usuario"
        hiddenTitle="Tareas de Usuario"
      />

      <Grid2 container spacing={4}>
        <Grid2 item size={{ xs: 12, md: 6 }}>
          <SectionIntro
            smaller
            title="Tus tareas pendientes"
            description="Gestiona tus tareas en la lista de pendientes"
          />
          <Column
            predictedColumn={predictedColumn}
            tasks={pendingTasks}
            ref={pendingRef}
            onDrag={(event) => handleDrag(event, TODO_STATE.PENDING)}
            onDragEnd={(event, task) => handleDragEnd(event, task, true)}
            onCheckboxChange={(task) => handleCheckboxChange(task, true)}
            onTaskClick={handleTaskClick}
            columnType={TODO_STATE.PENDING}
          />
        </Grid2>
        <Grid2 item size={{ xs: 12, md: 6 }}>
          <SectionIntro
            smaller
            title="Tus tareas completadas"
            description="Consulta tus tareas ya realizadas"
          />
          <Column
            predictedColumn={predictedColumn}
            tasks={completedTasks}
            ref={completedRef}
            onDrag={(event) => handleDrag(event, TODO_STATE.COMPLETE)}
            onDragEnd={(event, task) => handleDragEnd(event, task, false)}
            onCheckboxChange={(task) => handleCheckboxChange(task, false)}
            onTaskClick={handleTaskClick}
            columnType={TODO_STATE.COMPLETE}
          />
        </Grid2>
      </Grid2>
      <Fab
        color="primary"
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          backgroundColor: "black",
          width: "70px",
          height: "70px",
        }}
        onClick={() => {
          setCurrentTask(null);
          setIsModalOpen(true);
        }}
      >
        <Add style={{ fontSize: "35px" }} />
      </Fab>

      <CreateNewTask
        isModalOpen={isModalOpen}
        handleCloseModal={() => {
          setIsModalOpen(false);
          setCurrentTask(null);
        }}
        currentTask={currentTask}
        handleSaveTask={handleSaveTask}
        handleUpdateTask={handleUpdateTask}
        onDeleteTask={handleOpenDeleteDialog}
      />

      <Dialog open={isDeleteDialogOpen} onClose={handleCloseDeleteDialog}>
        <DialogTitle>Eliminar Tarea</DialogTitle>
        <DialogContent>
          <DialogContentText>
            ¿Estás seguro de que deseas eliminar esta tarea? Esta acción no se
            puede deshacer.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleDeleteTask} color="error" variant="contained">
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
    </PageContainer>
  );
};

export default TaskPage;
