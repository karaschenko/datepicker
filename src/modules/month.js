import moment from 'moment'
import 'moment-range'

export default class Month {
  constructor (month, year) {
    this.start = moment([year, month])
    this.end = this.start.clone().endOf('month')
    let date = moment([year, month]).toString()
    console.log('data' + date)
    this.month = month
    this.year = year
  }
  getWeekStart () {
    return this.start.weekday()
  }
  getDays () {
    return moment.range(this.start, this.end).toArray('days')
  }

  getFormatted () {
    return this.start.format('MMMM YYYY')
  }
}
