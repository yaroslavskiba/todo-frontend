import React from 'react';
import { Col, Container, Dropdown, DropdownButton } from 'react-bootstrap';
import { RootState } from '../app/store';
import { setFilterTag, clearFilter } from '../features/todo-slice';
import { useAppDispatch, useAppSelector } from '../app/hooks';

const Tags = () => {
  const tags = useAppSelector((state: RootState) => state.todoReducer.tags);
  const dispatch = useAppDispatch();

  const handleFilterTag = (tag: string) => {
    dispatch(setFilterTag(tag));
  };

  const handleClearFilter = () => {
    dispatch(clearFilter());
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
            <Dropdown.Item onClick={() => handleClearFilter()}>Все</Dropdown.Item>
          </DropdownButton>
        </Col>
      </Container>
      <br />
    </>
  );
};

export default Tags;
