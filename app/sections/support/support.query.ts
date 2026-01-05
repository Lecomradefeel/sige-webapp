export const SUPPORT_QUERY = `
  query {
    allSupportOptions(
      filter: { is_enabled: { eq: true } }
      orderBy: priority_ASC
    ) {
      id
      title
      excerpt
      body
      cta_label
      priority
      link {
        url
      }
      image {
        url
        alt
      }
    }
  }
`;
