import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

const Create = () => {
  const navigate = useNavigate();
  const [notes, setNotes] = useState({
    title: "",
    details: "",
    category: "",
  });
  const [notesValidation, setNotesValidation] = useState({
    title: false,
    details: false,
    category: false,
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setNotesValidation({
      title: notes.title ? false : true,
      details: notes.details ? false : true,
      category: notes.category ? false : true,
    });
    if (notes.title && notes.details && notes.category) {
      fetch("http://localhost:8000/notes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(notes),
      }).then(() => {
        navigate("/");
      });
    }
  };

  return (
    <Container sx={{ bgcolor: "background.paper", p: 3 }}>
      <Typography variant="h6" component="h2" color="text.primary">
        Create a New notes
      </Typography>
      <Box
        component="form"
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <TextField
          sx={{ mt: 2, mb: 2, display: "block" }}
          fullWidth
          onChange={(e) => setNotes({ ...notes, title: e.target.value })}
          label="Title"
          variant="outlined"
          margin="dense"
          required
          error={notesValidation.title}
        />
        <TextField
          sx={{ mt: 2, mb: 2, display: "block" }}
          fullWidth
          onChange={(e) => setNotes({ ...notes, details: e.target.value })}
          label="Details"
          variant="outlined"
          margin="dense"
          multiline
          minRows={3}
          maxRows={10}
          required
          error={notesValidation.details}
        />

        <FormLabel
          sx={{ mt: 2, mb: 2, display: "block" }}
          required
          error={notesValidation.category}
        >
          Note Category
          <RadioGroup
            value={notes.category}
            onChange={(e) => setNotes({ ...notes, category: e.target.value })}
          >
            <FormControlLabel
              value={"money"}
              control={<Radio />}
              label="Money"
            />
            <FormControlLabel
              value={"todos"}
              control={<Radio />}
              label="Todos"
            />
            <FormControlLabel
              value={"reminders"}
              control={<Radio />}
              label="Reminders"
            />
            <FormControlLabel value={"work"} control={<Radio />} label="Work" />
          </RadioGroup>
        </FormLabel>

        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            type="submit"
            variant="contained"
            startIcon={<SendIcon fontSize="small" />}
          >
            Submit
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Create;
