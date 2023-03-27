const successmessage = (result,data) => {
  return {
    status: 'done',
    result,
    data,
  }
}

const errormessage = (message,error) => {
  return {
    status: 'error',
    error,
    message
  }
}
const successmessagewith = (result) => {
  return {
    status: 'done',
    result
  }
}

const errormessagewith = (error,message) => {
  return {
    status: 'error',
    error,
    message
  }
}

module.exports = { successmessage, errormessage ,successmessagewith ,errormessagewith }