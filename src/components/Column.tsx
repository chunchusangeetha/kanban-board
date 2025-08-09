import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import { Droppable } from "@hello-pangea/dnd";
import TaskCard from "./TaskCard";
import type { ColumnType } from "../types";

type Props = {
  column: ColumnType;
};

export default function ColumnComponent({ column }: Props) {
  return (
    <Box>
      <Chip
        label={column.title}
        sx={{
          mb: 1,
          borderRadius: "20px",
          bgcolor:
            column.id === "blocked"
              ? "#ffdce1"
              : column.id === "in_progress"
              ? "#f2e9ff"
              : column.id === "done"
              ? "#d8eee7"
              : "#e9e9e9",
          px: 2,
        }}
      />

      <Droppable droppableId={column.id}>
        {(provided, snapshot) => (
          <Paper
            ref={provided.innerRef}
            {...provided.droppableProps}
            elevation={1}
            sx={{
              minHeight: 140,
              p: 2,
              borderRadius: 1.5,
              boxShadow: "0 1px 0 rgba(0,0,0,0.05)",
            }}
          >
            {column.tasks.map((task, index) => (
              <TaskCard key={task.id} task={task} index={index} />
            ))}

            {provided.placeholder}
          </Paper>
        )}
      </Droppable>
    </Box>
  );
}
