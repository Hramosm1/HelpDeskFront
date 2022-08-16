import { QuillConfig } from 'ngx-quill';
import ImageCompress from 'quill-image-compress';

export const quillConfig: QuillConfig = {
  theme: 'snow',
  // customModules: [{ path: 'modules/imageCompress', implementation: ImageCompress }],
  modules: {
    toolbar: [
      ['bold', 'italic', 'underline'],
      [{ align: [] }, { list: 'ordered' }, { list: 'bullet' }],
      ['clean'],
      ['link', 'image']
    ]
    // ,
    // imageCompress: {
    //   quality: 0.7, // default
    //   maxWidth: 1000, // default
    //   maxHeight: 1000, // default
    //   imageType: 'image/jpeg', // default
    //   debug: true, // default
    //   suppressErrorLogging: false, // default
    // }
  }
};
