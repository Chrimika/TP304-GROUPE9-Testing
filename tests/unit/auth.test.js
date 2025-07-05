const { authenticate, checkRole } = require('../../middlewares/auth');
const jwt = require('jsonwebtoken');
const { ACCESS_TOKEN_SECRET } = require('../../config/auth');

describe('Auth Middlewares', () => {
  let mockRequest, mockResponse, nextFunction;

  beforeEach(() => {
    mockRequest = {};
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    nextFunction = jest.fn();
  });

  it('authenticate → should block request without token', () => {
    authenticate(mockRequest, mockResponse, nextFunction);
    expect(mockResponse.status).toHaveBeenCalledWith(401);
  });

  it('checkRole → should block non-admin users', () => {
    mockRequest.user = { role: 'user' };
    checkRole('admin')(mockRequest, mockResponse, nextFunction);
    expect(mockResponse.status).toHaveBeenCalledWith(403);
  });
});