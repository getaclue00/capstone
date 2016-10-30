import { moduleFor, test } from 'ember-qunit';

moduleFor('transform:isodate', 'Unit | Transform | isodate', {
  // Specify the other units that are required for this test.
  // needs: ['serializer:foo']
});

// Replace this with your real tests.
test('it exists', function(assert) {
  assert.expect(1);

  let transform = this.subject();

  assert.ok(transform);
});

var dateString = "2015-01-01T00:00:00.000Z";
var dateInMillis = Date.parse(dateString);
var date = new Date(dateInMillis);

test("#serialize", function(assert) {
  // test as per https://github.com/emberjs/data/blob/master/tests/unit/transform/date-test.js

  assert.expect(5);

  var transform = this.subject();

  assert.equal(transform.serialize(null), null);
  assert.equal(transform.serialize(undefined), null);
  assert.equal(transform.serialize(new Date("invalid")), null);
  assert.equal(transform.serialize(dateString).toString(), date.toString());
  assert.equal(transform.serialize(date), dateString);
});
