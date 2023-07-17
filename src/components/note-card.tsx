import React from 'react';
import { Badge, Card, Form, ListGroup } from 'react-bootstrap';
import { Note } from '../features/todo-slice';

interface NoteCardProps {
  note: Note;
  onChecked: (noteIndex: number, contentIndex: number) => void;
  onEdit: (note: Note) => void;
  onFilterTag: (tag: string) => void;
  noteIndex: number;
  handleDelete: (id: number) => void;
}

const NoteCard = ({ note, onChecked, onEdit, onFilterTag, noteIndex, handleDelete }: NoteCardProps) => {
  const handleTagClick = (tag: string) => {
    onFilterTag(tag);
  };

  return (
    <Card style={{ width: '18rem', minWidth: '18rem' }}>
      <Card.Body>
        <Card.Title>{note.title}</Card.Title>
        <div className="d-flex" style={{ gap: '0.4rem', flexWrap: 'wrap' }}>
          {note.tags.map((tag) => (
            <Badge bg="secondary" key={tag} onClick={() => handleTagClick(tag)} style={{ cursor: 'pointer' }}>
              {tag}
            </Badge>
          ))}
        </div>
      </Card.Body>

      <ListGroup className="list-group-flush">
        {note.content.map((todo, contentIndex) => (
          <ListGroup.Item key={contentIndex}>
            <Form.Group controlId={`todo-${contentIndex}`}>
              <Form.Check
                type="checkbox"
                label={todo.contentInput}
                checked={todo.checked}
                onChange={() => onChecked(noteIndex, contentIndex)}
              />
            </Form.Group>
          </ListGroup.Item>
        ))}
      </ListGroup>

      <Card.Body>
        <Card.Link href="#" onClick={() => handleDelete(note.id)}>
          Удалить
        </Card.Link>
        <Card.Link href="#" onClick={() => onEdit(note)}>
          Редактировать
        </Card.Link>
      </Card.Body>
    </Card>
  );
};

export default NoteCard;
