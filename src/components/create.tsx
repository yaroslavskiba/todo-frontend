import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
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
    };

    if ((tags.length && tags.every((s) => s !== '')) || (content.length && content.some((s) => s !== ''))) {
      dispatch(addNote(note));
      navigate('/');
    } else {
      setDisabled(true);
    }
  };

  return (
    <>
      <br />
      <h3>Создание заметки: </h3>
      {disabled && <Alert variant="danger">Пожалуйста проверьте название заметки</Alert>}
      <Form onSubmit={handleFormSubmit}>
        <Form.Group controlId="noteTitle">
          <Form.Label>Название заметки</Form.Label>
          <Form.Control type="text" value={title} onChange={handleTitleChange} />
        </Form.Group>
        <br />

        {content &&
          content.map((content, index) => (
            <Form.Group controlId={`content${index}`} key={index}>
              <Form.Label>TODO {index + 1}</Form.Label>
              <div className="d-flex">
                <Form.Control type="text" style={{ width: '25%' }} value={content} disabled />
                <Button style={{ width: '10%' }} variant="danger" onClick={() => handleRemoveContent(index)}>
                  Удалить
                </Button>
              </div>
              <br />
            </Form.Group>
          ))}

        {disabled && <Alert variant="danger">Пожалуйста проверьте содержимое ваших TODO</Alert>}
        <Form.Group style={{ width: '45%' }} controlId="contentInput">
          <Form.Label>Добавить TODO</Form.Label>
          <div className="d-flex">
            <Form.Control type="text" value={contentInput} onChange={handleContentInputChange} />
            <Button style={{ width: '65%' }} variant="secondary" onClick={handleAddContent}>
              Добавить TODO
            </Button>
          </div>
        </Form.Group>
        <br />

        {tags &&
          tags.map((tag, index) => (
            <Form.Group controlId={`tag${index}`} key={index}>
              <Form.Label>Тег {index + 1}</Form.Label>
              <div className="d-flex">
                <Form.Control type="text" style={{ width: '25%' }} value={tag} disabled />
                <Button style={{ width: '10%' }} variant="danger" onClick={() => handleRemoveTag(index)}>
                  Удалить
                </Button>
              </div>
              <br />
            </Form.Group>
          ))}

        {disabled && <Alert variant="danger">Пожалуйста проверьте ваши теги</Alert>}
        <Form.Group style={{ width: '35%' }} controlId="tagInput">
          <Form.Label>Добавить тег</Form.Label>
          <div className="d-flex">
            <Form.Control type="text" value={tagInput} onChange={handleTagInputChange} />
            <Button style={{ width: '40%' }} variant="secondary" onClick={handleAddTag}>
              Добавить тег
            </Button>
          </div>
        </Form.Group>
        <br />

        <Button variant="secondary" type="submit">
          Сохранить заметку
        </Button>
      </Form>
    </>
  );
};

export default Create;
