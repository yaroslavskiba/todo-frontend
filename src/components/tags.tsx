import React from 'react';
import { Col, Badge, Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { setFilterTag } from '../features/todo-slice';

const Tags = () => {
  const tags = useSelector((state: RootState) => state.todoReducer.tags);
  const dispatch = useDispatch();
  const filterTag = useSelector((state: RootState) => state.todoReducer.filterTag);

  const handleFilterTag = (tag: string) => {
    dispatch(setFilterTag(tag));
  };

  return (
    <>
      <Container>
        <Col>
          <h3>Теги:</h3>
          {tags.map((tag: string, index: number) => (
            <Badge
              style={{ cursor: 'pointer' }}
              key={index}
              className={`mx-1 ${filterTag === tag ? 'bg-secondary text-light' : ''}`}
              pill
              onClick={() => handleFilterTag(tag)}
            >
              {tag}
            </Badge>
          ))}
        </Col>
      </Container>
      <hr />
    </>
  );
};

export default Tags;
