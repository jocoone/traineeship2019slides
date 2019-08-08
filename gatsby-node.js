const path = require('path');
const _ = require('lodash');
const { readFileSync } = require('fs');

// Remove trailing slash
exports.onCreatePage = ({ page, actions }) => {
  const { createPage, deletePage } = actions;

  return new Promise((resolve, reject) => {
    // Remove trailing slash
    const newPage = Object.assign({}, page, {
      path: page.path === `/` ? page.path : page.path.replace(/\/$/, ``),
    });

    if (newPage.path !== page.path) {
      // Remove the old page
      deletePage(page);
      // Add the new page
      createPage(newPage);
    }

    resolve();
  });
};

// Create pages from markdown nodes
exports.createPages = async ({ actions, createContentDigest, createNodeId, graphql }, pluginOptions) => {
  const { createPage, createNode } = actions;
  const slideTemplate = path.resolve(`src/layouts/index.js`);

  graphql(`
      {
        allFile(filter: {base: {ne: "placeholder.html"}}) {
          nodes {
            base
            ext
            relativePath
            absolutePath
          }
        }
      }
    `).then(slidesResult => {
      if (slidesResult.errors) {
        return Promise.reject(slidesResult.errors);
      }

      const slides = slidesResult.data.allFile.nodes;
      slides.sort((a, b) => a.base > b.base ? 1 : -1);
      const content = slides.map(({ absolutePath }) => readFileSync(absolutePath)).join('');
      createPage({
        path: '/slides',
        component: slideTemplate,
        context: {
          content
        }
      });

      return Promise.resolve(() => {});
    });
};

exports.sourceNodes = ({ actions }) => {
  actions.createTypes(`
    type Slide implements Node {
      html: String
      index: Int
    }
  `);
};
