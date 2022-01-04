import { connect } from 'react-redux';
import Notifications from './Notifications';
import { hideError } from '../../redux/actions/errorActions';
import { hideSuccessMsg } from '../../redux/actions/successActions';

const mapStateToProps = (state) => {
  const { error, success } = state;
  return {
    error,
    success,
  };
};

const mapDispatchToProps = {
  hideError,
  hideSuccessMsg,
};

export default connect(mapStateToProps, mapDispatchToProps)(Notifications);
