# Spaced Repetition

This is a lib designed to be used in a spaced repetition application (e.g. Anki, Mamrise, Lingvist). It should go well with [memparse](https://github.com/vincaslt/memparse).

The provided flow is illustrated  [in this flowchart](http://pichoster.net/images/2016/11/05/2016-11-05_19-00-01.png).

Example usage:
```
const SpacedRepetition = require('spaced-repetition')

const config = {
  'bad': '5 minutes',
  'new': 300000, // in milliseconds (5 minutes)
  'fresh': '1 day',
  'average': '5 days',
  'old': '14 days'
}

const last_shown = new Date()
const last_state = 'new'
const word = new SpacedRepetition(config, last_shown, last_state)
const result = word.good() // new SpacedRepetition instance
```

The above example shows how to create an instance of SpacedRepetition, and change the word's state and set the new date for when to show it again.

The result of running the above code would be a new instance of SpacedRepetition object, with the new state and date.

Because it's a new instance, you could chain the flow like this:

`word.good().ok().bad().good().good()`...

The state is `never` which follows `old` and gets set on `.good()`. After that, no state changes must occur.

## API

- `SpacedRepetition(config, date, state)` - creates a new SpacedRepetition instance, which can be used to indicate word's state and a date on which to ask it again.
 - `config` - `Config` object: with properties `bad, new, fresh, average, old` and each of them having a value of number of milliseconds or a [human-interval](https://github.com/rschmukler/human-interval)
 - `date` - javascript `Date` object, of when the word was last asked
 - `state` - the current state of the word in `String`

- `.nextdate(grade)` - creates the new instance of SpacedRepetition with `state` and `date` changed according to grade (`ok`, `good`, `bad`)
- `.ok()` - wrapper for '.nextDate('ok')'
- `.good()` - wrapper for '.nextDate('good')'
- `.bad()` - wrapper for '.nextDate('bad')'
