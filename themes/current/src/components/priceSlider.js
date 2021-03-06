import React from 'react'
import {Link} from 'react-router'
import {Range} from 'rc-slider';
import text from '../lib/text'
import config from '../lib/config'
import * as helper from '../lib/helper'

export default class PriceSlider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      minValue: props.minValue > 0 ? props.minValue : props.minPrice,
      maxValue: props.maxValue > 0 ? props.maxValue : props.maxPrice
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.minPrice !== this.props.minPrice || nextProps.maxPrice !== this.props.maxPrice) {
      this.setState({
        minValue: nextProps.minPrice,
        maxValue: nextProps.maxPrice
      });
    }
  }

  setValues = (values) => this.setState({
    minValue: values[0],
    maxValue: values[1]
  });

  render() {
    const { minPrice, maxPrice, setPriceFromAndTo, settings } = this.props;

    return (
      <div className="price-filter">
        <b>{text.price}</b>
        <Range
          min={minPrice}
          max={maxPrice}
          value={[this.state.minValue, this.state.maxValue]}
          disabled={maxPrice === 0}
          className="price-filter-range"
          onAfterChange={values => {setPriceFromAndTo(...values)}}
          onChange={this.setValues}
        />
        <div className="columns is-mobile is-gapless price-filter-values">
          <div className="column has-text-left">
            {helper.formatCurrency(this.state.minValue, settings)}
          </div>
          <div className="column has-text-right">
            {helper.formatCurrency(this.state.maxValue, settings)}
          </div>
        </div>
      </div>
    )
  }
}
