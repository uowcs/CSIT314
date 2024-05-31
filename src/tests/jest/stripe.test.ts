// stripe.test.ts
const stripeModule = require('~/core/stripe/connect');

// Mocking the environment variables to simulate the correct environment setup
process.env.STRIPE_PROFESSIONAL_SUBSCRIPTION_PRICE_ID = 'price_1234';
process.env.STRIPE_ENTERPRISE_SUBSCRIPTION_PRICE_ID = 'price_5678';
process.env.NODE_ENV = 'test';

jest.mock('~/core/stripe/connect', () => {
  const Stripe = jest.requireActual('stripe');
  const mockStripe = new Stripe('sk_test_4eC39HqLyjWDarjtT1zdp7dc', { apiVersion: '2020-08-27' });
  return {
    stripe: mockStripe,
  };
});

describe('Stripe Integration Test', () => {
  let stripeClient;

  beforeAll(() => {
    // Initialize the Stripe client using the mock environment variables
    stripeClient = stripeModule.stripe;
  });

  test('should successfully connect to Stripe', async () => {
    try {
      const response = await stripeClient.customers.list({ limit: 1 });
      expect(response).toBeDefined();
      expect(response.data).toBeInstanceOf(Array);
    } catch (error) {
      throw new Error('Failed to connect to Stripe');
    }
  });
});
