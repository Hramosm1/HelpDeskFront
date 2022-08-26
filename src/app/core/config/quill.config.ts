import { QuillConfig } from 'ngx-quill';

export const quillConfig: QuillConfig = {
  theme: 'snow',
  // customModules: [{ path: 'modules/imageCompress', implementation: ImageCompress }],
  modules: {
		toolbar: [
			['bold', 'italic', 'underline', 'strike'],        // toggled buttons
			['blockquote', 'code-block'],

			[{ 'header': 1 }, { 'header': 2 }],               // custom button values
			[{ 'list': 'ordered'}, { 'list': 'bullet' }],
			[{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
			[{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
			[{ 'direction': 'rtl' }],                         // text direction

			[{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
			[{ 'header': [1, 2, 3, 4, 5, 6, false] }],

			[{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
			[{ 'font': [] }],
			[{ 'align': [] }],

			['clean'],                                         // remove formatting button

			['link', 'image']                         // link and image, video
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
