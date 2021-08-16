import { connect } from 'react-redux';
import { loginUser } from '../../../redux/actions/userActions';
import Login from '../components/Login';

const mapStateToProps = (state) => {
  const { user } = state;
  return {
    user,
  };
};

const mapDispatchToProps = {
  loginUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
