import Board from "./components/Board";
import Container from "@mui/material/Container";

export default function App() {
  return (
    <Container maxWidth="xl" sx={{ pt: 4, pb: 6 }}>
      <Board />
    </Container>
  );
}
