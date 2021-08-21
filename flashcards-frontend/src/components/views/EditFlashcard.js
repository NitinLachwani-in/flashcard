import React, { useState } from 'react';
import { gql, useQuery, useMutation } from '@apollo/client';
import { toast } from 'react-toastify';

const FLASHCARD_QUERY = gql`
  query getFlashcard($_id: ID!) {
    getFlashcard(_id: $_id) {
      _id
      language
      flashinfo
    }
  }
`;

const EDIT_FLASHCARD = gql`
  mutation updateFlashcard($_id: ID!, $language: String, $flashinfo: String) {
    updateFlashcard(_id: $_id, input: { language: $language, flashinfo: $flashinfo }) {
      _id
      language
      flashinfo
    }
  }
`;

const EditFlashcard = ({ match, history }) => {
  const [language, setLanguage] = useState('');
  const [flashinfo, setFlashinfo] = useState('');

  const { loading, error, data } = useQuery(FLASHCARD_QUERY, {
    variables: {
      _id: match.params.id,
    },
  });

  const [updateFlashcard] = useMutation(EDIT_FLASHCARD, { onCompleted() { history.push('/'); } });

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  const flashcard = data;

  return (
    <div className="container mt-3">
      <h1 className="title">Edit Flashcard</h1>
      <div className="box mt-3">
        <form onSubmit={(e) => {
          e.preventDefault();
          updateFlashcard({
            variables: {
              _id: flashcard.getFlashcard._id,
              language: language || flashcard.getFlashcard.language,
              flashinfo: flashinfo || flashcard.getFlashcard.flashinfo,
            },
          });
          toast.success('Flashcard was edited successfully!', {
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
                defaultValue={flashcard.getFlashcard.language}
                onChange={(e) => setLanguage(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="field">
            <label className="label" htmlFor="flashinfo">Flashinfo</label>
            <div className="control">
              <textarea
                className="textarea"
                rows="5"
                name="flashinfo"
                id="flashinfo"
                defaultValue={flashcard.getFlashcard.flashinfo}
                onChange={(e) => setFlashinfo(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="field">
            <div className="control">
              <button className="button is-link" type="submit">
                Save
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditFlashcard;
