// uploadthing.test.ts
import '@testing-library/jest-dom/extend-expect';
import { uploadFiles } from '~/utils/other/uploads/uploadthing';

describe('UploadThing Connection Tests', () => {
  it('should handle file uploads successfully', async () => {
    // Mock file creation
    const file = new File(['dummy content'], 'test-image.png', { type: 'image/png' });

    // Define the options for the uploadFiles function
    const options = {
      files: [file],
      onUploadBegin: ({ file }) => console.log(`Upload started for: ${file}`),
      onUploadProgress: ({ file, progress }) => console.log(`Upload progress for ${file}: ${progress}%`)
    };

    // Call the uploadFiles function with the required arguments
    // Assuming 'imageUploader' is an endpoint defined within OurFileRouter
    const response = await uploadFiles("imageUploader", options);

    // Assertions to check if the file upload was handled correctly
    expect(response).toBeDefined();
    expect(response.status).toBe('success');
    expect(response.message).toBe('File uploaded successfully');
  });

  // Additional tests to handle different scenarios or errors can be added here
});
