/*
* MODULES
*/

const CONFIG = require('./config.js')

const GET_DATA = require('./getData.js')

const FORMAT_DATA = require('./formatData.js')

const EXPORT_DATA = require('./exportData.js')

/*
* WORKFLOW
*/

CONFIG()

GET_DATA()
.then((data) => FORMAT_DATA(data))
.then((formatedData) => EXPORT_DATA(formatedData))