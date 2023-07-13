import React from 'react';
import { Badge, Card, Container, ListGroup } from 'react-bootstrap';

const FakeCard = () => {
  return (
    <>
      <Container>
        <Card style={{ width: '18rem' }}>
          <Card.Body>
            <Card.Title>Список дел</Card.Title>
            <Card.Text style={{ gap: '3px' }}>
              <Badge bg="secondary">Теги Записки</Badge>
            </Card.Text>
          </Card.Body>
          <ListGroup className="list-group-flush">
            <ListGroup.Item>Создайте</ListGroup.Item>
            <ListGroup.Item>новый</ListGroup.Item>
            <ListGroup.Item>список</ListGroup.Item>
          </ListGroup>
          <Card.Body>
            <Card.Link href="#">Редактировать</Card.Link>
            <Card.Link href="#">Удалить</Card.Link>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
};

export default FakeCard;
