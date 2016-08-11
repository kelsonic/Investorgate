import React from 'react';
import { createDevTools } from 'redux-devtools';

// Add monitors
import LogMonitor from 'redux-devtools-log-monitor';
import DockMonitor from 'redux-devtools-dock-monitor';

// Create dev tools with monitors
const DevTools = createDevTools(
    <DockMonitor defaultIsVisible={false} toggleVisibilityKey='ctrl-h' changePositionKey='ctrl-q'>
        <LogMonitor/>
    </DockMonitor>
);

export default DevTools;