const formatData = (data) => {
  data = data.reduce((acc, curr) => ([...acc, ...curr]), [])
  //console.log(data)
  return data
}

module.exports = formatData