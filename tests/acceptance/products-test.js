import { module, test } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-testing-example/tests/helpers';
import Pretender from 'pretender';
import { getProductList } from './../data-generators';

module('Acceptance | products', function (hooks) {
  setupApplicationTest(hooks);

  test('visiting /products', async function (assert) {
    const server = new Pretender();

    server.get('https://fakestoreapi.com/products', () => [
      200,
      { 'Content-Type': 'application/json' },
      JSON.stringify(getProductList()),
    ]);

    await visit('/products');
    // debugger;
    assert.strictEqual(currentURL(), '/products');
    assert
      .dom('[data-test-product="0"]')
      .hasText('Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops');
    assert.dom('[data-test-product="1"]').hasText('Fjallraven 2');
  });
});
