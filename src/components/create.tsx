import React, { useState } from 'react';
import { Form, Button, Badge, CloseButton } from 'react-bootstrap';
import { addNote } from '../features/todo-slice';
import { useAppDispatch } from '../app/hooks';
import { useNavigate } from 'react-router-dom';
import Alert from 'react-bootstrap/Alert';

const Create = () => {
  const [title, setTitle] = useState<string>('');
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState<string>('');
  const [content, setContent] = useState<string[]>([]);
  const [contentInput, setContentInput] = useState<string>('');
  const [disabled, setDisabled] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleTagInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTagInput(event.target.value);
  };

  const handleContentInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setContentInput(event.target.value);
  };

  const handleAddTag = () => {
    setTags([...tags, tagInput]);
    setTagInput('');
  };

  const handleAddContent = () => {
    setContent([...content, contentInput]);
    setContentInput('');
  };

  const handleRemoveTag = (index: number) => {
    const newTags = [...tags];
    newTags.splice(index, 1);
    setTags(newTags);
  };

  const handleRemoveContent = (index: number) => {
    const newContents = [...content];
    newContents.splice(index, 1);
    setContent(newContents);
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const note = {
      id: Date.now(),
      title,
      content,
      tags,
      checked: false,
    };

    if (tags.length && tags.every((s) => s !== '') && content.length && content.some((s) => s !== '') && title.length) {
      dispatch(addNote(note));
      navigate('/');
    } else {
      setDisabled(true);
    }
  };

  return (
    <>
      <br />
      <br />
      <h3>Создание заметки: </h3>
      <br />
      <div className="d-flex" style={{ gap: '1.5rem' }}>
        <div style={{ flex: '1 1 50%' }}>
          <div className="d-flex" style={{ gap: '10px', flexWrap: 'wrap' }}>
            {tags &&
              tags.map((tag, index) => (
                <Form.Group controlId={`tag${index}`} key={index}>
                  {/* <Form.Label>Тег {index + 1}</Form.Label> */}
                  <div className="d-flex" style={{ gap: '5px' }}>
                    <Badge bg="secondary">{tag}</Badge>
                    <CloseButton onClick={() => handleRemoveTag(index)} />
                  </div>
                  <br />
                </Form.Group>
              ))}
          </div>

          {disabled && <Alert variant="danger">Пожалуйста проверьте название заметки</Alert>}
          <Form onSubmit={handleFormSubmit}>
            <Form.Group controlId="noteTitle">
              <Form.Label>Название заметки</Form.Label>
              <Form.Control type="text" value={title} onChange={handleTitleChange} />
            </Form.Group>
            <br />

            {disabled && <Alert variant="danger">Пожалуйста проверьте содержимое ваших TODO</Alert>}
            <Form.Group controlId="contentInput">
              <Form.Label>Добавить TODO</Form.Label>
              <div className="d-flex">
                <Form.Control
                  style={{ width: '60%' }}
                  type="text"
                  value={contentInput}
                  onChange={handleContentInputChange}
                />
                <Button variant="secondary" onClick={handleAddContent}>
                  Добавить TODO
                </Button>
              </div>
            </Form.Group>
            <br />

            {disabled && <Alert variant="danger">Пожалуйста проверьте ваши теги</Alert>}
            <Form.Group controlId="tagInput">
              <Form.Label>Добавить тег</Form.Label>
              <div className="d-flex">
                <Form.Control style={{ width: '50%' }} type="text" value={tagInput} onChange={handleTagInputChange} />
                <Button variant="secondary" onClick={handleAddTag}>
                  Добавить тег
                </Button>
              </div>
            </Form.Group>

            <br />

            <Button variant="secondary" type="submit">
              Сохранить заметку
            </Button>
          </Form>
        </div>
        <div style={{ flex: '1 1 50%' }}>
          {content &&
            content.map((content, index) => (
              <Form.Group controlId={`content${index}`} key={index}>
                <Form.Label>TODO {index + 1}</Form.Label>
                <div className="d-flex">
                  <Form.Control type="text" value={content} disabled />
                  <Button variant="danger" onClick={() => handleRemoveContent(index)}>
                    Удалить
                  </Button>
                </div>
                <br />
              </Form.Group>
            ))}
        </div>
      </div>
    </>
  );
};

export default Create;
