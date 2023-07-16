import React, { useState, useEffect } from 'react';
import { Form, Button, Badge, CloseButton } from 'react-bootstrap';
import { updateNote } from '../features/todo-slice';
import { useAppDispatch } from '../app/hooks';
import { useNavigate } from 'react-router-dom';
import Alert from 'react-bootstrap/Alert';
import { Note } from '../features/todo-slice';

const EditNote = ({ id, title, content, tags }: Note) => {
  const [noteTitle, setNoteTitle] = useState<string>(title);
  const [noteTags, setNoteTags] = useState<string[]>(tags);
  const [tagInput, setTagInput] = useState<string>('');
  const [noteContent, setNoteContent] = useState<{ contentInput: string; checked: boolean }[]>(content);
  const [contentInput, setContentInput] = useState<string>('');
  const [disabled, setDisabled] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    setNoteTitle(title);
    setNoteTags(tags);
    setNoteContent(content);
  }, []);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNoteTitle(event.target.value);
  };

  const handleTagInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTagInput(event.target.value);
  };

  const handleContentInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setContentInput(event.target.value);
  };

  const handleAddTag = () => {
    setNoteTags([...noteTags, tagInput]);
    setTagInput('');
  };

  const handleAddContent = () => {
    setNoteContent([...noteContent, { contentInput, checked: false }]);
    setContentInput('');
  };

  const handleRemoveTag = (index: number) => {
    const newTags = [...noteTags];
    newTags.splice(index, 1);
    setNoteTags(newTags);
  };

  const handleRemoveContent = (index: number) => {
    const newContents = [...noteContent];
    newContents.splice(index, 1);
    setNoteContent(newContents);
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const updatedNote = {
      id,
      title: noteTitle,
      content: noteContent,
      tags: noteTags,
    };

    if (
      noteTags.length &&
      noteTags.every((s) => s !== '') &&
      noteContent.length &&
      noteContent.some((s) => s.contentInput !== '') &&
      noteTitle.length
    ) {
      dispatch(updateNote(updatedNote));
      navigate('/');
    } else {
      setDisabled(true);
    }
  };

  return (
    <>
      <br />
      <br />
      <h3>Редактирование заметки:</h3>
      <br />
      <div className="d-flex" style={{ gap: '1.5rem', flexWrap: 'wrap' }}>
        <div style={{ flex: '49%' }}>
          <div className="d-flex" style={{ gap: '10px', flexWrap: 'wrap' }}>
            {noteTags &&
              noteTags.map((tag, index) => (
                <Form.Group controlId={`tag${index}`} key={index}>
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
              <Form.Control type="text" value={noteTitle} onChange={handleTitleChange} />
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
              Сохранить изменения
            </Button>
          </Form>
        </div>

        <div style={{ flex: '49%' }}>
          {content &&
            content.map((content, index) => (
              <Form.Group controlId={`content${index}`} key={index}>
                <div className="d-flex">
                  <Form.Control type="text" value={content.contentInput} disabled />
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

export default EditNote;
