const ical = require('ical-generator')()
const fs = require('fs')
const path = require('path')

const exportData = (events, config) => {
  events.forEach(event => ical.createEvent({
    start: new Date(event.periode.dateStart),
    end: new Date(event.periode.dateEnd),
    summary: event.title,
    description: `Professor: ${event.professor}\nPromotion: ${event.promotion}`
  }))

  const filePath = path.join(config.EXPORT_PATH, config.EXPORT_NAME)
  fs.mkdirSync(path.dirname(filePath))
  fs.writeFileSync(filePath, ical.toString())

  return events
}

module.exports = exportData