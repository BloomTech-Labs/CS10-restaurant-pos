import React from 'react';
import Uppy from '@uppy/core';
import Transloadit from '@uppy/transloadit';
import { DashboardModal } from '@uppy/react';
import GoogleDrive from '@uppy/google-drive';
import Dropbox from '@uppy/dropbox';
import Instagram from '@uppy/instagram';
import Url from '@uppy/url';
import Webcam from '@uppy/webcam';
import '@uppy/dashboard/dist/style.min.css';
import '@uppy/webcam/dist/style.min.css';
import '@uppy/url/dist/style.min.css';

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
  .use(Transloadit, {
    params: {
      auth: {
        // ! Another spot for environment variables
        key: 'd974c600c66711e8aea1818ac045b32a'
      },
      // It's always better to use a template_id and enable
      // Signature Authentication
      steps: {
        ':original': {
          robot: '/upload/handle'
        },
        filter: {
          use: ':original',
          robot: '/file/filter',
          // eslint-disable-next-line no-template-curly-in-string
          accepts: [['${file.mime}', 'regex', 'image']],
          error_on_decline: true
        },
        viruscheck: {
          use: 'filter',
          robot: '/file/virusscan',
          error_on_decline: true
        },
        convert_image_jpg: {
          use: 'viruscheck',
          robot: '/image/resize',
          format: 'jpg',
          quality: 90,
          imagemagick_stack: 'v2.0.3'
        },
        thumbnail_full: {
          use: 'convert_image_jpg',
          robot: '/image/resize',
          resize_strategy: 'fit',
          width: 50,
          height: 50,
          imagemagick_stack: 'v2.0.3'
        },
        small_full: {
          use: 'convert_image_jpg',
          robot: '/image/resize',
          resize_strategy: 'fit',
          width: 100,
          height: 100,
          imagemagick_stack: 'v2.0.3'
        },
        medium_full: {
          use: 'convert_image_jpg',
          robot: '/image/resize',
          resize_strategy: 'fit',
          width: 200,
          height: 200,
          imagemagick_stack: 'v2.0.3'
        },
        thumbnail: {
          use: 'thumbnail_full',
          robot: '/image/optimize',
          progressive: true
        },
        small: {
          use: 'small_full',
          robot: '/image/optimize',
          progressive: true
        },
        medium: {
          use: 'medium_full',
          robot: '/image/optimize',
          progressive: true
        },
        export: {
          use: ['convert_image_jpg', 'thumbnail', 'small', 'medium', 'compress_image'],
          robot: '/google/store',
          credentials: 'google_cloud_storage_eric',
          path:
            // eslint-disable-next-line no-template-curly-in-string
            '${fields.username}_${previous_step.name}_${unique_prefix}.${file.ext}',
          acl: 'public-read'
        }
      }
    },
    waitForEncoding: true
  })
  .use(GoogleDrive, {
    id: 'MyGoogleDrive',
    serverUrl: 'https://api2.transloadit.com/companion',
    serverPattern: '.transloadit.com$'
  })
  .use(Dropbox, {
    id: 'MyDropbox',
    serverUrl: 'https://api2.transloadit.com/companion',
    serverPattern: '.transloadit.com$'
  })
  .use(Instagram, {
    id: 'MyInstagram',
    serverUrl: 'https://api2.transloadit.com/companion',
    serverPattern: '.transloadit.com$'
  })
  .use(Url, {
    id: 'MyUrl',
    serverUrl: 'https://api2.transloadit.com/companion',
    serverPattern: '.transloadit.com$'
  })
  .use(Webcam, { id: 'MyWebcam' });

uppy.on('transloadit:result', (stepName, result) => {
  console.log('stepname:', stepName);
  console.log('result:', result);
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
        uppy={uppy}
        onRequestClose
        open
        plugins={['MyGoogleDrive', 'MyDropbox', 'MyInstagram', 'MyUrl', 'MyWebcam']}
        locale={{
          strings: {
            chooseFile: 'Pick a new avatar'
          }
        }}
      />
    </div>
  );
}
