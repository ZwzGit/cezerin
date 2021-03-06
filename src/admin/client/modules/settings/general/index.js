import { connect } from 'react-redux'
import { push } from 'react-router-redux';
import { fetchSettings, updateSettings } from '../actions'
import Form from './components/form'

const mapStateToProps = (state) => {
  return {
    initialValues: state.settings.settings
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onLoad: () => {
      dispatch(fetchSettings())
    },
    onSubmit: (values) => {
      dispatch(updateSettings(values));
    },
    pushUrl: (path) => {
      dispatch(push(path));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Form);
