import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useMutation, useApolloClient, gql } from '@apollo/client';

import Button from '../components/Button';
import UserForm from '../components/UserForm';

const SINGUP_USER = gql`
    mutation signUp($email: String!, $username: String!, $password: String!) {
    signUp(email: $email, username: $username, password: $password)
  }

`;

const Wrapper = styled.div`
  border: 1px solid #f5f4f0;
  max-width: 500px;
  padding: 1em;
  margin: 0 auto;
`;

const Form = styled.form`
  label,
  input {
    display: block;
    line-height: 2em;
  }

  input {
    width: 100%;
    margin-bottom: 1em;
  }
`;

const SignUp = props => {


    const [values, setValues] = useState();

    const client = useApolloClient();


    const [signUp, { loading, error }] = useMutation(SINGUP_USER, {

        onCompleted: data => {
            localStorage.setItem('token', data.signUp);
            client.cache.writeData({ data: { isLoggedIn: true } });
            props.history.push('/');
        }

    });

    // const onChange = event => {
    //     setValues({ ...values, [event.target.name]: event.target.value });
    // }

    useEffect(() => {
        document.title = "Sign Up — Notedly";
    })

    return (
        <React.Fragment>
            <UserForm action={signUp} formType="signup" />
            {/* if the data is loading, display a loading message*/}
            {loading && <p>Loading...</p>}
            {/* if there is an error, display a error message*/}
            {error && <p>Error creating an account!</p>}
        </React.Fragment>
    );
}

export default SignUp;