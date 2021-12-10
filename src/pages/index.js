import React from 'react';
import { graphql, Link } from 'gatsby';

const Page = ({
  data: {
    allOldNyc: { nodes }
  }
}) => {
  return (
    <main>
      <h1>Index Page</h1>
      <ul>
        {nodes.map((item, index) => {
          const { properties, slug } = item;
          return (
            <li key={index}>
              <Link to={slug}>{`${index} : ${properties.name}`}</Link>
            </li>
          );
        })}
      </ul>
    </main>
  );
};

export const query = graphql`
  {
    allOldNyc {
      nodes {
        slug
        properties {
          name
        }
      }
    }
  }
`;

export default Page;
