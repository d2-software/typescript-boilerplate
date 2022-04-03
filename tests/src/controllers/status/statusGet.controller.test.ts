import { Request, Response } from 'express';
import { StatusGetController } from '../../../../src/controllers/status/statusGet.controller';

describe('statusGet controller', () => {
  it('Should returns 200 code', async () => {
    let responseStatus;
    const req = {} as Request;
    const res: Partial<Response> = {
      send: jest.fn(),
      status: jest.fn().mockImplementation((statusCode) => {
        responseStatus = statusCode;
        return res;
      }),
    };

    const statusController = new StatusGetController();
    await statusController.run(req, res as Response);

    expect(responseStatus).toEqual(200);
  });
});
