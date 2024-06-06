import { module, test } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-testing-example/tests/helpers';
import Pretender from 'pretender';

module('Acceptance | products', function (hooks) {
  setupApplicationTest(hooks);

  test('visiting /products', async function (assert) {
    const server = new Pretender();
    const getProductList = () => [
      {
        title: 'Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops',
        category: "men's clothing",
        description: 'Your perfect pack for everyday use',
        id: 1,
        image: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',
        price: 109.95,
        rating: { rate: 3.9, count: 120 },
      },
      {
        title: 'Fjallraven 2',
        category: "men's clothing",
        description: 'Your perfect pack for everyday use',
        id: 1,
        image: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',
        price: 109.95,
        rating: { rate: 3.9, count: 120 },
      },
    ];

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
