function doDate (date) {
  let month = date.getMonth() + 1
  let day = date.getDate()

  if (`${date.getMonth()}`.length < 2) {
    month = `0${date.getMonth() + 1}`
  }
  if (`${date.getDate()}`.length < 2) {
    day = `0${date.getDate()}`
  }
  return `${day}/${month}/${date.getFullYear()}`
}
export default doDate
