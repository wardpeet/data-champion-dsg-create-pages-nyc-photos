import React from 'react';
import { graphql, Link } from 'gatsby';

const Page = ({
  data: {
    allOldNyc: { nodes }
  }
}) => {
  return (
    <main className="container mx-auto max-w-5xl grid gap-16 p-8">
      <div className="grid gap-6 px-5">
        <h1 className="text-5xl font-black grid gap-1">
          <span>Old NYC</span>
          <span className="text-brand-primary">Photographs</span>
        </h1>
        <div>
          <h2 className="text-lg">
            {`Displaying ${nodes.length} photos sourced from the `}
            <a className="text-brand-default" href="http://spacetime.nypl.org/#data-oldnyc" rel="nopener">
              Space/Time Directory
            </a>
          </h2>
          <span className="font-black">
            Contains the location of 39516 photos from Photographic Views of New York City, 1870s-1970s collection, taken from Dan Vanderkam’s OldNYC
          </span>
        </div>
      </div>
      <ul className="grid gap-8">
        {nodes.map((item, index) => {
          const { properties, slug } = item;
          return (
            <li
              key={index}
              className="cursor-pointer flex flex-col shadow-md rounded-lg bg-gray-50 transform transition ease-in-out duration-300 hover:-translate-y-1 hover:shadow-lg hover:bg-white"
            >
              <Link to={slug} className="grid grid-cols-1fr-auto items-center p-8">
                <h2 className="text-2xl font-black">{properties.name}</h2>
                <span role="img" aria-label="Eyes" className="text-3xl">
                  👀
                </span>
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
