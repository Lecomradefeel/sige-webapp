export const PARTICIPATE_QUERY = `
  query {
    allEvents(
      filter: { _status: { eq: published } }
      orderBy: [_firstPublishedAt_ASC]
      first: 50
    ) {
      id
      title
      excerpt
      body
      startsAt
      ctaLabel
      image {
        url
        alt
      }
      location {
        latitude
        longitude
      }
    }
  }
`;
