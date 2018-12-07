const request = require('request-promise-native')
const cheerio = require('cheerio')
const fs = require('fs')
const getUrl = (urlPattern, username, date) => {
  urlPattern = urlPattern.replace('$USERNAME', username)
  urlPattern = urlPattern.replace('$DATE', date)
  return urlPattern
}

const formatDate = (date = new Date()) => `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`

const getDateForSpecificWeek = (weekIndex) => {
  const actualDate = new Date()//(2018, 10, 27) // TMP
  const actualFirstDayDate = new Date(actualDate.getFullYear(), actualDate.getMonth(), actualDate.getDate() - actualDate.getDay() + 1)
  const specificFirstDate = new Date(actualFirstDayDate.getTime() + (7 * 24 * 3600 * 1000) * weekIndex)
  return specificFirstDate
}

const getPeriodEventFromPosition = (date, hourHeight, height, top, left) => {
  const day = 1 + Math.round((left - 2 ) / 19.6)
  const timeStartIndex = Math.round((top - 120) / 56.665)
  const timeEndIndex = Math.round((height - 5.16) / hourHeight) // A BIT BUGGED STILL

  const timeStart = timeStartIndex + 8
  const timeEnd = timeStart + timeEndIndex

  return {day, timeStart, timeEnd}
}

const getHourHeight = ($) => {
  const style = $('style').html().split('\n').filter((line) => line.startsWith('.THeure'))[0]
  const res = /height:([^;]*)px;*/.exec(style)
  if(res === null || res.length !== 2){
    throw "Error while parsing the Hours Height Value"
  }
  return res[1]
}

const getData = (config) => {
  const {USERNAME_TO_SCRAP, DURATION_TO_GET_IN_WEEKS, URL_PATTERN} = config
  
  const urls = Array(DURATION_TO_GET_IN_WEEKS).fill()
  .map((_, indexWeek) => getDateForSpecificWeek(indexWeek))
  .map((date) => formatDate(date))
  .map((date) => getUrl(URL_PATTERN, USERNAME_TO_SCRAP, date))

  return Promise.all(urls.map((url, urlIndex) => request(url).then((html) => {
    const $ = cheerio.load(html)
    if($('.THeure').length === 0){
      return Promise.resolve([]) 
    }

    const events = $('div.Case').map((_, div) => {
      div = $(div)
      const height = div.css('height').slice(0, -2) // remove "px"
      const top = div.css('top').slice(0, -2) // remove "px"
      const left = +$(div).css('left').slice(0, -1) // remove "%"
      
      return {data: getPeriodEventFromPosition(getDateForSpecificWeek(urlIndex), getHourHeight($), height, top, left)}
    }).get()
    return Promise.resolve(events)
  })))
}

module.exports = getData