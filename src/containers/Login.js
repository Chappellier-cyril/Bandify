import { connect } from 'react-redux';
import Login from 'src/components/Login';

const mapStateToProps = (state) => ({
  email: state.users.user.email,
  password: state.users.user.password,
  isLogged: state.users.user.isLogged,
  isError: state.users.user.isError,
  passwordShown: state.users.user.passwordShown,
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
