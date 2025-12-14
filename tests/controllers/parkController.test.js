import { jest } from '@jest/globals';
import AppError from '../../errors/AppError.js';

jest.unstable_mockModule('../../models/parkModel.js', () => ({
  default: {
    find: jest.fn(),
    findById: jest.fn(),
    create: jest.fn(),
    findByIdAndUpdate: jest.fn(),
    findByIdAndDelete: jest.fn()
  }
}));

const {
  getParks,
  getParkById,
  createPark,
  updatePark,
  deletePark
} = await import('../../controllers/parkController.js');

const Park = (await import('../../models/parkModel.js')).default;

const mockRes = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn();
  return res;
};

describe('Park Controller', () => {

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('getParks returns all parks', async () => {
    const req = {};
    const res = mockRes();

    Park.find.mockReturnValue({
      populate: jest.fn().mockResolvedValue([{ name: 'Magic Kingdom' }])
    });

    await getParks(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith([{ name: 'Magic Kingdom' }]);
  });

  test('getParkById returns a park', async () => {
    const req = { params: { id: '123' } };
    const res = mockRes();
    const next = jest.fn();

    Park.findById.mockReturnValue({
      populate: jest.fn().mockResolvedValue({ name: 'Epcot' })
    });

    await getParkById(req, res, next);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ name: 'Epcot' });
  });

  test('getParkById calls next with error if not found', async () => {
    const req = { params: { id: '123' } };
    const res = mockRes();
    const next = jest.fn();

    Park.findById.mockReturnValue({
      populate: jest.fn().mockResolvedValue(null)
    });

    await getParkById(req, res, next);

    expect(next).toHaveBeenCalled();
    expect(next.mock.calls[0][0]).toBeInstanceOf(AppError);
  });

  test('createPark creates a park', async () => {
    const req = { body: { name: 'Animal Kingdom' } };
    const res = mockRes();

    Park.create.mockResolvedValue(req.body);

    await createPark(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(req.body);
  });

  test('deletePark deletes a park', async () => {
    const req = { params: { id: '123' } };
    const res = mockRes();
    const next = jest.fn();

    Park.findByIdAndDelete.mockResolvedValue({ name: 'Hollywood Studios' });

    await deletePark(req, res, next);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ message: 'Park deleted' });
  });

});