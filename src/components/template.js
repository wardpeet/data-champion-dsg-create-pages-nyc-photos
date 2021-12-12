import React from 'react';
import { graphql, Link } from 'gatsby';
import LeftArrow from './left-arrow';
import RightArrow from './right-arrow';

const Template = ({
  data: {
    oldNyc: { properties }
  },
  pageContext
}) => {
  console.log(pageContext);
  return (
    <main>
      <div className="relative grid gap-4 bg-black text-white opacity-80 p-4 z-20">
        <Link to="/" className="relative grid grid-cols-auto-1fr">
          <LeftArrow />
          Back
        </Link>
        <h1 className="font-black text-3xl">{properties.name}</h1>
      </div>
      <div className="absolute top-0 left-0 w-full h-screen z-10">
        <div className="flex justify-between items-center w-full h-screen">
          {pageContext.prev ? (
            <Link className="bg-black text-white p-4 opacity-80 font-bold capitalize" to={`/${pageContext.prev.slug}`}>
              <LeftArrow />
            </Link>
          ) : (
            <div />
          )}
          {pageContext.next ? (
            <Link className="bg-black text-white p-4 opacity-80 font-bold capitalize" to={`/${pageContext.next.slug}`}>
              <RightArrow />
            </Link>
          ) : (
            <div />
          )}
        </div>
      </div>
      <div className="absolute top-0 left-0 w-full h-screen bg-cover bg-center z-1">
        <img src={properties.data.imageUrl} alt={properties.name} className="object-cover w-full h-full" />
      </div>
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
