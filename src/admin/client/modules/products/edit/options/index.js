import { connect } from 'react-redux'
import { reset } from 'redux-form';
// import { fetchProduct, cancelProductEdit, updateProduct  } from '../../actions'
import ProductOptionsForm from './components/form'

const mapStateToProps = (state) => {
  return {
    // settings: state.settings.settings,
    // initialValues: state.products.editProduct,
    // isUpdating: state.products.isUpdating
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    // fetchData: (productId) => {
    //   dispatch(fetchProduct(productId));
    // },
    // eraseData: () => {
    //   dispatch(cancelProductEdit());
    // },
    // onSubmit: (values) => {
    //   dispatch(updateProduct(values));
    // }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductOptionsForm);
