import React from 'react'
import PageContainer from '../home/PageContainer'
import Title from '../../components/generic/Title'
import { Grid2, Skeleton } from '@mui/material'
import SectionIntro from '../../components/generic/SectionIntro'

const TaskSkeleton = () => {
  return (
    <PageContainer>
        <Title
          title="Tus"
          highlight="tareas"
          description="Gestiona tus tareas de usuario"
          hiddenTitle="Tareas de Usuario"
        />
        <Grid2 container spacing={4}>
          {/* Skeleton para la columna de tareas pendientes */}
          <Grid2 item size={{ xs: 12, md: 6 }}>
            <SectionIntro
              smaller
              title="Tus tareas pendientes"
              description="Gestiona tus tareas en la lista de pendientes"
            />
            <div className="p-4 bg-tertiary_color border-4 border-tertiary_color rounded-lg transition-all duration-300">
              <div className="flex flex-col gap-4">
                {[...Array(3)].map((_, index) => (
                  <Skeleton
                    key={`skeleton-pending-${index}`}
                    variant="rectangular"
                    height={65}
                    style={{ borderRadius: "8px" }}
                    animation="wave"
                  />
                ))}
              </div>
            </div>
          </Grid2>
          {/* Skeleton para la columna de tareas completadas */}
          <Grid2 item size={{ xs: 12, md: 6 }}>
            <SectionIntro
              smaller
              title="Tus tareas completadas"
              description="Consulta tus tareas ya realizadas"
            />
            <div className="p-4 bg-tertiary_color border-4 border-tertiary_color rounded-lg transition-all duration-300">
              <div className="flex flex-col gap-4">
                {[...Array(3)].map((_, index) => (
                  <Skeleton
                    key={`skeleton-completed-${index}`}
                    variant="rectangular"
                    height={65}
                    style={{ borderRadius: "8px" }}
                    animation="wave"
                  />
                ))}
              </div>
            </div>
          </Grid2>
        </Grid2>
      </PageContainer>
  )
}

export default TaskSkeleton
