import moment from 'moment-timezone'

export const logSort = {
  sortByDate
}

function sortByDate (a,b){
  let timeA = moment(a.happenedAt)
  let timeB = moment(b.happenedAt)
  return timeA.isBefore(timeB) ? 1 : -1
}
