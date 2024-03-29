import { Module, render } from 'viz.js/full.render.js';
import { map, replace } from 'lodash';
import React, { useState } from 'react';
import Viz from 'viz.js';
import FileSaver from 'file-saver';

import buildEdgeToDot from './utils/build-edge-to-dot';
import buildNodeToDot from './utils/build-node-to-dot';
import GraphEdge from '../types/GraphEdge';
import GraphNode from '../types/GraphNode';

const handleSave = ({ content, fileType, mimeType }: { content: string; fileType: string; mimeType: string }) => {
  const blob = new Blob([content], { type: `${mimeType};charset=utf-8` });
  FileSaver.saveAs(blob, `software-architecture.${fileType}`);
};

const viz = new Viz({ Module, render });

const newLine = '\n';

const removeExplicitDimensions = (svgString: string) =>
  replace(svgString, /width="(.*?)" height="(.*?)"/, 'width="100%" height="100%"');

const GraphRenderer = ({
  edges,
  header,
  nodes,
  showDetail,
}: {
  edges: GraphEdge[];
  header: string[];
  nodes: GraphNode[];
  showDetail: boolean;
}) => {
  const [svgString, setSvgString] = useState('');

  const allItems: string[][] = [
    header,
    map(edges, buildEdgeToDot(showDetail)),
    map(nodes, buildNodeToDot(showDetail)),
    ['}'],
  ];

  const graphVizString = allItems.map((subarray: string[]) => subarray.join(newLine)).join(newLine);

  viz
    .renderString(graphVizString)
    .then(setSvgString)
    .catch(console.error);

  if (!svgString) {
    return <div>Rendering</div>;
  }
  const fileDefinitions = [
    { content: svgString, fileType: 'svg', mimeType: 'image/svg+xml' },
    {
      content: graphVizString,
      fileType: 'gv',
      mimeType: 'application/octet-stream',
    },
  ];

  return (
    <div>
      <div
        dangerouslySetInnerHTML={{
          __html: removeExplicitDimensions(svgString),
        }}
      />

      {map(fileDefinitions, item => (
        <button key={item.fileType} type="button" onClick={() => handleSave(item)}>
          Save .{item.fileType}
        </button>
      ))}
    </div>
  );
};
export default GraphRenderer;
