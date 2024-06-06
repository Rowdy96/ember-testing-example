import { module, test } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-testing-example/tests/helpers';

module('Acceptance | home', function (hooks) {
  setupApplicationTest(hooks);

  test('visiting /home', async function (assert) {
    await visit('/home');
    assert.strictEqual(currentURL(), '/home');
    assert.dom('[data-test-home-page-header]').hasText('Home Page');
  });
});
