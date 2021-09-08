import { connect } from 'react-redux';
import Login from 'src/components/Login';

const mapStateToProps = (state) => ({
  email: state.login.email,
  password: state.login.password,
  isLogged: state.login.isLogged,
  isError: state.login.isError,
  passwordShown: state.login.passwordShown,
});

const mapDispatchToProps = (dispatch) => ({
  onChangeInput: (key, value) => {
    dispatch({
      type: 'CHANGE_INPUT_LOGIN',
      key,
      value,
    });
  },
  handleSubmit: () => {
    dispatch({ type: 'ON_LOGIN_SUBMIT' });
  },
  togglePasswordVisibility: () => {
    dispatch({ type: 'ON_PASSWORD_TOGGLE' });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
