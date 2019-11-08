import { addParameters, configure } from '@storybook/react';
import "./style.css"

addParameters({
  options:{
    showPanel: true
  }
})

// automatically import all files ending in *.stories.js
configure(require.context('../src', true, /\.stories\.(jsx|tsx)$/), module);
