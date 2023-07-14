import React from 'react';
import { Col, Container, Dropdown, DropdownButton } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { setFilterTag } from '../features/todo-slice';

const Tags = () => {
  const tags = useSelector((state: RootState) => state.todoReducer.tags);
  const dispatch = useDispatch();

  const handleFilterTag = (tag: string) => {
    dispatch(setFilterTag(tag));
  };

  return (
    <>
      <br />
      <Container>
        <Col>
          <DropdownButton id="dropdown-basic-button" title="Теги" variant="secondary">
            {tags.map((tag: string, index: number) => (
              <Dropdown.Item key={index} onClick={() => handleFilterTag(tag)}>
                {tag}
              </Dropdown.Item>
            ))}
          </DropdownButton>
        </Col>
      </Container>
      <br />
    </>
  );
};

export default Tags;
