var humanInterval = require('human-interval')

const defaultConfig = {
  'new': '5 minutes',
  'bad': '5 minutes',
  'fresh': '1 day',
  'average': '3 days',
  'old': '14 days'
}

class SpacedRepetition {
  constructor (date, state, config) {
    this.config = config || defaultConfig
    this.state = state || 'new'
    this.date = date
  }

  nextDate (grade) {
    const getNextTime = () => {
      let time = this.config[this.state] || 0
      return humanInterval(time)
    }

    switch (grade) {
      case 'good':
        if (this.state === 'bad') {
          this.state = 'new'
        } else if (this.state === 'average') {
          this.state = 'old'
        } else if (this.state === 'old') {
          this.state = 'never'
        } else {
          this.state = 'average'
        }
        break
      case 'ok':
        if (this.state === 'bad') {
          this.state = 'new'
        } else {
          this.state = 'fresh'
        }
        break
      default:
        this.state = 'bad'
    }

    this.date = new Date(this.date.getTime() + getNextTime())
    return this
  }

  ok () {
    return this.nextDate('ok')
  }

  good () {
    return this.nextDate('good')
  }

  bad () {
    return this.nextDate('bad')
  }
}

module.exports = SpacedRepetition
