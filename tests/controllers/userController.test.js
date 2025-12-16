import { jest } from '@jest/globals';
import AppError from '../../errors/AppError.js';

jest.unstable_mockModule('../../models/userModel.js', () => ({
  default: {
    find: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    findOneAndUpdate: jest.fn(),
    findOneAndDelete: jest.fn()
  }
}));

const {
  getUsers,
  getUserByUsername,
  createUser,
  updateUser,
  deleteUser
} = await import('../../controllers/userController.js');

const User = (await import('../../models/userModel.js')).default;

const mockRes = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn();
  return res;
};

describe('User Controller', () => {
  let req, res, next;

  beforeEach(() => {
    req = { params: {}, body: {} };
    res = mockRes();
    next = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('getUsers returns all users', async () => {
    User.find.mockResolvedValue([{ username: 'parker' }]);

    await getUsers(req, res, next);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith([{ username: 'parker' }]);
  });

  test('getUserByUsername returns user if found', async () => {
    req.params.username = 'parker';
    User.findOne.mockResolvedValue({ username: 'parker' });

    await getUserByUsername(req, res, next);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ username: 'parker' });
  });

  test('getUserByUsername calls next with AppError if not found', async () => {
    req.params.username = 'missingUser';
    User.findOne.mockResolvedValue(null);

    await getUserByUsername(req, res, next);

    expect(next).toHaveBeenCalled();
    expect(next.mock.calls[0][0]).toBeInstanceOf(AppError);
    expect(next.mock.calls[0][0].statusCode).toBe(404);
  });

  test('updateUser updates a user', async () => {
    req.params.username = 'parker';
    req.body = { email: 'updated@test.com' };

    User.findOneAndUpdate.mockResolvedValue(req.body);

    await updateUser(req, res, next);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(req.body);
  });

  test('updateUser errors if user not found', async () => {
    req.params.username = 'missingUser';
    User.findOneAndUpdate.mockResolvedValue(null);

    await updateUser(req, res, next);

    expect(next).toHaveBeenCalled();
    expect(next.mock.calls[0][0]).toBeInstanceOf(AppError);
  });

  test('deleteUser deletes a user', async () => {
    req.params.username = 'parker';
    User.findOneAndDelete.mockResolvedValue({ username: 'parker' });

    await deleteUser(req, res, next);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: 'User deleted successfully'
    });
  });
});
