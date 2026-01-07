export const SUPPORT_QUERY = `
  query {
    supportSection {
      enabled: is_enabled
      title
      intro
      maxItems: max_items
    }
    allSupportOptions(
      filter: { is_enabled: { eq: true } }
      orderBy: priority_ASC
    ) {
      id
      label
      title
      excerpt
      body
      ctaLabel: cta_label
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
