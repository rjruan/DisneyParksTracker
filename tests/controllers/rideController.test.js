import { jest } from '@jest/globals';
import AppError from '../../errors/AppError.js';

jest.unstable_mockModule('../../models/rideModel.js', () => ({
  default: {
    find: jest.fn(),
    findById: jest.fn(),
    create: jest.fn(),
    findByIdAndUpdate: jest.fn(),
    findByIdAndDelete: jest.fn()
  }
}));

const {
  getRides,
  getRideById,
  createRide,
  updateRide,
  deleteRide
} = await import('../../controllers/rideController.js');

const Ride = (await import('../../models/rideModel.js')).default;

const mockRes = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn();
  return res;
};

describe('Ride Controller', () => {
  let req, res, next;

  beforeEach(() => {
    req = { params: {}, body: {} };
    res = mockRes();
    next = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('getRides returns all rides', async () => {
    Ride.find.mockReturnValue({
      populate: jest.fn().mockResolvedValue([{ name: 'Space Mountain' }])
    });
    await getRides(req, res, next);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith([{ name: 'Space Mountain' }]);
  });

  test('getRideById returns a ride if found', async () => {
    req.params.id = '123';
    Ride.findById.mockReturnValue({
      populate: jest.fn().mockResolvedValue({ name: 'Big Thunder' })
    });
    await getRideById(req, res, next);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ name: 'Big Thunder' });
  });

  test('getRideById calls next with AppError if ride not found', async () => {
    req.params.id = '123';
    Ride.findById.mockReturnValue({
      populate: jest.fn().mockResolvedValue(null)
    });
    await getRideById(req, res, next);
    expect(next).toHaveBeenCalled();
    expect(next.mock.calls[0][0]).toBeInstanceOf(AppError);
    expect(next.mock.calls[0][0].statusCode).toBe(404);
  });

  test('createRide creates a ride', async () => {
    req.body = { name: 'Pirates' };
    Ride.create.mockResolvedValue(req.body);
    await createRide(req, res, next);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(req.body);
  });

  test('updateRide updates a ride', async () => {
    req.params.id = '123';
    req.body = { name: 'Updated Ride' };
    Ride.findByIdAndUpdate.mockResolvedValue(req.body);
    await updateRide(req, res, next);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(req.body);
  });

  test('updateRide errors if ride not found', async () => {
    req.params.id = '123';
    Ride.findByIdAndUpdate.mockResolvedValue(null);
    await updateRide(req, res, next);
    expect(next).toHaveBeenCalled();
    expect(next.mock.calls[0][0]).toBeInstanceOf(AppError);
  });

  test('deleteRide deletes a ride', async () => {
    req.params.id = '123';
    Ride.findByIdAndDelete.mockResolvedValue({ name: 'Ride' });
    await deleteRide(req, res, next);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ message: 'Ride deleted' });
  });
});