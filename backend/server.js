// =====================================================================
// MediShop Backend — Stripe TEST mode + Account system
// Node.js + Express
// =====================================================================
require('dotenv').config();
const express    = require('express');
const cors       = require('cors');
const bcrypt     = require('bcryptjs');
const jwt        = require('jsonwebtoken');
const stripe     = require('stripe')(process.env.STRIPE_SECRET_KEY);

const app  = express();
const PORT = process.env.PORT || 3001;

// ── Middleware ────────────────────────────────────────────────────────
// Raw body needed for Stripe webhooks (must come BEFORE express.json())
app.use('/api/webhook', express.raw({ type: 'application/json' }));
app.use(express.json());
app.use(cors({
  origin: function(origin, callback) {
    callback(null, true); // allow all origins
  },
  credentials: true
}));

// ── In-Memory "database" (replace with real DB later) ─────────────────
// This works perfectly for testing. Just resets when server restarts.
const USERS  = [];   // { id, firstName, lastName, email, passwordHash, createdAt, orders:[] }
const ORDERS = [];   // { id, userId, items, total, status, paymentIntentId, createdAt }

// ── Helpers ────────────────────────────────────────────────────────────
function generateId(prefix = 'id') {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

function authMiddleware(req, res, next) {
  const header = req.headers.authorization;
  if (!header || !header.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'No token provided' });
  }
  try {
    const decoded = jwt.verify(header.split(' ')[1], process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (e) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
}

// ── Health check ────────────────────────────────────────────────────────
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    message: 'MediShop backend running',
    stripe_mode: process.env.STRIPE_SECRET_KEY?.startsWith('sk_test') ? 'TEST ✅' : 'LIVE ⚠️',
    users: USERS.length,
    orders: ORDERS.length
  });
});

// =====================================================================
// ACCOUNT ROUTES
// =====================================================================

// ── REGISTER ──────────────────────────────────────────────────────────
app.post('/api/auth/register', async (req, res) => {
  try {
    const { firstName, lastName, email, password, phone } = req.body;

    // Validation
    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ error: 'All fields are required' });
    }
    if (password.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters' });
    }
    if (USERS.find(u => u.email.toLowerCase() === email.toLowerCase())) {
      return res.status(409).json({ error: 'An account with this email already exists' });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const user = {
      id: generateId('usr'),
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.toLowerCase().trim(),
      phone: phone || '',
      passwordHash,
      createdAt: new Date().toISOString(),
      orders: [],
      loyaltyPoints: 0,
      tier: 'bronze'
    };
    USERS.push(user);

    const token = jwt.sign(
      { id: user.id, email: user.email, firstName: user.firstName },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    console.log(`✅ New user registered: ${user.email}`);

    res.status(201).json({
      message: 'Account created successfully',
      token,
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        loyaltyPoints: user.loyaltyPoints,
        tier: user.tier
      }
    });
  } catch (err) {
    console.error('Register error:', err);
    res.status(500).json({ error: 'Server error. Please try again.' });
  }
});

// ── LOGIN ─────────────────────────────────────────────────────────────
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const user = USERS.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, firstName: user.firstName },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    console.log(`✅ User logged in: ${user.email}`);

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        loyaltyPoints: user.loyaltyPoints,
        tier: user.tier
      }
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Server error. Please try again.' });
  }
});

// ── GET PROFILE ───────────────────────────────────────────────────────
app.get('/api/auth/profile', authMiddleware, (req, res) => {
  const user = USERS.find(u => u.id === req.user.id);
  if (!user) return res.status(404).json({ error: 'User not found' });

  res.json({
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    phone: user.phone,
    loyaltyPoints: user.loyaltyPoints,
    tier: user.tier,
    createdAt: user.createdAt,
    orders: ORDERS.filter(o => o.userId === user.id)
  });
});

// ── UPDATE PROFILE ────────────────────────────────────────────────────
app.put('/api/auth/profile', authMiddleware, async (req, res) => {
  const user = USERS.find(u => u.id === req.user.id);
  if (!user) return res.status(404).json({ error: 'User not found' });

  const { firstName, lastName, phone, currentPassword, newPassword } = req.body;

  if (firstName) user.firstName = firstName.trim();
  if (lastName)  user.lastName  = lastName.trim();
  if (phone)     user.phone     = phone.trim();

  // Password change
  if (newPassword) {
    if (!currentPassword) return res.status(400).json({ error: 'Current password required' });
    const valid = await bcrypt.compare(currentPassword, user.passwordHash);
    if (!valid) return res.status(401).json({ error: 'Current password is incorrect' });
    if (newPassword.length < 6) return res.status(400).json({ error: 'New password too short' });
    user.passwordHash = await bcrypt.hash(newPassword, 10);
  }

  res.json({ message: 'Profile updated', user: { id: user.id, firstName: user.firstName, lastName: user.lastName, email: user.email, phone: user.phone } });
});

// =====================================================================
// STRIPE PAYMENT ROUTES
// =====================================================================

// ── CREATE PAYMENT INTENT ─────────────────────────────────────────────
// Called by checkout.html before showing the card form
app.post('/api/payment/create-intent', async (req, res) => {
  try {
    const { items, currency = 'usd', coupon } = req.body;

    if (!items || !items.length) {
      return res.status(400).json({ error: 'No items in cart' });
    }

    // Calculate total on server (never trust client total)
    let total = items.reduce((sum, item) => sum + (item.price * item.qty), 0);

    // Apply coupon
    let discount = 0;
    if (coupon === 'HEALTH10') {
      discount = Math.round(total * 0.10 * 100) / 100;
      total = total - discount;
    }

    // Stripe amount is in cents (smallest currency unit)
    const amount = Math.round(total * 100);

    if (amount < 50) { // Stripe minimum is 50 cents
      return res.status(400).json({ error: 'Order total too small' });
    }

    // Create PaymentIntent in TEST mode
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      automatic_payment_methods: { enabled: true },
      metadata: {
        items: JSON.stringify(items.map(i => ({ id: i.id, name: i.name, qty: i.qty }))),
        coupon: coupon || 'none',
        discount: discount.toFixed(2),
        source: 'medishop_test'
      }
    });

    console.log(`💳 PaymentIntent created: ${paymentIntent.id} — $${(amount/100).toFixed(2)} (TEST)`);

    res.json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
      amount: (amount / 100).toFixed(2),
      discount: discount.toFixed(2)
    });

  } catch (err) {
    console.error('Stripe error:', err.message);
    res.status(500).json({ error: err.message });
  }
});

// ── CONFIRM ORDER (called after Stripe payment succeeds) ──────────────
app.post('/api/orders/confirm', async (req, res) => {
  try {
    const { paymentIntentId, items, shippingAddress, email, firstName, lastName, phone } = req.body;

    // Verify the payment actually succeeded with Stripe
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    if (paymentIntent.status !== 'succeeded') {
      return res.status(400).json({
        error: `Payment not confirmed. Status: ${paymentIntent.status}`
      });
    }

    // Create order
    const order = {
      id: generateId('ORD'),
      paymentIntentId,
      email,
      firstName,
      lastName,
      phone,
      items,
      shippingAddress,
      subtotal: (paymentIntent.amount / 100).toFixed(2),
      total: (paymentIntent.amount / 100).toFixed(2),
      status: 'confirmed',
      createdAt: new Date().toISOString(),
      estimatedDelivery: new Date(Date.now() + 30 * 60 * 1000).toISOString() // 30 min
    };

    ORDERS.push(order);

    // If user is logged in, attach order to their account + add loyalty points
    const user = USERS.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (user) {
      user.orders.push(order.id);
      const points = Math.floor(parseFloat(order.total));
      user.loyaltyPoints += points;
      // Update tier
      if (user.loyaltyPoints >= 2000) user.tier = 'gold';
      else if (user.loyaltyPoints >= 500) user.tier = 'silver';
      console.log(`⭐ +${points} loyalty points for ${user.email} (total: ${user.loyaltyPoints})`);
    }

    console.log(`✅ Order confirmed: ${order.id} — $${order.total}`);

    res.json({
      message: 'Order confirmed!',
      order: {
        id: order.id,
        status: order.status,
        total: order.total,
        estimatedDelivery: order.estimatedDelivery,
        items: order.items
      }
    });

  } catch (err) {
    console.error('Order confirm error:', err.message);
    res.status(500).json({ error: err.message });
  }
});

// ── GET ALL ORDERS (admin/debug view) ─────────────────────────────────
app.get('/api/orders', (req, res) => {
  res.json({ total: ORDERS.length, orders: ORDERS });
});

// ── GET SINGLE ORDER ──────────────────────────────────────────────────
app.get('/api/orders/:id', (req, res) => {
  const order = ORDERS.find(o => o.id === req.params.id);
  if (!order) return res.status(404).json({ error: 'Order not found' });
  res.json(order);
});

// ── STRIPE WEBHOOK ────────────────────────────────────────────────────
// Stripe sends events here — handles payment_intent.succeeded etc.
app.post('/api/webhook', (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error('Webhook signature failed:', err.message);
    return res.status(400).json({ error: `Webhook Error: ${err.message}` });
  }

  switch (event.type) {
    case 'payment_intent.succeeded':
      console.log(`🟢 Webhook: payment succeeded — ${event.data.object.id}`);
      break;
    case 'payment_intent.payment_failed':
      console.log(`🔴 Webhook: payment failed — ${event.data.object.id}`);
      break;
    default:
      console.log(`📌 Webhook event: ${event.type}`);
  }

  res.json({ received: true });
});

// ── COUPON VALIDATION ─────────────────────────────────────────────────
app.post('/api/coupon/validate', (req, res) => {
  const { code } = req.body;
  const coupons = {
    'HEALTH10': { discount: 10, type: 'percent', description: '10% off your order' },
    'MEDISHOP20': { discount: 20, type: 'percent', description: '20% off your order' },
    'FREESHIP': { discount: 0, type: 'free_shipping', description: 'Free express shipping' },
  };
  const coupon = coupons[code?.toUpperCase()];
  if (!coupon) return res.status(404).json({ valid: false, error: 'Invalid coupon code' });
  res.json({ valid: true, ...coupon });
});

// ── START ─────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n🚀 MediShop backend running on http://localhost:${PORT}`);
  console.log(`💳 Stripe mode: ${process.env.STRIPE_SECRET_KEY?.startsWith('sk_test') ? 'TEST ✅ (no real money)' : 'LIVE ⚠️'}`);
  console.log(`🔍 Health check: http://localhost:${PORT}/api/health\n`);
});