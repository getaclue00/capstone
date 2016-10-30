import DS from 'ember-data';

const { DateTransform } = DS;

export default DateTransform.extend({
  serialize(date) {
    if (date instanceof Date && !isNaN(date)) {
      return date.toISOString();
    } else if (typeof date === "string") {
      // this is needed because datetime-local returns a string object and not a date object
      return new Date(Date.parse(date));
    } else {
      return null;
    }
  }
});
