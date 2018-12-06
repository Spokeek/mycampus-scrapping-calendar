const REQUIRED_ENV = ['URL_PATTERN', 'USERNAME_TO_SCRAP', 'DURATION_TO_GET_IN_WEEKS']

const throwError = (message) => {
  console.error(`[ERROR] ${message}`)
  process.exit(1)
}

const loadConfig = () => {
  require('dotenv').config()

  if(REQUIRED_ENV.map((cookieKey) => process.env[cookieKey]).some((cookieValue) => cookieValue === undefined)){
    throwError(`The following environement variables are mandatory: ${REQUIRED_ENV.join(', ')}`)
  }

  const USERNAME_TO_SCRAP = process.env['USERNAME_TO_SCRAP']

  let DURATION_TO_GET_IN_WEEKS = process.env['DURATION_TO_GET_IN_WEEKS']
  if(isNaN(DURATION_TO_GET_IN_WEEKS)){
    throwError("Your env variable DURATION_TO_GET_IN_WEEKS is not a number.")
  }
  DURATION_TO_GET_IN_WEEKS = +DURATION_TO_GET_IN_WEEKS
  if(Math.floor(DURATION_TO_GET_IN_WEEKS) !== DURATION_TO_GET_IN_WEEKS){
    throwError("Your env variable DURATION_TO_GET_IN_WEEKS is supposed to be a whole number.")
  }
  if(DURATION_TO_GET_IN_WEEKS <= 0){
    throwError("Your env variable DURATION_TO_GET_IN_WEEKS is supposed to be superior to 0.")
  }

  const URL_PATTERN = process.env['URL_PATTERN']
  if(!URL_PATTERN.includes('$USERNAME') || !URL_PATTERN.includes('$DATE')){
    throwError("Your env variable URL_PATTERN doesn't contains the supposed parameters $USERNAME and $DATE.")
  }
}

module.exports = loadConfig