import { useRef, useState, useContext } from 'react';
import { useMutation } from 'react-query';

import Button from '../../shared/components/button/Button';
import Card from '../../shared/components/card/Card';
import Input from '../../shared/components/input/Input';

import { loginUser, signUpUser } from '../api/users';
import { AuthContext } from '../../shared/context/auth-context';

import './Authenticate.css';

const Authenticate = props => {
  const emailRef = useRef();
  const passwordRef = useRef();

  const [isLoginMode, setLoginMode] = useState(true);
  const auth = useContext(AuthContext);

  const switchModeHandler = () => {
    setLoginMode(prevMode => !prevMode);
  }

  const signUpUserMutation = useMutation({
    mutationFn: signUpUser,
    onSuccess: (data) => {
      console.log(data);
      auth.login(data.id, data.token, data.email);
    },
    onError: (error) => {
      console.log(error)
    }
  });

  const loginUserMutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      console.log(data);
      auth.login(data.id, data.token,data.email);
    },
    onError: (error) => {
      console.log(error)
    }
  });

  const onSubmitHandler = event => {
    event.preventDefault();
    if(isLoginMode) {
      loginUserMutation.mutate({
        email: emailRef.current.value,
        password: passwordRef.current.value
      });
    } else {
      signUpUserMutation.mutate({
        email: emailRef.current.value,
        password: passwordRef.current.value
      });
    }
  }

  return (
    <Card className="authentication">
      <h2>{isLoginMode? 'Login': 'Sign Up'}</h2>
      <form onSubmit={onSubmitHandler}>
        <Input id="email" ref={emailRef} type="email" label="Email" />
        <Input id="password" ref={passwordRef} type="password" label="Password" /> 
        <Button type="submit">
          {isLoginMode? 'LOGIN' : 'SIGNUP'}
        </Button>
      </form>
      <Button inverse onClick={switchModeHandler}>
        {isLoginMode? 'SIGN UP':'LOGIN'}
      </Button>
    </Card>
  )
};

export default Authenticate;