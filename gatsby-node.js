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

  data.response.results
    .filter((item) => item.description !== null)
    .forEach((item) => {
      const { id, blur_hash } = item;

      createNode({
        ...item,
        id: id,
        slug: `/${slugify(blur_hash)}`,
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
      allNycPhoto(sort: { order: DESC, fields: likes }) {
        edges {
          node {
            id
            slug
            likes
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
    const { id, slug, likes } = node;

    createPage({
      path: slug,
      component: path.resolve('src/templates/template.js'),
      context: {
        id: id,
        pagePath: slug,
        prev: index === 0 ? null : previous,
        next: index === edges.length - 1 ? null : next
      },
      defer: likes < 100
    });
  });
};
