import { Draggable } from "@hello-pangea/dnd";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Checkbox from "@mui/material/Checkbox";
import ListItemText from "@mui/material/ListItemText";
import type { Task } from "../types";

type Props = {
  task: Task;
  index: number;
};

export default function TaskCard({ task, index }: Props) {
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={{
            marginBottom: 12,
            ...provided.draggableProps.style,
          }}
        >
          <Card elevation={2} sx={{ borderRadius: 1.2 }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 1 }}>
                {task.title}
              </Typography>

              {task.dueDate && (
                <Chip
                  label={"Due " + task.dueDate}
                  size="small"
                  sx={{ mb: 1, bgcolor: "#ffdbe0" }}
                />
              )}

              {task.subtasks && task.subtasks.length > 0 && (
                <List dense>
                  {task.subtasks.map((st) => (
                    <ListItem key={st.id} disablePadding>
                      <ListItemIcon sx={{ minWidth: 36 }}>
                        <Checkbox checked={st.completed} />
                      </ListItemIcon>
                      <ListItemText
                        primary={st.text}
                        sx={{
                          textDecoration: st.completed
                            ? "line-through"
                            : "none",
                          color: st.completed ? "gray" : "inherit",
                        }}
                      />
                    </ListItem>
                  ))}
                </List>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </Draggable>
  );
}
