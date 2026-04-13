export const SUPPORT_QUERY = `
  query {
    supportSection {
      enabled
      title
      intro
    }

    allSupportOptions(orderBy: priority_ASC) {
      id
      enabled
      title
      excerpt
      body
      cta_label
      priority
      link
      image {
        url
        alt
      }
    }
  }
`;
