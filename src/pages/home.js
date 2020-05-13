import React from 'react';
import Button from '../components/Button';
import ReactMarkDown from 'react-markdown';

import { useQuery, gql } from '@apollo/client';
import NoteFeed from '../components/NoteFeed';
const GET_NOTES = gql`
  query NoteFeed($cursor: String) {
    noteFeed(cursor: $cursor) {
      cursor
      hasNextPage
      notes {
        id
        createdAt
        content
        favoriteCount
        author {
          username
          id
          avatar
        }
      }
    }
  }
`;

const Home = () => {

  const { data, loading, error, fetchMore } = useQuery(GET_NOTES);

  if (loading) {
    return (
      <p>loading......</p>
    );
  }

  if (error) {
    return (
      <p>Error ...</p>
    );
  }

  return (
    <React.Fragment>
      <NoteFeed notes={data.noteFeed.notes} />
      {/* fetch more data */}
      {data.noteFeed.hasNextPage && (
        <Button onClick={() => fetchMore({
          variables: {
            cursor: data.noteFeed.cursor
          },
          updateQuery: (previousResult,{fetchMoreResult}) =>{
            return {
              noteFeed : {
                cursor : fetchMoreResult.noteFeed.cursor,
                hasNextPage : fetchMoreResult.noteFeed.hasNextPage,
                notes : [...previousResult.noteFeed.notes,...fetchMoreResult.noteFeed.notes],
                __typename: 'noteFeed'
              }
            }
          }
        })}>Load more</Button>
      )}
    </React.Fragment>

  );
}

export default Home;