const verifyRole = require('../../validation/verifyRole');

// jest.setTimeout(100000);

describe('verifyRole', () => {
  // [Valid] Testing with admin role
  it('Returns true if an admin user is passed in', () => {
    const verified = verifyRole({
      role: {
        admin: true,
        manager: false
      }
    });

    expect(verified).toEqual(true);
  });

  // [Valid] Testing with manager role
  it('Returns true if an admin user is passed in', () => {
    const verified = verifyRole({
      role: {
        admin: false,
        manager: true
      }
    });

    expect(verified).toEqual(true);
  });

  // [Invalid] Testing with server role
  it('Returns false if the user is not a manager or admin', () => {
    const verified = verifyRole({
      role: {
        admin: false,
        manager: false
      }
    });

    expect(verified).toEqual(false);
  });
});
