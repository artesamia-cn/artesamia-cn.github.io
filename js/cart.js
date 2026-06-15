const Cart = {
  get: () => JSON.parse(localStorage.getItem('cart') || '[]'),
  add(product) {
    const cart = this.get();
    const existing = cart.find(i => i.id === product.id);
    if (existing) existing.qty++;
    else cart.push({ ...product, qty: 1 });
    localStorage.setItem('cart', JSON.stringify(cart));
  },
  remove(id) {
    const cart = this.get().filter(i => i.id !== id);
    localStorage.setItem('cart', JSON.stringify(cart));
  },
  clear: () => localStorage.removeItem('cart')
};