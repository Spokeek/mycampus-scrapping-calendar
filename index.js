/*
 * MODULES
 */

const GET_CONFIG = require('./Getconfig.js')

const GET_DATA = require('./getData.js')

const FORMAT_DATA = require('./formatData.js')

const EXPORT_DATA = require('./exportData.js')

/*
 * WORKFLOW
 */

GET_CONFIG()
  .then((config) =>
    GET_DATA(config)
    .then((data) => FORMAT_DATA(data, config))
    .then((formatedData) => EXPORT_DATA(formatedData, config))
    .then((data) => {
      //console.log(JSON.stringify(data))
      console.log(`${data.length} events found.`)
    })
  )