import React from 'react';
import { graphql, Link } from 'gatsby';

const Template = ({
  data: {
    oldNyc: { properties }
  },
  pageContext
}) => {
  console.log(pageContext);
  return (
    <main>
      <ul>
        <li>
          <Link to="/">Back</Link>
        </li>
        {pageContext.prev ? (
          <li>
            <Link to={`/${pageContext.prev.slug}`}>prev</Link>
          </li>
        ) : null}
        {pageContext.next ? (
          <li>
            <Link to={`/${pageContext.next.slug}`}>next</Link>
          </li>
        ) : null}
      </ul>
      <h1>{properties.name}</h1>
      <img src={properties.data.imageUrl} alt={properties.name} />
    </main>
  );
};

export const query = graphql`
  query ($id: String) {
    oldNyc(id: { eq: $id }) {
      id
      properties {
        name
        data {
          imageUrl
        }
      }
    }
  }
`;

export default Template;
