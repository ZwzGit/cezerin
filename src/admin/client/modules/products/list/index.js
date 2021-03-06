import { connect } from 'react-redux'
import { fetchProducts, fetchMoreProducts, selectProduct, deselectProduct, selectAllProduct, deselectAllProduct, createProduct } from '../actions'
import List from './components/list'

const mapStateToProps = (state) => {
  return {
    settings: state.settings.settings,
    items: state.products.items,
    selected: state.products.selected,
    loadingItems: state.products.loadingItems,
    hasMore: state.products.hasMore,
    totalCount: state.products.totalCount
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onLoad: () => {
      dispatch(fetchProducts(true));
    },
    onSelect: (event) => {
      const productId = event.target.value;
      const checked = event.target.checked;

      if(checked) {
        dispatch(selectProduct(productId));
      } else {
        dispatch(deselectProduct(productId));
      }
    },
    onSelectAll: (event) => {
      const checked = event.target.checked;

      if(checked) {
        dispatch(selectAllProduct());
      } else {
        dispatch(deselectAllProduct());
      }
    },
    loadMore: () => {
      dispatch(fetchMoreProducts());
    },
    onCreate: () => {
      dispatch(createProduct())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(List);
