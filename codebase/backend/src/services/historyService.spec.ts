import fs from 'fs';
import path from 'path';
import { getHistory } from './historyService';

jest.mock('fs');

describe('getHistory', () => {
  const historyFilePath = path.join(__dirname, '../data/payments.json');

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return parsed JSON data when file exists with valid content', async () => {
    const mockData = JSON.stringify([
      { accountId: 'acc1', amount: 100, date: "2025-05-18" },
      { accountId: 'acc2', amount: 200, date: "2025-05-18" }
    ]);

    (fs.existsSync as jest.Mock).mockReturnValue(true);
    (fs.readFileSync as jest.Mock).mockReturnValue(mockData);

    const result = await getHistory();

    expect(result).toEqual([
      { accountId: 'acc1', amount: 100, date: "2025-05-18" },
      { accountId: 'acc2', amount: 200, date: "2025-05-18" }
    ]);

    expect(fs.existsSync).toHaveBeenCalledWith(historyFilePath);
    expect(fs.readFileSync).toHaveBeenCalledWith(historyFilePath, 'utf-8');
  });

  it('should return an empty array when file exists but is empty', async () => {
    (fs.existsSync as jest.Mock).mockReturnValue(true);
    (fs.readFileSync as jest.Mock).mockReturnValue('');

    const result = await getHistory();

    expect(result).toEqual([]);
  });

  it('should return an empty array when file does not exist', async () => {
    (fs.existsSync as jest.Mock).mockReturnValue(false);

    const result = await getHistory();

    expect(result).toEqual([]);
    expect(fs.readFileSync).not.toHaveBeenCalled();
  });

  it('should throw an error if file content is invalid JSON', async () => {
    (fs.existsSync as jest.Mock).mockReturnValue(true);
    (fs.readFileSync as jest.Mock).mockReturnValue('{ invalid json }');

    await expect(getHistory()).rejects.toThrow(SyntaxError);
  });
});
