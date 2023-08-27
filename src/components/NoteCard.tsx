import {
  Card,
  CardContent,
  CardHeader,
  IconButton,
  Typography,
} from "@mui/material";
import { DeleteOutlined } from "@mui/icons-material";

type NoteCardProps = {
  handleDelete: (id: number) => void;
  note: {
    id: number;
    title: string;
    details: string;
    category: string;
  };
};

const NoteCard = (props: NoteCardProps) => {
  const { note, handleDelete } = props;

  return (
    <Card elevation={1}>
      <CardHeader
        title={note.title}
        subheader={note.category}
        action={
          <IconButton onClick={() => handleDelete(note.id)}>
            <DeleteOutlined color="error" />
          </IconButton>
        }
      />
      <CardContent>
        <Typography variant="body2" color="text">
          {note.details}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default NoteCard;
