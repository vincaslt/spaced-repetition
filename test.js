const chai = require('chai')
const SpacedRepetition = require('./index.js')
var humanInterval = require('human-interval')
chai.should()

// Provide custom config
const config = {
  'bad': 60000, // 1 minute
  'new': 180000, // 3 minutes
  'fresh': '15 minutes',
  'average': '1 day',
  'old': '5 days'
}

const TEST_DATE = new Date(1478425537713)

const getTimeDifference = (date) => date.getTime() - TEST_DATE.getTime()

it('should go from new to fresh, when grade is "ok", within 15 minutes', () => {
  const word = new SpacedRepetition(config, TEST_DATE, 'new')
  const status = word.ok()
  const diff = getTimeDifference(status.date)
  return diff.should.equal(humanInterval(config['fresh']))
})

it('should go from bad to new, when grade is "good", within 3 minutes', () => {
  const word = new SpacedRepetition(config, TEST_DATE, 'bad')
  const status = word.good()
  const diff = getTimeDifference(status.date)
  return diff.should.equal(humanInterval(config['new']))
})

it('should go from new to average, when grade is "good", within 1 day', () => {
  const word = new SpacedRepetition(config, TEST_DATE, 'new')
  const status = word.good()
  const diff = getTimeDifference(status.date)
  return diff.should.equal(humanInterval(config['average']))
})

it('should go from bad to new, when grade is "ok", within 3 minutes', () => {
  const word = new SpacedRepetition(config, TEST_DATE, 'bad')
  const status = word.ok()
  const diff = getTimeDifference(status.date)
  return diff.should.equal(humanInterval(config['new']))
})

it('should go from fresh to average, when grade is "good", within 1 day', () => {
  const word = new SpacedRepetition(config, TEST_DATE, 'fresh')
  const status = word.good()
  const diff = getTimeDifference(status.date)
  return diff.should.equal(humanInterval(config['average']))
})

it('should go from average to old, when grade is "good", within 5 days', () => {
  const word = new SpacedRepetition(config, TEST_DATE, 'average')
  const status = word.good()
  const diff = getTimeDifference(status.date)
  return diff.should.equal(humanInterval(config['old']))
})

it('should go from fresh to fresh, when grade is "ok", within 15 minutes', () => {
  const word = new SpacedRepetition(config, TEST_DATE, 'fresh')
  const status = word.ok()
  const diff = getTimeDifference(status.date)
  return diff.should.equal(humanInterval(config['fresh']))
})

it('should go from average to fresh, when grade is "ok", within 1 day', () => {
  const word = new SpacedRepetition(config, TEST_DATE, 'average')
  const status = word.ok()
  const diff = getTimeDifference(status.date)
  return diff.should.equal(humanInterval(config['fresh']))
})

it('should go from old to fresh, when grade is "ok", within 1 day', () => {
  const word = new SpacedRepetition(config, TEST_DATE, 'old')
  const status = word.ok()
  const diff = getTimeDifference(status.date)
  return diff.should.equal(humanInterval(config['fresh']))
})

it('should go from old to never, when grade is "good"', () => {
  const word = new SpacedRepetition(config, TEST_DATE, 'old')
  const status = word.good()
  return status.state.should.equal('never')
})

it('should go from new to bad, when grade is "bad", within 1 minute', () => {
  const word = new SpacedRepetition(config, TEST_DATE, 'new')
  const status = word.bad()
  const diff = getTimeDifference(status.date)
  return diff.should.equal(humanInterval(config['bad']))
})

it('should go from fresh to bad, when grade is "bad", within 1 minute', () => {
  const word = new SpacedRepetition(config, TEST_DATE, 'fresh')
  const status = word.bad()
  const diff = getTimeDifference(status.date)
  return diff.should.equal(humanInterval(config['bad']))
})

it('should go from average to bad, when grade is "bad", within 1 minute', () => {
  const word = new SpacedRepetition(config, TEST_DATE, 'average')
  const status = word.bad()
  const diff = getTimeDifference(status.date)
  return diff.should.equal(humanInterval(config['bad']))
})

it('should go from old to bad, when grade is "bad", within 1 minute', () => {
  const word = new SpacedRepetition(config, TEST_DATE, 'old')
  const status = word.bad()
  const diff = getTimeDifference(status.date)
  return diff.should.equal(humanInterval(config['bad']))
})

it('should change state: new -> average -> fresh -> bad -> new -> fresh -> average -> old -> never', () => {
  const word = new SpacedRepetition(config, TEST_DATE, 'new')
  const status = word.good().ok().bad().ok().ok().good().good().good()
  return status.state.should.equal('never')
})
