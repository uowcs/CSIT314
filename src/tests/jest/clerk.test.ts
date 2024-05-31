// frontend/src/tests/jest/clerk.test.ts
import { getServerAuthSession } from '~/utils/auth/users';
import { currentUser } from '@clerk/nextjs';
import { env } from '~/env.mjs';

jest.mock('@clerk/nextjs', () => ({
  currentUser: jest.fn(),
}));

jest.mock('~/env.mjs', () => ({
  env: {
    NEXT_PUBLIC_AUTH_PROVIDER: 'clerk',
    DATABASE_URL: 'postgres://localhost:5432/mydb',
  },
}));

jest.mock('~/core/auth/authjs', () => ({
  getServerSession: jest.fn(),
  authOptions: {},
}));

describe('Clerk Integration', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should return current user when NEXT_PUBLIC_AUTH_PROVIDER is clerk', async () => {
    const mockUser = {
      id: 'user_123',
      emailAddresses: [{ id: 'email_123', emailAddress: 'test@example.com' }],
      primaryEmailAddressId: 'email_123',
      firstName: 'Test',
      lastName: 'User',
      imageUrl: 'https://example.com/image.png',
    };
    
    (currentUser as jest.Mock).mockResolvedValue(mockUser);

    const user = await getServerAuthSession();
    
    expect(currentUser).toHaveBeenCalled();
    expect(user).toEqual(mockUser);
  });

  it('should throw an error if auth provider is invalid', async () => {
    const env = require('~/env.mjs').env;
    env.NEXT_PUBLIC_AUTH_PROVIDER = 'invalid_provider';
    
    await expect(getServerAuthSession()).rejects.toThrow('❌ [getServerAuthSession()] Allowed values for \'NEXT_PUBLIC_AUTH_PROVIDER\' are \'authjs\' and \'clerk\'');
  });
});
