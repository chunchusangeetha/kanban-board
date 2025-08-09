import  { useCallback } from "react";
import { DragDropContext, type DropResult } from "@hello-pangea/dnd";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import { v4 as uuidv4 } from "uuid";
import { useLocalStorage } from "../hooks/useLocalStorage";
import ColumnComponent from "./Column";
import type { ColumnsMap } from "../types";
import Grid from "@mui/material/Grid"; 


const STORAGE_KEY = "kanban-demo-v1";

const initialColumns: ColumnsMap = {
  not_started: {
    id: "not_started",
    title: "Not started",
    tasks: [
      {
        id: uuidv4(),
        title: "Take Coco to a vet",
        dueDate: "2025-04-11",
      },
    ],
  },
  in_progress: {
    id: "in_progress",
    title: "In progress",
    tasks: [
      {
        id: uuidv4(),
        title: "Taxes 😊",
        subtasks: [
          { id: uuidv4(), text: "Accountant contract", completed: false },
          { id: uuidv4(), text: "Request work payslips", completed: false },
          { id: uuidv4(), text: "Cancel VAT ID", completed: false },
        ],
      },
    ],
  },
  blocked: {
    id: "blocked",
    title: "Blocked",
    tasks: [
      {
        id: uuidv4(),
        title: "Move",
        subtasks: [
          { id: uuidv4(), text: "Request moving estimate", completed: false },
          { id: uuidv4(), text: "Order moving boxes", completed: true },
        ],
      },
    ],
  },
  done: {
    id: "done",
    title: "Done",
    tasks: [
      {
        id: uuidv4(),
        title: "Nothing to be done 😌",
      },
    ],
  },
};

export default function Board() {
  const [columns, setColumns] = useLocalStorage<ColumnsMap>(
    STORAGE_KEY,
    initialColumns
  );

  const onDragEnd = useCallback(
    (result: DropResult) => {
      const { destination, source } = result;
      if (!destination) return;
      if (
        destination.droppableId === source.droppableId &&
        destination.index === source.index
      )
        return;

      setColumns((prev) => {
        const sourceCol = prev[source.droppableId];
        const destCol = prev[destination.droppableId];

        // copy arrays
        const sourceTasks = Array.from(sourceCol.tasks);
        const [moved] = sourceTasks.splice(source.index, 1);

        if (source.droppableId === destination.droppableId) {
          // reorder within same column
          sourceTasks.splice(destination.index, 0, moved);
          return {
            ...prev,
            [source.droppableId]: { ...sourceCol, tasks: sourceTasks },
          };
        } else {
          const destTasks = Array.from(destCol.tasks);
          destTasks.splice(destination.index, 0, moved);
          return {
            ...prev,
            [source.droppableId]: { ...sourceCol, tasks: sourceTasks },
            [destination.droppableId]: { ...destCol, tasks: destTasks },
          };
        }
      });
    },
    [setColumns]
  );

  return (
    <Box>
      <Typography variant="h3" gutterBottom sx={{ fontWeight: 800 }}>
        Personal
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        A board to keep track of personal tasks.
      </Typography>

      <Paper
        elevation={0}
        sx={{
          p: 3,
          borderRadius: 2,
          bgcolor: "#f7f7f7",
        }}
      >
        <DragDropContext onDragEnd={onDragEnd}>
          <Grid container spacing={3}>
            {Object.values(columns).map((col) => (
              <Grid key={col.id} size={{ xs: 12, md: 3 }}>
                <ColumnComponent column={col} />
              </Grid>
            ))}
          </Grid>
        </DragDropContext>
      </Paper>
    </Box>
  );
}
