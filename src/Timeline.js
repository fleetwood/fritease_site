import moment from 'moment';
import React from 'react';
import {} from './js/redux';

const updated = moment().format('hh:mm:ss a');

function Timeline() {
  return (
    <div>
        <p>#FriTease</p>
        <sup>Last updated <b>{updated}</b></sup>
        <div>
          {JSON.stringify(window.store.getState(),null,3)}
        </div>
    </div>

  );
}

export default Timeline;
