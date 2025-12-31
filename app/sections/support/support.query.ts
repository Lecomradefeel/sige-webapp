export const SUPPORT_QUERY = `
  query {
    supportSection {
      enabled
      title
      intro
      maxItems
    }
    allSupportOptions(orderBy: priority_ASC, first: 50) {
      id
      enabled
      priority
      label
      title
      excerpt
      body
      link
      ctaLabel
    }
  }
`;
`;
