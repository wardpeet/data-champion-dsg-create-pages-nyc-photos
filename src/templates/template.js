import React from 'react';
import { graphql, Link } from 'gatsby';
import LeftArrow from '../components/left-arrow';
import RightArrow from '../components/right-arrow';

import Heart from '../components/heart';
import User from '../components/user';

const Template = ({
  data: {
    nycPhoto: {
      description,
      alt_description,
      user: { name, portfolio_url },
      urls: { regular },
      likes
    }
  },
  pageContext
}) => {
  return (
    <main>
      <div className="relative grid gap-4 bg-black text-white opacity-80 p-4 z-20 capitalize">
        <Link to="/" className="relative grid grid-cols-auto-1fr">
          <LeftArrow />
          Back
        </Link>
        <h1 className="font-black text-3xl ">{description}</h1>
        <p className="text-sm font-normal">{alt_description}</p>
        <div className="grid grid-cols-auto-1fr gap-4 items-end text-sm">
          <a href={portfolio_url} target="_blank" rel="noreferrer" className="cursor-pointer grid grid-cols-auto-1fr gap-1 items-center hover:text-purple-200 transition">
            <User />
            {name}
          </a>
          <div className="grid grid-cols-auto-1fr gap-1 items-center">
            <Heart />
            {likes}
          </div>
        </div>
      </div>
      <div className="absolute top-0 left-0 w-full h-screen z-10">
        <div className="flex justify-between items-center w-full h-screen">
          {pageContext.prev ? (
            <Link className="bg-brand-primary text-white p-4 font-bold capitalize" to={`/${pageContext.prev.slug}`}>
              <LeftArrow />
            </Link>
          ) : (
            <div />
          )}
          {pageContext.next ? (
            <Link className="bg-brand-primary text-white p-4 font-bold capitalize" to={`/${pageContext.next.slug}`}>
              <RightArrow />
            </Link>
          ) : (
            <div />
          )}
        </div>
      </div>
      <div className="absolute top-0 left-0 w-full h-screen bg-cover bg-center z-1">
        <img src={regular} alt={alt_description} className="object-cover w-full h-full" />
      </div>
    </main>
  );
};

export const query = graphql`
  query ($id: String) {
    nycPhoto(id: { eq: $id }) {
      description
      alt_description
      user {
        name
        portfolio_url
      }
      urls {
        regular
      }
      likes
    }
  }
`;

export default Template;
