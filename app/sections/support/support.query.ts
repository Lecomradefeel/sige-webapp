export const SUPPORT_QUERY = `
  query {
    supportSection {
      enabled
      title
      intro
    }
    allSupportOptions(orderBy: priority_ASC, first: 12) {
      id
      title
      excerpt
      body
      link
      ctaLabel
      priority
      isEnabled
    }
  }
`;
`;
