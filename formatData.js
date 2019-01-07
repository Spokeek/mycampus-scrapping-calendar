const formatData = (data) => {
  return data.reduce((acc, curr) => ([...acc, ...curr]), [])
}

module.exports = formatData