import { useEffect, useState } from "react";
import NoteCard from "../components/NoteCard";
import { Container, Grid } from "@mui/material";

const Notes = () => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/notes")
      .then((res) => res.json())
      .then((data) => {
        setNotes(data);
      });
  }, []);

  const handleDelete = async (id: number) => {
    await fetch("http://localhost:8000/notes/" + id, {
      method: "DELETE",
    });
    const newNotes = notes.filter((note: { id: number }) => note.id !== id);
    setNotes(newNotes);
  };

  return (
    <Container sx={{ bgcolor: "background.paper", p: 3 }}>
      <Grid container spacing={2}>
        {notes.map(
          (note: {
            id: number;
            title: string;
            details: string;
            category: string;
          }) => (
            <Grid item sm={12} md={6} lg={4} xl={3} key={note.id}>
              <NoteCard note={note} handleDelete={handleDelete} />
            </Grid>
          )
        )}
      </Grid>
    </Container>
  );
};

export default Notes;
