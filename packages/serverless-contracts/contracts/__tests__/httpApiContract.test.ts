import { HttpApiContract } from '../httpApiContract';

describe('httpApiContract', () => {
  describe('instanciation tests', () => {
    it('should accept name as a parameter', () => {
      const httpApiContract = new HttpApiContract({
        path: 'coucou',
        method: 'POST',
      });

      expect(httpApiContract.trigger).toEqual({
        path: 'coucou',
        method: 'POST',
      });
    });
  });
});
