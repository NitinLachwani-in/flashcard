import React, { useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import { toast } from 'react-toastify';

const ADD_FLASHCARD = gql`
  mutation createFlashcard($language: String!, $flashinfo: String!) {
    createFlashcard(input: { language: $language, flashinfo: $flashinfo }) {
      _id
      language
      flashinfo
    }
  }
`;

const FLASHCARDS_QUERY = gql`
  {
    allFlashcards {
      _id
      language
      flashinfo
    }
  }
`;

const AddFlashcard = ({ history }) => {
  const [language, setLanguage] = useState('');
  const [flashinfo, setFlashinfo] = useState('');

  const [createFlashcard] = useMutation(ADD_FLASHCARD, {
    update(
      cache,
      {
        data: { createFlashcard },
      },
    ) {
      const { allFlashcards } = cache.readQuery({ query: FLASHCARDS_QUERY });

      cache.writeQuery({
        query: FLASHCARDS_QUERY,
        data: { allFlashcards: [...allFlashcards, createFlashcard] },
      });
    },
    onCompleted() { history.push('/'); },
  });

  return (
    <div className="container mt-3">
      <h1 className="title">Add Flashcard</h1>
      <div className="box mt-3">
        <form onSubmit={(e) => {
          e.preventDefault();
          createFlashcard({
            variables: {
              language,
              flashinfo,
            },
          });
          toast.success('Flashcard was created successfully!', {
            position: toast.POSITION.TOP_CENTER,
          });
        }}
        >

          <div className="field">
            <label className="label" htmlFor="language">Language</label>
            <div className="control">
              <input
                className="input"
                type="text"
                name="language"
                id="language"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="field">
            <label className="label" htmlFor="flashinfo">Flash Card Text</label>
            <div className="control">
              <textarea
                className="textarea"
                name="flashinfo"
                id="flashinfo"
                rows="5"
                value={flashinfo}
                onChange={(e) => setFlashinfo(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="field">
            <div className="control">
              <button className="button is-link" type="submit">Add</button>
            </div>
          </div>

        </form>
      </div>
    </div>
  );
};

export default AddFlashcard;
