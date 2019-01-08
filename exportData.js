const ical = require('ical-generator')()
const fs = require('fs')
const path = require('path')

const exportData = (events, config) => {
  events.forEach(event => ical.createEvent({
    start: new Date(event.periode.dateStart),
    end: new Date(event.periode.dateEnd),
    summary: event.title,
    description: `Professor: ${event.professor}\nPromotion: ${event.promotion}\nRoom: ${event.room}`
  }))

  const filePath = path.join(config.EXPORT_PATH, config.EXPORT_NAME)
  if(fs.existsSync(filePath)){
    console.log("File allready exists, removing.")
    fs.unlinkSync(filePath)
  }
  if(!fs.existsSync(path.dirname(filePath))){
    console.log("Path file does not exist, creating.")
    fs.mkdirSync(path.dirname(filePath))
  }
  fs.writeFileSync(filePath, ical.toString())

  return events
}

module.exports = exportData