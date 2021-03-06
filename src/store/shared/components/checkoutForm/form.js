import React from 'react'
import {Field, reduxForm} from 'redux-form'
import text from '../../text'

const validateRequired = value => value
  ? undefined
  : text.required;

const validateEmail = value => value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
  ? text.emailInvalid
  : undefined;

const inputField = (field) => (
  <div className={field.className}>
    <label htmlFor={field.id}>{field.label}</label>
    <input {...field.input} placeholder={field.placeholder} type={field.type} id={field.id} className={field.meta.touched && field.meta.error
      ? "invalid"
      : ""}/> {field.meta.touched && field.meta.error && <div className="error">{field.meta.error}</div>}
  </div>
)

const textareaField = (field) => (
  <div className={field.className}>
    <label htmlFor={field.id}>{field.label}</label>
    <textarea {...field.input} placeholder={field.placeholder} rows={field.rows} id={field.id} className={field.meta.touched && field.meta.error
      ? "invalid"
      : ""}></textarea>
    {field.meta.touched && field.meta.error && <div className="error">{field.meta.error}</div>}
  </div>
)

class Form extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.onLoad();
  }

  getField = (fieldName) => {
    const fields = this.props.checkoutFields || [];
    const field = fields.find(item => item.name === fieldName);
    return field;
  }

  getFieldStatus = (fieldName) => {
    const field = this.getField(fieldName);
    return field && field.status ? field.status : 'required';
  }

  isFieldOptional = (fieldName) => {
    return this.getFieldStatus(fieldName) === 'optional';
  }

  isFieldHidden = (fieldName) => {
    return this.getFieldStatus(fieldName) === 'hidden';
  }

  getFieldValidators = (fieldName) => {
    const isOptional = this.isFieldOptional(fieldName);
    let validatorsArray = [];
    if(!isOptional) {
      validatorsArray.push(validateRequired);
    }
    if(fieldName === 'email') {
      validatorsArray.push(validateEmail);
    }

    return validatorsArray;
  }

  getFieldPlaceholder = (fieldName) => {
    const field = this.getField(fieldName);
    return field && field.placeholder && field.placeholder.length > 0 ? field.placeholder : '';
  }

  getFieldLabelText = (fieldName) => {
    const field = this.getField(fieldName);
    if(field && field.label && field.label.length > 0) {
      return field.label;
    } else {
      switch (fieldName) {
        case 'email':
          return text.email;
          break;
        case 'mobile':
          return text.mobile;
          break;
        case 'country':
          return text.country;
          break;
        case 'state':
          return text.state;
          break;
        case 'city':
          return text.city;
          break;
        default:
          return 'Unnamed field';
      }
    }
  }

  getFieldLabel = (fieldName) => {
    const labelText = this.getFieldLabelText(fieldName);
    return this.isFieldOptional(fieldName) ? `${labelText} (${text.optional})` : labelText;
  }

  render() {
    const {
      handleSubmit,
      pristine,
      invalid,
      valid,
      reset,
      submitting,
      loadingShippingMethods,
      loadingPaymentMethods,
      processingCheckout,
      initialValues,
      saveShippingCountry,
      saveShippingState,
      saveShippingCity,
      saveShippingMethod,
      savePaymentMethod,
      finishCheckout,
      paymentMethods,
      shippingMethods,
      inputClassName = 'checkout-field',
      buttonClassName = 'checkout-button'
    } = this.props;

    if (initialValues && initialValues.items.length > 0) {
      return (
        <form onSubmit={handleSubmit}>
          <div className="checkout-form">

            {!this.isFieldHidden('email') &&
              <Field className={inputClassName} name="email" id="customer.email" component={inputField} type="email"
                label={this.getFieldLabel('email')}
                validate={this.getFieldValidators('email')}
                placeholder={this.getFieldPlaceholder('email')}/>
            }

            {!this.isFieldHidden('mobile') &&
              <Field className={inputClassName} name="mobile" id="customer.mobile" component={inputField} type="tel"
                label={this.getFieldLabel('mobile')}
                validate={this.getFieldValidators('mobile')}
                placeholder={this.getFieldPlaceholder('mobile')}/>
            }

            <h2>{text.shippingTo}</h2>

            {!this.isFieldHidden('country') &&
              <Field className={inputClassName} name="shipping_address.country" id="shipping_address.country" component={inputField} type="text"
                label={this.getFieldLabel('country')}
                validate={this.getFieldValidators('country')}
                placeholder={this.getFieldPlaceholder('country')}
                onBlur={(event, value) => setTimeout(() => saveShippingCountry(value))}/>
            }

            {!this.isFieldHidden('state') &&
              <Field className={inputClassName} name="shipping_address.state" id="shipping_address.state" component={inputField} type="text"
                label={this.getFieldLabel('state')}
                validate={this.getFieldValidators('state')}
                placeholder={this.getFieldPlaceholder('state')}
                onBlur={(event, value) => setTimeout(() => saveShippingState(value))}/>
            }

            {!this.isFieldHidden('city') &&
              <Field className={inputClassName} name="shipping_address.city" id="shipping_address.city" component={inputField} type="text"
                label={this.getFieldLabel('city')}
                validate={this.getFieldValidators('city')}
                placeholder={this.getFieldPlaceholder('city')}
                onBlur={(event, value) => setTimeout(() => saveShippingCity(value))}/>
            }

            <h2>{text.shippingMethod} {loadingShippingMethods && <small>{text.loading}</small>}</h2>
            <div className="shipping-methods">
              {shippingMethods.map(method => <label key={method.id} className="shipping-method">
                <Field name="shipping_method_id" component="input" type="radio" value={method.id} onClick={() => saveShippingMethod(method.id)}/>
                <div>
                  <div className="shipping-method-name">{method.name}</div>
                  <div className="shipping-method-description">{method.description}</div>
                </div>
                <span className="shipping-method-rate">{method.price > 0 && method.price}</span>
              </label>)}
            </div>

            <h2>{text.paymentMethod} {loadingPaymentMethods && <small>{text.loading}</small>}</h2>
            <div className="payment-methods">
              {paymentMethods.map(method => <label key={method.id} className="payment-method">
                <Field name="payment_method_id" component="input" type="radio" value={method.id} onClick={() => savePaymentMethod(method.id)}/>
                <div>
                  <div className="payment-method-name">{method.name}</div>
                  <div className="payment-method-description">{method.description}</div>
                </div>
                <span className="payment-method-logo"></span>
              </label>)}
            </div>

            <h2>{text.shippingAddress}</h2>

            <Field className={inputClassName} name="shipping_address.full_name" id="shipping_address.full_name" component={inputField} type="text" label={text.fullName} validate={[validateRequired]}/>
            <Field className={inputClassName} name="shipping_address.address1" id="shipping_address.address1" component={inputField} type="text" label={text.address1} validate={[validateRequired]}/>
            <Field className={inputClassName} name="shipping_address.address2" id="shipping_address.address2" component={inputField} type="text" label={text.address2}/>
            <Field className={inputClassName} name="shipping_address.zip" id="shipping_address.zip" component={inputField} type="text" label={text.zip} validate={[validateRequired]}/>
            <Field className={inputClassName} name="shipping_address.phone" id="shipping_address.phone" component={inputField} type="text" label={text.phone}/>
            <Field className={inputClassName} name="shipping_address.company" id="shipping_address.company" component={inputField} type="text" label={text.company}/>
            <Field className={inputClassName} name="comments" id="customer.comments" component={textareaField} type="text" label={text.comments} rows="3"/>

            <div className="checkout-button-wrap">
              <button type="button" onClick={handleSubmit(data => {
                finishCheckout(data)
              })} disabled={submitting || processingCheckout} className={buttonClassName}>{text.orderSubmit}</button>
            </div>
          </div>
        </form>
      )
    } else {
      return <p>{text.emptyCheckout}</p>
    }
  }
}

export default reduxForm({form: 'FormCheckout', enableReinitialize: true, keepDirtyOnReinitialize: true})(Form)
