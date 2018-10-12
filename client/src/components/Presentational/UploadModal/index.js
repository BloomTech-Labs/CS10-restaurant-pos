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

class UploadModal extends React.Component {
  constructor(props) {
    super(props);

    this.uppy = null;
  }

  componentDidMount() {
    const { folderName, setImageUrls } = this.props;

    this.uppy = Uppy({
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
        params: {
          auth: {
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
            }, // TODO: Other resize strageties to accomodate different
            thumbnail: {
              use: 'filter',
              robot: '/image/resize',
              resize_strategy: 'fillcrop',
              width: 55,
              height: 55,
              imagemagick_stack: 'v2.0.3',
              progressive: true
            },
            small: {
              use: 'filter',
              robot: '/image/resize',
              resize_strategy: 'fillcrop',
              width: 110,
              height: 110,
              imagemagick_stack: 'v2.0.3',
              progressive: true
            },
            medium: {
              use: 'filter',
              robot: '/image/resize',
              resize_strategy: 'fillcrop',
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

    this.uppy.on('complete', (complete) => {
      setImageUrls({
        thumbnail: complete.transloadit[0].results.thumbnail[0].url,
        small: complete.transloadit[0].results.small[0].url,
        medium: complete.transloadit[0].results.medium[0].url
      });
    });
  }

  componentWillUnmount() {
    this.uppy.close();
  }

  render() {
    const { open, closeUploadModal } = this.props;

    if (!this.uppy) {
      return null;
    }

    return (
      <DashboardModal
        uppy={this.uppy}
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

export default UploadModal;
