import React from 'react';
import { graphql, Link } from 'gatsby';
import LeftArrow from '../components/left-arrow';

const Page = ({
  data: {
    allNycPhoto: { nodes }
  }
}) => {
  return (
    <main className="container mx-auto max-w-5xl grid gap-8 p-8">
      <Link to="/" className="relative grid grid-cols-auto-1fr">
        <LeftArrow />
        Back
      </Link>
      <h1 className="text-5xl font-black grid gap-1">
        <span>404 Error</span>
        <span className="text-brand-primary">Page Not Found</span>
      </h1>
      <ul className="list-disc leading-8">
        {nodes.map((item, index) => {
          const { slug } = item;
          return (
            <li>
              <Link to={slug} className="cursor-pointer text-sm text-gray-700 hover:text-brand-default hover:underline">
                {slug}
              </Link>
            </li>
          );
        })}
      </ul>
    </main>
  );
};

export const query = graphql`
  {
    allNycPhoto(sort: { order: DESC, fields: likes }) {
      nodes {
        slug
        description
        alt_description
        user {
          name
        }
        urls {
          small
        }
        likes
      }
    }
  }
`;

export default Page;
