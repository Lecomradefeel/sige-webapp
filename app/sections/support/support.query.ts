export const SUPPORT_QUERY = `
  query {
    supportSection {
      enabled
      title
      intro
      maxItems
    }
    allSupportOptions(
      filter: { enabled: { eq: true } }
      orderBy: priority_ASC
    ) {
      id
      enabled
      title
      excerpt
      body
      ctaLabel
      priority
      link
      image {
        url
        alt
      }
    }
  }
`;
