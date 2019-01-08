const request = require('request-promise-native')
const cheerio = require('cheerio')
const fs = require('fs')
const getUrl = (urlPattern, username, date) => {
  urlPattern = urlPattern.replace('$USERNAME', username)
  urlPattern = urlPattern.replace('$DATE', date)
  return urlPattern
}

const formatDate = (date = new Date()) => `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`

const getDateForSpecificWeek = (date, weekIndex) => {
  const actualDate = new Date(date)
  const actualFirstDayDate = new Date(actualDate.getFullYear(), actualDate.getMonth(), actualDate.getDate() - actualDate.getDay() + 1)
  const specificFirstDate = new Date(actualFirstDayDate.getTime() + (7 * 24 * 3600 * 1000) * weekIndex)
  return specificFirstDate
}

const getPeriodEventFromPosition = (date, left, period) => {
  const day = Math.round((left - 2 ) / 19.6)

  const res = /(.*) - (.*)/.exec(period)
  if(res === null || res.length !== 3){
    throw "Impossible to extract date from td"
  }

  const dates = res.filter((_, i) => i >= 1).map((str) => str.split(':')).map((periode) => (date.getTime() + (day * 24 * 3600 * 1000) + (periode[0] * 3600 * 1000)))
  return {dateStart: dates[0], dateEnd: dates[1]}
}

const getDataFromProfessorHTML = (professorHtml) => {
  const [_, professor, promotion] = professorHtml.split('<br>')
  return {professor, promotion}
}

const getData = (config) => {
  const {USERNAME_TO_SCRAP, DURATION_TO_GET_IN_WEEKS, URL_PATTERN, CURRENT_DATE} = config
  
  const urls = Array(DURATION_TO_GET_IN_WEEKS).fill()
  .map((_, indexWeek) => getDateForSpecificWeek(CURRENT_DATE, indexWeek))
  .map((date) => formatDate(date))
  .map((date) => getUrl(URL_PATTERN, USERNAME_TO_SCRAP, date))

  return Promise.all(urls.map((url, urlIndex) => request(url).then((html) => {
    const $ = cheerio.load(html, {decodeEntities: false})
    if($('.THeure').length === 0){
      return Promise.resolve([]) 
    }

    const events = $('div.Case').map((_, div) => {
      div = $(div)

      const left = +div.css('left').slice(0, -1) // remove "%"
      const period = div.find('tr:nth-child(1) td:nth-child(1)').text()
      const room = div.find('tr:nth-child(1) td:nth-child(2)').text().substr(6)
      const title = div.find('td.TCase').text()
      const professorHtml = div.find('td.TCProf').html()
         
      return {
        periode: getPeriodEventFromPosition(getDateForSpecificWeek(CURRENT_DATE, urlIndex), left, period),
        title,
        room,
        ...getDataFromProfessorHTML(professorHtml)
      }
    }).get()

    return Promise.resolve(events)
  })))
}

module.exports = getData