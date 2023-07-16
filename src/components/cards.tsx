import React from 'react';
import { RootState } from '../app/store';
import { Badge, Card, Form, InputGroup, ListGroup } from 'react-bootstrap';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { Note, editCurrentElement } from '../features/todo-slice';
import { useNavigate } from 'react-router-dom';

const Cards = () => {
  const notes = useAppSelector((state: RootState) => state.todoReducer.notes);
  const filteredNotes = useAppSelector((state: RootState) => state.todoReducer.filteredNotes);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleEdit = (note: Note) => {
    dispatch(editCurrentElement(note));
    navigate('/edit');
  };

  return (
    <div className="d-flex" style={{ gap: '1.3rem', flexWrap: 'wrap' }}>
      {filteredNotes.length
        ? filteredNotes.map((note) => (
            <Card style={{ width: '18rem', minWidth: '18rem' }} key={note.id}>
              <Card.Body>
                <Card.Title>{note.title}</Card.Title>
                <div className="d-flex" style={{ gap: '0.4rem' }}>
                  {note.tags.map((tag) => (
                    <Badge bg="secondary" key={tag}>
                      {tag}
                    </Badge>
                  ))}
                </div>
              </Card.Body>

              <ListGroup className="list-group-flush">
                {note.content.map((todo, index) => (
                  <ListGroup.Item key={`${todo}${index}`}>
                    <InputGroup className="mb-3">
                      <InputGroup.Checkbox aria-label={todo.contentInput} />
                      <Form.Control aria-label={todo.contentInput} value={todo.contentInput} />
                    </InputGroup>
                  </ListGroup.Item>
                ))}
              </ListGroup>

              <Card.Body>
                <Card.Link href="#">Удалить</Card.Link>
                <Card.Link href="#" onClick={() => handleEdit(note)}>
                  Редактировать
                </Card.Link>
              </Card.Body>
            </Card>
          ))
        : notes.map((note) => (
            <Card style={{ width: '18rem', minWidth: '18rem' }} key={note.id}>
              <Card.Body>
                <Card.Title>{note.title}</Card.Title>
                <div className="d-flex" style={{ gap: '0.4rem' }}>
                  {note.tags.map((tag) => (
                    <Badge bg="secondary" key={tag}>
                      {tag}
                    </Badge>
                  ))}
                </div>
              </Card.Body>

              <ListGroup className="list-group-flush">
                {note.content.map((todo, index) => (
                  <ListGroup.Item key={`${todo}${index}`}>
                    <InputGroup className="mb-3">
                      <InputGroup.Checkbox aria-label={todo.contentInput} />
                      <Form.Control aria-label={todo.contentInput} value={todo.contentInput} />
                    </InputGroup>
                  </ListGroup.Item>
                ))}
              </ListGroup>

              <Card.Body>
                <Card.Link href="#">Удалить</Card.Link>
                <Card.Link href="#" onClick={() => handleEdit(note)}>
                  Редактировать
                </Card.Link>
              </Card.Body>
            </Card>
          ))}
    </div>
  );
};

export default Cards;
