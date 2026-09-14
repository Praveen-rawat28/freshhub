import React from 'react';
import { useApp } from '../context/AppContext';
import { Plus, Minus, Check } from 'lucide-react';

export default function ProductCard({ product }) {
  const { cart, addToCart, updateCartQty } = useApp();
  const cartItem = cart.find((item) => item.id === product.id);

  return (
    <div className="product-card">
      <div className="product-img-wrap">
        <img
          src={product.img}
          alt={product.name}
          className="product-img"
          onError={(e) => {
            e.target.src = './favicon.png';
          }}
        />
        <span className="product-batch-tag">{product.batch.split('·')[0]}</span>
      </div>

      <div className="product-body">
        <h3 className="product-title">{product.name}</h3>
        <p className="product-pack">{product.pack} · {product.origin}</p>

        <div className="product-footer">
          <div>
            <span className="product-price">₹{product.price}</span>
            {product.mrp > product.price && (
              <span style={{ fontSize: '11px', color: '#64748b', textDecoration: 'line-through', marginLeft: '6px' }}>
                ₹{product.mrp}
              </span>
            )}
          </div>

          {cartItem ? (
            <div className="qty-control">
              <button
                className="qty-btn"
                onClick={() => updateCartQty(product.id, -1)}
                title="Decrease"
              >
                <Minus size={12} />
              </button>
              <span className="qty-val">{cartItem.qty}</span>
              <button
                className="qty-btn"
                onClick={() => updateCartQty(product.id, 1)}
                title="Increase"
              >
                <Plus size={12} />
              </button>
            </div>
          ) : (
            <button className="btn-add-cart" onClick={() => addToCart(product)}>
              <Plus size={14} /> Add
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
