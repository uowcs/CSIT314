// frontend/src/tests/jest/uploadthing.test.ts

import { uploadFiles } from '~/utils/other/uploads/uploadthing';
import { OurFileRouter } from '~/app/api/uploadthing/core';
import * as hooks from '@uploadthing/react/hooks';

jest.mock('@uploadthing/react/hooks', () => ({
  generateReactHelpers: jest.fn(() => ({
    useUploadThing: jest.fn(),
    uploadFiles: jest.fn(),
  })),
}));

describe('uploadthing integration', () => {
  it('should connect and upload files successfully', async () => {
    const mockFiles = [new File(['dummy content'], 'dummy.txt', { type: 'text/plain' })];

    const mockResponse = {
      success: true,
      data: {
        files: [
          {
            url: 'https://example.com/dummy.txt',
          },
        ],
      },
    };

    const { uploadFiles } = hooks.generateReactHelpers<OurFileRouter>();
    (uploadFiles as jest.Mock).mockResolvedValue(mockResponse);

    const response = await uploadFiles(mockFiles);

    expect(response).toEqual(mockResponse);
    expect(uploadFiles).toHaveBeenCalledWith(mockFiles);
  });

  it('should handle upload failure', async () => {
    const mockFiles = [new File(['dummy content'], 'dummy.txt', { type: 'text/plain' })];

    const mockError = new Error('Upload failed');

    const { uploadFiles } = hooks.generateReactHelpers<OurFileRouter>();
    (uploadFiles as jest.Mock).mockRejectedValue(mockError);

    await expect(uploadFiles(mockFiles)).rejects.toThrow('Upload failed');
  });
});
