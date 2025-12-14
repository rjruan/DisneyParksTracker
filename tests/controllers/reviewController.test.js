import { jest } from '@jest/globals';
import AppError from '../../errors/AppError.js';

/**
 * Mock Review model BEFORE importing controller
 */
jest.unstable_mockModule('../../models/reviewModel.js', () => ({
  default: {
    find: jest.fn(),
    findById: jest.fn(),
    create: jest.fn(),
    findByIdAndUpdate: jest.fn(),
    findByIdAndDelete: jest.fn()
  }
}));

const {
  getReviews,
  getParkReviews,
  getRideReviews,
  createReview,
  updateReview,
  deleteReview
} = await import('../../controllers/reviewController.js');

const Review = (await import('../../models/reviewModel.js')).default;

const mockRes = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn();
  return res;
};

describe('Review Controller', () => {
  let req, res, next;

  beforeEach(() => {
    req = { params: {}, body: {} };
    res = mockRes();
    next = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('getReviews - returns all reviews', async () => {
    Review.find.mockResolvedValue([{ text: 'Great ride!' }]);
    await getReviews(req, res, next);
    expect(Review.find).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith([{ text: 'Great ride!' }]);
  });

  test('getParkReviews - returns reviews for a park', async () => {
    req.params.parkId = 'park123';
    Review.find.mockResolvedValue([{ rating: 5 }]);
    await getParkReviews(req, res, next);
    expect(Review.find).toHaveBeenCalledWith({ parkId: 'park123' });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalled();
  });

  test('getParkReviews - sends error if no reviews found', async () => {
    req.params.parkId = 'park123';
    Review.find.mockResolvedValue([]);
    await getParkReviews(req, res, next);
    expect(next).toHaveBeenCalled();
    expect(next.mock.calls[0][0]).toBeInstanceOf(AppError);
  });

  test('getRideReviews - returns reviews for a ride', async () => {
    req.params.rideId = 'ride123';
    Review.find.mockResolvedValue([{ rating: 4 }]);
    await getRideReviews(req, res, next);
    expect(Review.find).toHaveBeenCalledWith({ rideId: 'ride123' });
    expect(res.status).toHaveBeenCalledWith(200);
  });

  test('createReview - creates a review', async () => {
    req.body = { rating: 5, comment: 'Amazing!' };
    Review.create.mockResolvedValue(req.body);
    await createReview(req, res, next);
    expect(Review.create).toHaveBeenCalledWith(req.body);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(req.body);
  });

  test('updateReview - updates a review', async () => {
    req.params.id = 'review123';
    Review.findByIdAndUpdate.mockResolvedValue({ rating: 3 });
    await updateReview(req, res, next);
    expect(Review.findByIdAndUpdate).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
  });

  test('updateReview - error if review not found', async () => {
    req.params.id = 'review123';
    Review.findByIdAndUpdate.mockResolvedValue(null);
    await updateReview(req, res, next);
    expect(next).toHaveBeenCalled();
    expect(next.mock.calls[0][0]).toBeInstanceOf(AppError);
  });

  test('deleteReview - deletes a review', async () => {
    req.params.id = 'review123';
    Review.findByIdAndDelete.mockResolvedValue({});
    await deleteReview(req, res, next);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ message: 'Review deleted successfully' });
  });
});