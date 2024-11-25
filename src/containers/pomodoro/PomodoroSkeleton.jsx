import React from "react";
import { Skeleton } from "@mui/material";
import { Grid2 } from "@mui/material";
import PageContainer from "../../containers/home/PageContainer";
import Title from "../../components/generic/Title";

const PomodoroSkeleton = () => {
  return (
    <PageContainer>
      {/* Título */}
      <Title
        title="Tus"
        highlight="pomos"
        description="Pesonaliza y crea tus sesiones"
        hiddenTitle="Pomos de Usuario"
      />

      {/* Skeleton para Tabs */}
      <Grid2 container justifyContent="center" marginTop={2}>
        <Skeleton
          variant="rectangular"
          width="80%"
          height={50}
          style={{ borderRadius: "8px" }}
          animation="wave"
        />
      </Grid2>

      {/* Skeleton para contador */}
      <Grid2 container spacing={2} justifyContent="center" alignItems="center" marginTop={4}>
        <Skeleton variant="circular" width={80} height={80} animation="wave" />
        <p className="font-black text-8xl">:</p>
        <Skeleton variant="circular" width={80} height={80} animation="wave" />
      </Grid2>

      {/* Skeleton para botones */}
      <Grid2 container spacing={2} justifyContent="center" alignItems="center" marginTop={4}>
        <Skeleton
          variant="circular"
          width={40}
          height={40}
          animation="wave"
          style={{ margin: "0 10px" }}
        />
        <Skeleton
          variant="circular"
          width={60}
          height={60}
          animation="wave"
          style={{ margin: "0 10px" }}
        />
      </Grid2>

      {/* Skeleton para las sesiones */}
      <Grid2 container spacing={4}>
        <Grid2 item size={{ xs: 12, md: 6 }}>
          <Skeleton
            variant="text"
            width="50%"
            height={30}
            animation="wave"
            style={{ marginBottom: "16px" }}
          />
          <div className="p-4 bg-tertiary_color border-4 border-tertiary_color rounded-lg transition-all duration-300">
            <div className="flex flex-col gap-4">
              {[...Array(3)].map((_, index) => (
                <Skeleton
                  key={`skeleton-session-${index}`}
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
  );
};

export default PomodoroSkeleton;