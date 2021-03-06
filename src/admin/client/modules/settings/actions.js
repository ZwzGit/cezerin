import * as t from './actionTypes'
import api from 'lib/api'
import messages from 'lib/text'
import { push } from 'react-router-redux';

export function exportRequest() {
  return {
    type: t.THEMES_EXPORT_REQUEST
  }
}

export function exportReceive() {
  return {
    type: t.THEMES_EXPORT_RECEIVE
  }
}

export function installRequest() {
  return {
    type: t.THEMES_INSTALL_REQUEST
  }
}

export function installReceive() {
  return {
    type: t.THEMES_INSTALL_RECEIVE
  }
}

function receiveSettings(settings) {
  return {
    type: t.SETTINGS_RECEIVE,
    settings
  }
}

function receiveEmailSettings(emailSettings) {
  return {
    type: t.EMAIL_SETTINGS_RECEIVE,
    emailSettings
  }
}

function receiveEmailTemplate(emailTemplate) {
  return {
    type: t.EMAIL_TEMPLATE_RECEIVE,
    emailTemplate
  }
}

function requestEmailTemplate() {
  return {
    type: t.EMAIL_TEMPLATE_REQUEST
  }
}

function receiveCheckoutFields(checkoutFields) {
  return {
    type: t.CHECKOUT_FIELDS_RECEIVE,
    checkoutFields
  }
}

function receiveCheckoutField(checkoutField) {
  return {
    type: t.CHECKOUT_FIELD_RECEIVE,
    checkoutField
  }
}

function requestCheckoutField() {
  return {
    type: t.CHECKOUT_FIELD_REQUEST
  }
}

function receiveShippingMethods(shippingMethods) {
  return {
    type: t.SHIPPING_METHODS_RECEIVE,
    shippingMethods
  }
}

function receivePaymentMethods(paymentMethods) {
  return {
    type: t.PAYMENT_METHODS_RECEIVE,
    paymentMethods
  }
}

export function receiveShippingMethod(shippingMethodEdit) {
  return {
    type: t.SHIPPING_METHOD_RECEIVE,
    shippingMethodEdit
  }
}

export function receivePaymentMethod(paymentMethodEdit) {
  return {
    type: t.PAYMENT_METHOD_RECEIVE,
    paymentMethodEdit
  }
}

function receivePages(pages) {
  return {
    type: t.PAGES_RECEIVE,
    pages
  }
}

export function receivePage(pageEdit) {
  return {
    type: t.PAGE_RECEIVE,
    pageEdit
  }
}

function receiveTokens(tokens) {
  return {
    type: t.TOKENS_RECEIVE,
    tokens
  }
}

export function receiveToken(tokenEdit) {
  return {
    type: t.TOKEN_RECEIVE,
    tokenEdit
  }
}

export function receiveNewToken(newToken) {
  return {
    type: t.NEW_TOKEN_RECEIVE,
    newToken
  }
}

export function fetchSettings() {
  return (dispatch, getState) => {
    // API can be not init on app start
    if(api.settings) {
      return api.settings.retrieve().then(({status, json}) => {
        dispatch(receiveSettings(json))
      }).catch(error => {});
    }
  }
}

export function fetchEmailSettings() {
  return (dispatch, getState) => {
    return api.settings.retrieveEmailSettings().then(({status, json}) => {
      dispatch(receiveEmailSettings(json))
    }).catch(error => {});
  }
}

export function deleteLogo() {
  return (dispatch, getState) => {
    return api.settings.deleteLogo()
      .then(({status, json}) => {
        if(status === 200) {
          dispatch(fetchSettings());
        } else {
          throw status
        }
      })
      .catch(error => {
          //dispatch error
          console.log(error)
      });
  }
}

export function updateSettings(settings) {
  return (dispatch, getState) => {
    delete settings.logo_file;
    return api.settings.update(settings).then(({status, json}) => {
      dispatch(receiveSettings(json))
    }).catch(error => {});
  }
}

export function updateEmailSettings(emailSettings) {
  return (dispatch, getState) => {
    return api.settings.updateEmailSettings(emailSettings).then(({status, json}) => {
      dispatch(receiveEmailSettings(json))
    }).catch(error => {});
  }
}

export function fetchEmailTemplate(templateName) {
  return (dispatch, getState) => {
    dispatch(requestEmailTemplate())
    return api.settings.retrieveEmailTemplate(templateName).then(({status, json}) => {
      json.templateName = templateName;
      dispatch(receiveEmailTemplate(json))
    }).catch(error => {});
  }
}

export function updateEmailTemplate(emailTemplate) {
  return (dispatch, getState) => {
    return api.settings.updateEmailTemplate(emailTemplate.templateName, emailTemplate).then(({status, json}) => {
      json.templateName = templateName;
      dispatch(receiveEmailTemplate(json))
    }).catch(error => {});
  }
}

export function fetchCheckoutFields() {
  return (dispatch, getState) => {
    return api.checkout_fields.list().then(({status, json}) => {
      dispatch(receiveCheckoutFields(json))
    }).catch(error => {});
  }
}

export function fetchCheckoutField(fieldName) {
  return (dispatch, getState) => {
    dispatch(requestCheckoutField())
    return api.checkout_fields.retrieve(fieldName).then(({status, json}) => {
      json.fieldName = fieldName;
      dispatch(receiveCheckoutField(json))
    }).catch(error => {});
  }
}

export function updateCheckoutField(checkoutField) {
  return (dispatch, getState) => {
    return api.checkout_fields.update(checkoutField.fieldName, checkoutField).then(({status, json}) => {
      json.fieldName = fieldName;
      dispatch(receiveCheckoutField(json))
    }).catch(error => {});
  }
}

export function fetchShippingMethods() {
  return (dispatch, getState) => {
    return api.shipping_methods.list().then(({status, json}) => {
      dispatch(receiveShippingMethods(json))
    }).catch(error => {});
  }
}

export function fetchPaymentMethods() {
  return (dispatch, getState) => {
    return api.payment_methods.list().then(({status, json}) => {
      dispatch(receivePaymentMethods(json))
    }).catch(error => {});
  }
}

export function updateShippingMethod(method) {
  return (dispatch, getState) => {
    return api.shipping_methods.update(method.id, method).then(({status, json}) => {
      dispatch(fetchShippingMethods())
    }).catch(error => {});
  }
}

export function updatePaymentMethod(method) {
  return (dispatch, getState) => {
    return api.payment_methods.update(method.id, method).then(({status, json}) => {
      dispatch(fetchPaymentMethods())
    }).catch(error => {});
  }
}

export function fetchShippingMethod(id) {
  return (dispatch, getState) => {
    return api.shipping_methods.retrieve(id).then(({status, json}) => {
      dispatch(receiveShippingMethod(json))
    }).catch(error => {});
  }
}

export function fetchPaymentMethod(id) {
  return (dispatch, getState) => {
    return api.payment_methods.retrieve(id).then(({status, json}) => {
      dispatch(receivePaymentMethod(json))
    }).catch(error => {});
  }
}

export function deleteShippingMethod(methodId) {
  return (dispatch, getState) => {
    return api.shipping_methods.delete(methodId).then(({status, json}) => {
      dispatch(fetchShippingMethods())
    }).catch(error => {});
  }
}

export function deletePaymentMethod(methodId) {
  return (dispatch, getState) => {
    return api.payment_methods.delete(methodId).then(({status, json}) => {
      dispatch(fetchPaymentMethods())
    }).catch(error => {});
  }
}

export function createShippingMethod(method) {
  return (dispatch, getState) => {
    return api.shipping_methods.create(method).then(({status, json}) => {
      dispatch(fetchShippingMethods())
    }).catch(error => {});
  }
}

export function createPaymentMethod(method) {
  return (dispatch, getState) => {
    return api.payment_methods.create(method).then(({status, json}) => {
      dispatch(fetchPaymentMethods())
    }).catch(error => {});
  }
}

export function fetchPages() {
  return (dispatch, getState) => {
    return api.pages.list().then(({status, json}) => {
      dispatch(receivePages(json))
    }).catch(error => {});
  }
}

export function fetchPage(id) {
  return (dispatch, getState) => {
    return api.pages.retrieve(id).then(({status, json}) => {
      dispatch(receivePage(json))
    }).catch(error => {});
  }
}

export function createPage(page) {
  return (dispatch, getState) => {
    return api.pages.create(page).then(({status, json}) => {
      dispatch(fetchPages())
    }).catch(error => {});
  }
}

export function updatePage(page) {
  return (dispatch, getState) => {
    return api.pages.update(page.id, page).then(({status, json}) => {
      dispatch(fetchPages())
    }).catch(error => {});
  }
}

export function deletePage(pageId) {
  return (dispatch, getState) => {
    return api.pages.delete(pageId).then(({status, json}) => {
      dispatch(fetchPages())
    }).catch(error => {});
  }
}

export function fetchTokens() {
  return (dispatch, getState) => {
    return api.tokens.list().then(({status, json}) => {
      dispatch(receiveTokens(json))
    }).catch(error => {});
  }
}

export function fetchToken(id) {
  return (dispatch, getState) => {
    return api.tokens.retrieve(id).then(({status, json}) => {
      dispatch(receiveToken(json))
    }).catch(error => {});
  }
}

export function createToken(token) {
  return (dispatch, getState) => {
    return api.tokens.create(token).then(({status, json}) => {
      dispatch(fetchTokens())
      dispatch(receiveNewToken(json.token))
    }).catch(error => {});
  }
}

export function updateToken(token) {
  return (dispatch, getState) => {
    return api.tokens.update(token.id, token).then(({status, json}) => {
      dispatch(fetchTokens())
    }).catch(error => {});
  }
}

export function deleteToken(tokenId) {
  return (dispatch, getState) => {
    return api.tokens.delete(tokenId).then(({status, json}) => {
      dispatch(fetchTokens())
    }).catch(error => {});
  }
}
