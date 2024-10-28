function doDate(date) {
  let month = date.getMonth() + 1
  let day = date.getDate()

  if (month.length < 2) {
    month = `0${date.getMonth() + 1}`
  }
  if (day.length < 2) {
    day = `0${date.getDate()}`
  }
  console.log(date.getMonth())
  return `${day}/${month}/${date.getFullYear()}`
}
export default doDate
