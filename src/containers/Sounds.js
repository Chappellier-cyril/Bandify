import { connect } from 'react-redux';
import Sounds from 'src/components/Profiles/MyProfile/Sounds';

const mapStateToProps = (state) => ({
  sounds: state.users.user.sounds,
});

const mapDispatchToProps = () => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(Sounds);
