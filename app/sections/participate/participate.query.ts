export const PARTICIPATE_QUERY = `
  query {
    eventsSettings {
      enabled
    }

    allEvents(
      filter: { is_published: { eq: true } }
      orderBy: starts_at_ASC
      first: 50
    ) {
      id
      title
      excerpt
      body
      starts_at
      cta_label
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
