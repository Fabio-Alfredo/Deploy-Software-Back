import React, { useEffect, useState } from "react";
import PageContainer from "../../containers/home/PageContainer";
import { Box, Grid2, Skeleton, Toolbar } from "@mui/material";
import SectionIntro from "../../components/generic/SectionIntro";
import TaskPreview from "../../components/home/TaskPreview";
import CustomInput from "../../components/generic/CustomInput";
import PomodoroPreview from "../../components/home/PomodoroPreview";
import { useAuth } from "../../context/AuthContext";
import Title from "../../components/generic/Title";
import { getTasks } from "../../services/task.sevice";
import { VIEWS } from "../../lib/views";
import { HeartIcon } from "../../components/generic/Icons";

const ProtectedHome = () => {
  const { user, loading } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [loadingFetch, setLoadingFetch] = useState(true);

  useEffect(() => {
    if (loading) return;

    const fetchTasks = async () => {
      setLoadingFetch(true);
      try {
        const tasks = await getTasks(user?.token);

        const filteredTasks = tasks
          .slice(0, 5)
          .filter((task) => task.updatedAt);

        setTasks(filteredTasks);
      } catch (error) {
        console.error("Error al obtener las tareas", error);
      } finally {
        setLoadingFetch(false);
      }
    };

    fetchTasks();
  }, [loading, user?.token]);

  return (
    <PageContainer>
      <Title
        as="h2"
        title="Hola de nuevo, "
        highlight={user?.name || "Usuario"}
        icon={<HeartIcon width={50} height={50} />}
        description="Te damos la bienvenida a nuestra plataforma"
        hiddenTitle="Página de Inicio"
      />

      <Grid2 container spacing={4}>
        <Grid2 item size={{ xs: 12, md: 6 }}>
          <SectionIntro
            smaller
            title="Tus actividades"
            description="Hecha un vistazo a tus tareas pendientes"
          />
          <div className="grid grid-cols-1 gap-4">
            {loadingFetch
              ? [...Array(3)].map((_, index) => (
                  <Skeleton
                    key={index}
                    variant="rectangular"
                    height={70}
                    style={{ borderRadius: "8px" }}
                    animation="wave"
                  />
                ))
              : tasks.map((task) => (
                  <TaskPreview
                    key={task._id}
                    title={task.title}
                    date={task.updatedAt}
                    dividerColor={task.color}
                    link={VIEWS.tasks}
                  />
                ))}
          </div>
        </Grid2>
        <Grid2 item size={{ xs: 12, md: 6 }}>
          <SectionIntro
            smaller
            title="Tu pomodoro personal"
            description="Empieza a trabajar en tus tareas"
          />
          <Box sx={{ display: "flex", gap: 2 }}>
            <PomodoroPreview
              link={VIEWS.pomodoro}
              color="#4880FF"
              title="Pomodoro Personal"
              session="Haz click para ver más"
            />
          </Box>
        </Grid2>
      </Grid2>
    </PageContainer>
  );
};

export default ProtectedHome;
