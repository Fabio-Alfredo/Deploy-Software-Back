import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PropTypes from "prop-types";
import TaskItem from "../../components/task/TaskItem";
import { AssignmentTurnedIn, AssignmentLate } from "@mui/icons-material";

const Column = React.forwardRef(
  (
    {
      predictedColumn,
      tasks,
      onDrag,
      onDragEnd,
      onCheckboxChange,
      onTaskClick,
      columnType,
    },
    ref
  ) => {
    const [draggingTaskId, setDraggingTaskId] = useState(null);
    const [removingTaskId, setRemovingTaskId] = useState(null);
    const [isDragging, setIsDragging] = useState(false);

    // Esta función se encarga de manejar el cambio de estado de la tarea
    const handleCheckboxChange = (task) => {
      setRemovingTaskId(task._id);
      setTimeout(() => {
        onCheckboxChange(task);
        setRemovingTaskId(null);
      }, 300);
    };

    return (
      <div
        ref={ref}
        className={`p-4 bg-tertiary_color border-4 border-tertiary_color rounded-lg transition-all duration-300 ${
          predictedColumn === columnType && "!border-accent_color"
        }`}
      >
        {tasks.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-gray-500 text-sm gap-3">
            {columnType === "pending" ? (
              <AssignmentLate fontSize="medium" className="text-gray-400" />
            ) : (
              <AssignmentTurnedIn fontSize="medium" className="text-gray-400" />
            )}
            <p>
              {columnType === "pending"
                ? "¡No tienes tareas pendientes!"
                : "¡No hay tareas completadas aún!"}
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            <AnimatePresence>
              {tasks.map((task) => (
                <motion.div
                  key={task._id}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={
                    removingTaskId === task._id ? { opacity: 0, y: 10 } : {}
                  }
                  drag
                  dragSnapToOrigin
                  onDragStart={() => {
                    setDraggingTaskId(task._id);
                    setIsDragging(true);
                  }}
                  onDrag={(event) => onDrag(event, columnType)}
                  onDragEnd={(event) => {
                    setDraggingTaskId(null);
                    onDragEnd(event, task);
                    setTimeout(() => setIsDragging(false), 100);
                  }}
                  className={`cursor-pointer ${
                    draggingTaskId === task._id && "z-[1000]"
                  }`}
                  onClick={() => {
                    if (!isDragging && event.target.type !== "checkbox") {
                      onTaskClick(task); // Solo permite clic si no hay arrastre
                    }
                  }}
                >
                  <TaskItem
                    {...task}
                    onCheckboxChange={() => handleCheckboxChange(task)}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    );
  }
);

Column.displayName = "Column";

Column.propTypes = {
  predictedColumn: PropTypes.string,
  tasks: PropTypes.array.isRequired,
  onDrag: PropTypes.func.isRequired,
  onDragEnd: PropTypes.func.isRequired,
  onCheckboxChange: PropTypes.func.isRequired,
  onTaskClick: PropTypes.func.isRequired,
  columnType: PropTypes.string.isRequired,
};

export default Column;
