import React from 'react';
import PropTypes from 'prop-types';
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

export default function UploadModal(props) {
  const { folderName, setImageUrls, open, closeUploadModal } = props;

  const uppy = Uppy({
    id: 'MyUppy',
    debug: false,
    autoProceed: false,
    restrictions: {
      maxFileSize: 1000000,
      maxNumberOfFiles: 1,
      minNumberOfFiles: 1,
      allowedFileTypes: ['image/*']
    }
  })
    .use(Transloadit, {
      service: 'https://api2.transloadit.com',
      waitForEncoding: true,
      waitForMetadata: false,
      importFromUploadURLs: false,
      alwaysRunAssembly: false,
      signature: null,
      field: {
        folderName: 'Test_folderName_in_Field'
      },
      params: {
        auth: {
          // ! Another spot for environment variables
          key: 'd974c600c66711e8aea1818ac045b32a'
        },
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
          thumbnail: {
            use: 'filter',
            robot: '/image/resize',
            resize_strategy: 'fit',
            width: 50,
            height: 50,
            imagemagick_stack: 'v2.0.3',
            progressive: true
          },
          small: {
            use: 'filter',
            robot: '/image/resize',
            resize_strategy: 'fit',
            width: 100,
            height: 100,
            imagemagick_stack: 'v2.0.3',
            progressive: true
          },
          medium: {
            use: 'filter',
            robot: '/image/resize',
            resize_strategy: 'fit',
            width: 200,
            height: 200,
            imagemagick_stack: 'v2.0.3',
            progressive: true
          },
          export: {
            use: ['thumbnail', 'small', 'medium'],
            robot: '/google/store',
            credentials: 'google_cloud_storage_eric',
            path:
              /* eslint-disable */
              `/${folderName}` + '/${previous_step.name}_${unique_prefix}.${file.ext}',
            /* eslint-enable */
            acl: 'public-read'
          }
        }
      }
    })
    .use(GoogleDrive, {
      id: 'MyGoogleDrive',
      serverUrl: 'https://api2.transloadit.com/companion',
      serverPattern: /.transloadit.com$/
    })
    .use(Dropbox, {
      id: 'MyDropbox',
      serverUrl: 'https://api2.transloadit.com/companion',
      serverPattern: /.transloadit.com$/
    })
    .use(Instagram, {
      id: 'MyInstagram',
      serverUrl: 'https://api2.transloadit.com/companion',
      serverPattern: /.transloadit.com$/
    })
    .use(Url, {
      id: 'MyUrl',
      serverUrl: 'https://api2.transloadit.com/companion',
      serverPattern: /.transloadit.com$/
    })
    .use(Webcam, { id: 'MyWebcam' });
  // .use(Tus, { id: 'MyTus', endpoint: 'https://master.tus.io/files/' });

  uppy.on('complete', (complete) => {
    setImageUrls({
      thumbnail: complete.transloadit[0].results.thumbnail[0].url,
      small: complete.transloadit[0].results.small[0].url,
      medium: complete.transloadit[0].results.medium[0].url
    });
  });
  // .on('transloadit:assembly-created', () => {
  //   console.log('assembly-created');
  // })
  // .on('transloadit:upload', (file, assembly) => {
  //   console.log('upload file and assembly: ', file, assembly);
  // })
  // .on('transloadit:assembly-executing', () => {
  //   console.log('assembly-executing');
  // })
  // .on('transloadit:result', () => {
  //   console.log('result');
  // })
  // .on('transloadit:complete', (complete) => {
  //   console.log('complete', complete);
  // });

  return (
    <DashboardModal
      uppy={uppy}
      onRequestClose={closeUploadModal}
      open={open}
      plugins={['MyGoogleDrive', 'MyDropbox', 'MyInstagram', 'MyUrl', 'MyWebcam' /* 'MyTus' */]}
      locale={{
        strings: {
          chooseFile: 'Pick a new avatar'
        }
      }}
    />
  );
}

UploadModal.propTypes = {
  setImageUrls: PropTypes.func,
  closeUploadModal: PropTypes.func,
  folderName: PropTypes.string,
  open: PropTypes.bool
};

UploadModal.defaultProps = {
  setImageUrls: () => {},
  closeUploadModal: () => {},
  folderName: 'Test folderName',
  open: false
};
