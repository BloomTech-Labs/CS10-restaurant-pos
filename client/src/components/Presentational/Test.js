import React from 'react';
import Uppy from '@uppy/core';
import { DashboardModal } from '@uppy/react';
import Tus from '@uppy/tus';
import GoogleDrive from '@uppy/google-drive';
import Dropbox from '@uppy/dropbox';
import Instagram from '@uppy/instagram';
import Webcam from '@uppy/webcam';
// import '@uppy/dist/uppy.min.css';
import '@uppy/dashboard/dist/style.min.css';
import '@uppy/webcam/dist/style.min.css';

// const uppy = Uppy({
//   meta: { type: 'avatar' },
//   restrictions: { maxNumberOfFiles: 1 },
//   autoProceed: true
// })
//   .use(Tus, { endpoint: '/upload' })
//   .on('complete', (result) => {
//     const url = result.successful[0].uploadURL;
//     console.log(url);
//     // store.dispatch({
//     //   type: SET_USER_AVATAR_URL,
//     //   payload: { url }
//     // });
//   });

const uppy = Uppy({
  id: 'MyUppy',
  debug: true,
  autoProceed: false,
  restrictions: {
    maxFileSize: 1000000,
    maxNumberOfFiles: 1,
    minNumberOfFiles: 1,
    allowedFileTypes: ['image/*']
  }
})
  // .use(Dashboard, {
  //   id: 'MyDashboard',
  //   trigger: '.UppyModalOpenerBtn',
  //   inline: true,
  //   target: '.DashboardContainer',
  //   replaceTargetContent: true,
  //   showProgressDetails: true,
  //   note: 'Images and video only, 2–3 files, up to 1 MB',
  //   height: 470,
  //   metaFields: [
  //     { id: 'name', name: 'Name', placeholder: 'file name' },
  //     { id: 'caption', name: 'Caption', placeholder: 'describe what the image is about' }
  //   ],
  //   browserBackButtonClose: true
  // })
  .use(GoogleDrive, { id: 'MyGoogleDrive', serverUrl: 'https://companion.uppy.io' })
  .use(Dropbox, { id: 'MyDropbox', serverUrl: 'https://companion.uppy.io' })
  .use(Instagram, { id: 'MyInstagram', serverUrl: 'https://companion.uppy.io' })
  .use(Webcam, { id: 'MyWebcam' })
  .use(Tus, { id: 'MyTus', endpoint: 'https://master.tus.io/files/' });

uppy.on('complete', (result) => {
  console.log('successful files:', result.successful);
  console.log('failed files:', result.failed);
});

export default function Test(/* { currentAvatar } */) {
  return (
    <div>
      <img
        /* src={currentAvatar} */
        src="http://bestnycacupuncturist.com/wp-content/uploads/2016/11/anonymous-avatar-sm.jpg"
        alt="Current Avatar"
      />
      <DashboardModal
        open
        plugins={['MyGoogleDrive', 'MyDropbox', 'MyInstagram', 'MyWebcam', 'MyTus']}
        uppy={uppy}
        locale={{
          strings: {
            chooseFile: 'Pick a new avatar'
          }
        }}
      />
    </div>
  );
}
