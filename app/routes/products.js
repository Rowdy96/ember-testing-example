import Route from '@ember/routing/route';
import { hash } from 'rsvp';

export default class ProductsRoute extends Route {
  async model() {
    let products = [];
    const value = await fetch('https://fakestoreapi.com/products');
    products = value.json();

    // eslint-disable-next-line no-undef
    return hash({
      products,
    });
  }
}
