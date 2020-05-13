import React, { useEffect } from 'react';
import { useMutation, useQuery } from '@apollo/client';
// import the Note component
import Note from '../components/Note';
import { GET_NOTE ,GET_ME} from '../gql/query';
import { EDIT_NOTE } from '../gql/mutation';
import NoteForm from '../components/NoteForm';


const EditNote = props => {

  const id = props.match.params.id;
 
  useEffect(() => {
    // update the document title
    document.title = 'Update Note — Notedly';
  });
  const { data: userdata } = useQuery(GET_ME);
  const { loading,error,data} = useQuery(GET_NOTE,{ variables:{id}});

  

  const [editNote] = useMutation(EDIT_NOTE, {
    variables: {
      id
    },
    onCompleted: () => {
      props.history.push(`/note/${id}`);
    }
  });

  // if the data is loading, display a loading message
  if (loading) return 'Loading...';
  // if there is an error fetching the data, display an error message
  if (error) return <p>Error! Note not found</p>;

  // if (userdata.me.id !== data.note.author.id) {
  //   return <p>You do not have access to edit this note</p>;
  // }

  if (userdata.me.id !== data.note.author.id) {
    return <p>You do not have access to edit this note</p>;
  }
  // if successful, pass the data to the note component
  return <NoteForm content ={data.note.content} action={editNote} />;

};

export default EditNote;