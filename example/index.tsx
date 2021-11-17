import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { ArchitectureBuilder } from '../.';

const edges = [
  {
    minutesBetweenData: 0.1,
    from: 'SANITY_BACKEND',
    to: 'SANITY_STUDIO',
  },
  {
    minutesBetweenData: 0.1,
    from: 'SANITY_STUDIO',
    to: 'SANITY_BACKEND',
  },
  {
    minutesBetweenData: 0.1,
    from: 'SANITY_BACKEND',
    to: 'WEBSITE',
    description: "GraphQL"
  },
];

const nodes = [
  {
    id: 'SANITY_STUDIO',
    name: 'Sanity Studio',
    descriptionItems: {
      featureList: 'Headless Content Management System Front-end',
      identifier: 'xxxyyy',
      author: 'ahm Digital',
    },
    url: 'https://ahm.sanity.studio',
  },
  {
    id: 'SANITY_BACKEND',
    name: 'Sanity Backend',
    descriptionItems: {
      featureList: 'Content data store',
      author: 'Sanity',
    },
    url: undefined,
  },
  {
    id: 'WEBSITE',
    name: 'ahm.com.au',
    descriptionItems: {
      featureList: 'Join health insurance, View member perks',
      author: 'ahm Digital',
    },
    url: 'https://ahm.com.au',
  },
];

const App = () => {
  return <ArchitectureBuilder edges={edges} nodes={nodes} />;
};

ReactDOM.render(<App />, document.getElementById('root'));
