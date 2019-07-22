import { Module, render } from "viz.js/full.render.js";
import includes from "lodash/fp/includes";
import React, { useState } from "react";
import split from "lodash/fp/split";
import Viz from "viz.js";

const viz = new Viz({ Module, render });

const filterItems = ({ items, relevantIndices, splitter, nodesToShow }) =>
  items.filter(itemString => {
    const splitItem = split(splitter)(itemString);
    const relevantParts = splitItem.filter((part, index) =>
      includes(index)(relevantIndices)
    );
    return relevantParts.every(relevantPart =>
      includes(relevantPart, nodesToShow)
    );
  });

const GraphRenderer = ({ header, edges, nodes, nodesToShow }) => {
  const [svgHtml, setSvgHtml] = useState("");

  const allItems = [].concat([
    header,
    filterItems({
      items: edges,
      relevantIndices: [0, 2],
      splitter: /( -> | \[)/,
      nodesToShow
    }),
    filterItems({
      items: nodes,
      relevantIndices: [0],
      splitter: / \[/,
      nodesToShow
    }),
    ["}"]
  ]);
  console.log(allItems)
  viz
    .renderString(allItems.map(subarray => subarray.join("\n")).join(""))
    .then((string) => {setSvgHtml(string); console.log(string)})
    .catch(error => {
      console.error(error);
    });

  if (!svgHtml) {
    return <div>Rendering</div>;
  }

  return <div dangerouslySetInnerHTML={{ __html: svgHtml }} />;
};
export default GraphRenderer;
