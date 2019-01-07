const formatDate = (timestamp) => {
  const date = new Date(timestamp)
  const formatedDate = date.toLocaleDateString()
  const formatedTime = date.toLocaleTimeString()
  return `${formatedDate} - ${formatedTime}`
}

const exportData = (data) => {
  return data
    .map((event) => ({...event, periode: {
      dateStart: formatDate(event.periode.dateStart),
      dateEnd: formatDate(event.periode.dateEnd)
    }}))
}

module.exports = exportData