require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`
});

const fetch = require('node-fetch');
const slugify = require('@sindresorhus/slugify');
const path = require('path');

const { createApi } = require('unsplash-js');

const unsplash = createApi({
  accessKey: process.env.UNSPLASH_API_KEY,
  fetch: fetch
});

exports.sourceNodes = async ({ actions: { createNode }, createContentDigest }) => {
  const data = await unsplash.search.getPhotos({
    query: 'nyc',
    page: 1,
    perPage: 30,
    color: 'black_and_white',
    orientation: 'landscape'
  });

  data.response.results.forEach(async (item) => {
    const { id, blur_hash } = item;

    createNode({
      ...item,
      id: `${id}`,
      slug: slugify(blur_hash),
      internal: {
        type: 'NycPhoto',
        contentDigest: createContentDigest(item)
      }
    });
  });
};

exports.createPages = async ({ graphql, actions: { createPage } }) => {
  const {
    data: {
      allNycPhoto: { edges }
    }
  } = await graphql(`
    {
      allNycPhoto(filter: { description: { ne: null } }) {
        edges {
          node {
            id
            slug
          }
          next {
            slug
          }
          previous {
            slug
          }
        }
      }
    }
  `);

  edges.forEach(({ node, previous, next }, index) => {
    const { id, slug } = node;

    createPage({
      path: slug,
      component: path.resolve('src/templates/template.js'),
      context: {
        id: id,
        prev: index === 0 ? null : previous,
        next: index === edges.length - 1 ? null : next
      },
      defer: index + 1 > 10
    });
  });
};

// const fetch = require('node-fetch');
// const slugify = require('@sindresorhus/slugify');
// const path = require('path');

// exports.sourceNodes = async ({ actions: { createNode }, createContentDigest }) => {
//   const response = await fetch('http://s3.amazonaws.com/spacetime-nypl-org/datasets/oldnyc/oldnyc.geojson');

//   const data = await response.json();

//   const trimedData = data.features.slice(0, process.env.NODE_ENV === 'development' ? 100 : data.features.length);

//   const uniqueData = trimedData.reduce((items, item) => {
//     if (items.find((etnry) => etnry.properties.name === item.properties.name)) {
//       return items;
//     } else {
//       return [...items, item];
//     }
//   }, []);

//   uniqueData.forEach(async (item) => {
//     const {
//       properties: { id, name }
//     } = item;

//     createNode({
//       ...item,
//       id: `${id}`,
//       slug: slugify(name),
//       internal: {
//         type: 'OldNyc',
//         contentDigest: createContentDigest(item)
//       }
//     });
//   });
// };

// exports.createPages = async ({ graphql, actions: { createPage } }) => {
//   const {
//     data: {
//       allOldNyc: { edges }
//     }
//   } = await graphql(`
//     {
//       allOldNyc {
//         edges {
//           node {
//             id
//             slug
//           }
//           next {
//             slug
//           }
//           previous {
//             slug
//           }
//         }
//       }
//     }
//   `);

//   edges.forEach(({ node, previous, next }, index) => {
//     const { id, slug } = node;

//     createPage({
//       path: slug,
//       component: path.resolve('src/templates/template.js'),
//       context: {
//         id: id,
//         prev: index === 0 ? null : previous,
//         next: index === edges.length - 1 ? null : next
//       },
//       defer: index + 1 > 10
//     });
//   });
// };
