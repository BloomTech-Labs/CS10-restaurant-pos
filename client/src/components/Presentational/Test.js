import React from 'react';
import Uppy from '@uppy/core';
import Tus from '@uppy/tus';
import { DragDrop } from '@uppy/react';
import '@uppy/drag-drop/dist/style.min.css';

const uppy = Uppy({
  meta: { type: 'avatar' },
  restrictions: { maxNumberOfFiles: 1 },
  autoProceed: true
});

uppy.use(Tus, { endpoint: '/upload' });

uppy.on('complete', (result) => {
  const url = result.successful[0].uploadURL;
  console.log(url);
  // store.dispatch({
  //   type: SET_USER_AVATAR_URL,
  //   payload: { url }
  // });
});

export default function Test(/* { currentAvatar } */) {
  return (
    <div>
      <img
        /* src={currentAvatar} */
        src="http://bestnycacupuncturist.com/wp-content/uploads/2016/11/anonymous-avatar-sm.jpg"
        alt="Current Avatar"
      />
      <DragDrop
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
