import React from 'react';
import ReactMarkdown from 'react-markdown';
import styled from 'styled-components';
import { useQuery } from '@apollo/client';
import { format } from 'date-fns';


// import logged in user UI components
import NoteUser from './NoteUser';

import { IS_LOGGED_IN } from '../gql/query';

// Keep notes from extending wider than 800px
const StyledNote = styled.article`
  max-width: 800px;
  background-color:#fff ;
  color :#035B0E;
  padding : 10px;
  margin: 0 auto; 
  border-radius: 5px;
`;

// Style the note metadata
const MetaData = styled.div`
@media (min-width: 500px) {
display: flex;
align-items: top;
}
`;

// add some space between the avatar and meta info
const MetaInfo = styled.div`
padding-right: 1em;
`;

// align 'UserActions' to the right on large screens
const UserActions = styled.div`
margin-left: auto;
`;

const Image = styled.div`
margin :10px;
float: right;
`;

const Note = ({ note }) => {


    const { loading, error, data } = useQuery(IS_LOGGED_IN);
    // if the data is loading, display a loading message
    if (loading) return <p>Loading...</p>;

    // if there is an error fetching the data, display an error message
    if (error) return <p>Error!</p>;

    return (
        <StyledNote>
            <MetaData>
                <MetaInfo>
                    <Image>⏱️ {note.createdAt}</Image>
                    <img src={note.author.avatar} alt={`${note.author.username} author`} height="50px" style={{ borderRadius: 25 }} />
                    <em> {note.author.username}</em>  ✍️
            </MetaInfo>

                {data.isLoggedIn ? (
                    <UserActions>
                        <NoteUser note={note} />
                    </UserActions>
                ) : (
                        <UserActions>
                            😍  {note.favoriteCount}
                        </UserActions>
                    )}
            </MetaData>     
            <ReactMarkdown source={note.content} />

        </StyledNote>
    );
}

export default Note;