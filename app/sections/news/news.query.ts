export const NEWS_QUERY = `
  query {
    allNotizias(
      filter: { _status: { eq: published } }
      orderBy: [_firstPublishedAt_DESC]
      first: 20
    ) {
      id
      title
      excerpt
      body
      _firstPublishedAt
      image {
        url
        alt
      }
    }
  }
`;
