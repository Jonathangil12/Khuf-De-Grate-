import React, { useState, useRef, useEffect } from 'react';
import products from './data/products';

function App() {
  const [cart, setCart] = useState([]);
  const [scrimOpen, setScrimOpen] = useState(false);
  const [scrimSubmitted, setScrimSubmitted] = useState(false);
  const [scrimForm, setScrimForm] = useState({
    rank: '',
    mainRole: '',
    focus: '',
    contact: '',
  });
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [checkoutSubmitted, setCheckoutSubmitted] = useState(false);
  const [productsHighlighted, setProductsHighlighted] = useState(false);
  const productsSectionRef = useRef(null);
  const [donateAmount, setDonateAmount] = useState('');
  const [donateSelectedQuick, setDonateSelectedQuick] = useState(null);
  const [donateSubmitted, setDonateSubmitted] = useState(false);

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  useEffect(() => {
    if (!productsHighlighted) return;
    const timeout = setTimeout(() => setProductsHighlighted(false), 900);
    return () => clearTimeout(timeout);
  }, [productsHighlighted]);

  const scrollToProducts = () => {
    if (productsSectionRef.current) {
      productsSectionRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
      setProductsHighlighted(true);
    }
  };

  const startWithMythicFocus = () => {
    const mythicProduct =
      products.find((p) => p.id === 'mythic-shotcaller') ||
      products.find((p) =>
        (p.level || '').toLowerCase().includes('mythic')
      );
    if (mythicProduct) {
      addToCart(mythicProduct);
    }
    scrollToProducts();
  };

  const browseAllRoles = () => {
    scrollToProducts();
  };

  const handleScrimChange = (field, value) => {
    setScrimForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleScrimSubmit = (event) => {
    event.preventDefault();
    setScrimSubmitted(true);
  };

  const closeScrim = () => {
    setScrimOpen(false);
    setScrimSubmitted(false);
    setScrimForm({
      rank: '',
      mainRole: '',
      focus: '',
      contact: '',
    });
  };

  const openCheckout = () => {
    if (!cart.length) return;
    setCheckoutOpen(true);
    setCheckoutSubmitted(false);
  };

  const handleCheckoutConfirm = () => {
    setCheckoutSubmitted(true);
    setCart([]);
  };

  const closeCheckout = () => {
    setCheckoutOpen(false);
    setCheckoutSubmitted(false);
  };

  const handleQuickDonate = (value) => {
    setDonateSelectedQuick(value);
    setDonateAmount(String(value));
    setDonateSubmitted(false);
  };

  const handleDonateInputChange = (event) => {
    setDonateSelectedQuick(null);
    setDonateAmount(event.target.value);
    setDonateSubmitted(false);
  };

  const handleDonateSubmit = (event) => {
    event.preventDefault();
    const numeric = parseFloat(donateAmount);
    if (!numeric || numeric <= 0) {
      return;
    }
    setDonateSubmitted(true);
  };

  return (
    <div className="app-shell">
      <header className="nav">
        <div className="nav-left">
          <div className="logo">khuf de grate</div>
          <div className="tagline">Mobile Legends tips, builds &amp; pro tricks - PREMIUM FEELS TACTILE USE</div>
        </div>
        <div className="nav-right">
          <div className="pill pill-live">Live meta feed</div>
          <div className="cart-pill">
            <span>Cart</span>
            <span className="cart-count">{cart.length}</span>
          </div>
        </div>
      </header>

      <main className="page">
        <section className="hero">
          <div className="hero-copy">
            <h1>
              Premium tactile
              <span className="accent"> Mobile Legends</span> brainpower
            </h1>
            <p>
              SaaS-style packs with builds, rotations and pro tricks tuned for
              ranked grind. Designed to feel like a coach in your pocket, not a
              boring guide.
            </p>
            <div className="hero-actions">
              <button
                className="btn btn-primary"
                onClick={startWithMythicFocus}
              >
                Start with Mythic focus
              </button>
              <button
                className="btn btn-ghost"
                onClick={browseAllRoles}
              >
                Browse all roles
              </button>
            </div>
            <div className="hero-meta">
              <div>
                <span className="hero-number">+1200</span>
                <span className="hero-label">avg. MMR gained</span>
              </div>
              <div>
                <span className="hero-number">24/7</span>
                <span className="hero-label">patch-aware updates</span>
              </div>
              <div>
                <span className="hero-number">0%</span>
                <span className="hero-label">tilt, full control</span>
              </div>
            </div>
          </div>

          <aside className="cart-panel">
            <h2>Your session cart</h2>
            {cart.length === 0 ? (
              <p className="cart-empty">Add a pack to feel the upgrade.</p>
            ) : (
              <>
                <ul className="cart-list">
                  {cart.map((item) => (
                    <li key={item.id} className="cart-item">
                      <div>
                        <div className="cart-item-name">{item.name}</div>
                        <div className="cart-item-meta">{item.level} • x{item.qty}</div>
                      </div>
                      <div className="cart-item-right">
                        <span className="cart-item-price">${item.price * item.qty}</span>
                        <button
                          className="cart-remove"
                          onClick={() => removeFromCart(item.id)}
                        >
                          remove
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
                <div className="cart-footer">
                  <div className="cart-total">
                    <span>Total control</span>
                    <span>${cartTotal}</span>
                  </div>
                  <button
                    className="btn btn-full"
                    onClick={openCheckout}
                  >
                    Lock in these feels
                  </button>
                </div>
              </>
            )}
          </aside>
        </section>

        <section
          className={`products-section${productsHighlighted ? ' products-section-highlight' : ''}`}
          ref={productsSectionRef}
        >
          <div className="section-header">
            <h2>Mobile Legends SaaS packs</h2>
            <p>Each pack is a living product: updated as the meta shifts.</p>
          </div>
          <div className="products-grid">
            {products.map((product) => (
              <article key={product.id} className="product-card">
                <div className="product-chip">{product.level}</div>
                <h3>{product.name}</h3>
                <p className="product-tagline">{product.tagline}</p>
                <p className="product-description">{product.description}</p>
                <ul className="product-features">
                  {product.features.map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>
                <div className="product-footer">
                  <div className="product-price">
                    <span className="price-number">${product.price}</span>
                    <span className="price-label">per month</span>
                  </div>
                  <button
                    className="btn btn-outline"
                    onClick={() => addToCart(product)}
                  >
                    Add to cart
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="strip">
          <div className="strip-content">
            <div>
              <h2>Play with intent, not impulse.</h2>
              <p>
                Deep dive notes, lane checklists and tactile routines you can
                feel every queue.
              </p>
            </div>
            <button
              className="btn btn-primary"
              onClick={() => setScrimOpen(true)}
            >
              Book a scrim review
            </button>
          </div>
        </section>

        {scrimOpen && (
          <div className="scrim-overlay">
            <div className="scrim-dialog">
              <div className="scrim-header">
                <div className="scrim-pill">Book of scrim · premium feels</div>
                <h3 className="scrim-title">Lock in a tactile scrim review</h3>
                <p className="scrim-subtitle">
                  Share where you are, where you want to climb, and we shape a
                  session that feels like a live upgrade – not a lecture.
                </p>
              </div>

              {!scrimSubmitted ? (
                <form className="scrim-form" onSubmit={handleScrimSubmit}>
                  <div className="scrim-row">
                    <div className="scrim-field">
                      <label className="scrim-label" htmlFor="rank">
                        Current rank
                      </label>
                      <input
                        id="rank"
                        className="scrim-input"
                        type="text"
                        placeholder="Mythic, Legend, Epic..."
                        value={scrimForm.rank}
                        onChange={(e) =>
                          handleScrimChange('rank', e.target.value)
                        }
                      />
                    </div>
                    <div className="scrim-field">
                      <label className="scrim-label" htmlFor="mainRole">
                        Main role
                      </label>
                      <input
                        id="mainRole"
                        className="scrim-input"
                        type="text"
                        placeholder="Gold lane, jungle, mid..."
                        value={scrimForm.mainRole}
                        onChange={(e) =>
                          handleScrimChange('mainRole', e.target.value)
                        }
                      />
                    </div>
                  </div>

                  <div className="scrim-field">
                    <label className="scrim-label" htmlFor="focus">
                      Session focus
                    </label>
                    <input
                      id="focus"
                      className="scrim-input"
                      type="text"
                      placeholder="Rotations, draft, micro, tilt control..."
                      value={scrimForm.focus}
                      onChange={(e) =>
                        handleScrimChange('focus', e.target.value)
                      }
                    />
                  </div>

                  <div className="scrim-field">
                    <label className="scrim-label" htmlFor="contact">
                      Contact (Discord / email)
                    </label>
                    <input
                      id="contact"
                      className="scrim-input"
                      type="text"
                      placeholder="khuf#0000 or you@example.com"
                      value={scrimForm.contact}
                      onChange={(e) =>
                        handleScrimChange('contact', e.target.value)
                      }
                    />
                  </div>

                  <div className="scrim-footer-bar">
                    <button
                      type="button"
                      className="scrim-close"
                      onClick={closeScrim}
                    >
                      Cancel
                    </button>
                    <button type="submit" className="btn btn-full">
                      Send premium scrim request
                    </button>
                  </div>
                </form>
              ) : (
                <div className="scrim-success">
                  <h4>Request sent with premium feels.</h4>
                  <p>
                    Your scrim details are locked in. We will reach out via your
                    contact to align time, server and lobby – tuned to the
                    current Mobile Legends meta.
                  </p>
                  <button className="btn btn-ghost" onClick={closeScrim}>
                    Close and keep grinding
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {checkoutOpen && (
          <div className="scrim-overlay">
            <div className="scrim-dialog checkout-dialog">
              <div className="scrim-header">
                <div className="scrim-pill">Session checkout · premium feels</div>
                <h3 className="scrim-title">Lock in these feels</h3>
                <p className="scrim-subtitle">
                  Review your premium Mobile Legends packs before we lock them
                  in as a focused session stack.
                </p>
              </div>

              {!checkoutSubmitted ? (
                <>
                  <ul className="checkout-list">
                    {cart.map((item) => (
                      <li key={item.id} className="checkout-item">
                        <div>
                          <div className="checkout-name">{item.name}</div>
                          <div className="checkout-meta">
                            {item.level} • x{item.qty}
                          </div>
                        </div>
                        <div className="checkout-price">
                          ${item.price * item.qty}
                        </div>
                      </li>
                    ))}
                  </ul>
                  <div className="checkout-summary">
                    <div>
                      <span className="checkout-label">Premium total</span>
                      <span className="checkout-number">${cartTotal}</span>
                    </div>
                  </div>
                  <div className="scrim-footer-bar">
                    <button
                      type="button"
                      className="scrim-close"
                      onClick={closeCheckout}
                    >
                      Keep editing cart
                    </button>
                    <button
                      type="button"
                      className="btn btn-full"
                      onClick={handleCheckoutConfirm}
                    >
                      Confirm premium lock-in
                    </button>
                  </div>
                </>
              ) : (
                <div className="scrim-success checkout-success">
                  <h4>Feels locked in.</h4>
                  <p>
                    Your session stack is locked. Cart is cleared so you can
                    queue up new experiments without losing this setup.
                  </p>
                  <button className="btn btn-ghost" onClick={closeCheckout}>
                    Close and keep grinding
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        <section className="donate-section">
          <div className="donate-header">
            <h2>Tip the climb</h2>
            <p>
              If these premium feels keep your Mobile Legends sessions sharp,
              you can drop a small donation.
            </p>
          </div>
          <form className="donate-form" onSubmit={handleDonateSubmit}>
            <div className="donate-options">
              {[1, 5, 10].map((value) => (
                <button
                  key={value}
                  type="button"
                  className={`donate-amount-btn${donateSelectedQuick === value ? ' active' : ''}`}
                  onClick={() => handleQuickDonate(value)}
                >
                  ${value}
                </button>
              ))}
              <div className="donate-input-wrapper">
                <span className="donate-input-prefix">$</span>
                <input
                  type="number"
                  min="0"
                  step="1"
                  className="donate-input"
                  placeholder="Custom"
                  value={donateAmount}
                  onChange={handleDonateInputChange}
                />
              </div>
            </div>
            <div className="donate-actions">
              <button type="submit" className="btn btn-primary donate-submit">
                Donate
              </button>
              {donateSubmitted && (
                <span className="donate-success">
                  Premium thank you – every dollar fuels more tactile builds and
                  scrim notes.
                </span>
              )}
            </div>
          </form>
        </section>

        <footer className="footer">
          <div>© {new Date().getFullYear()} khuf de grate.</div>
          <div className="footer-links">
            <a
              href="https://www.tiktok.com/@gilpjonathan?_r=1&_t=ZS-91O4ilnzpcW"
              target="_blank"
              rel="noreferrer"
              className="footer-tiktok"
            >
              TikTok · @gilpjonathan
            </a>
            <a href="#">Discord access</a>
            <a href="#">Patch notes</a>
            <a href="#">Support</a>
          </div>
        </footer>
      </main>
    </div>
  );
}

export default App;
