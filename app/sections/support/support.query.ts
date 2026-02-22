export const SUPPORT_SECTION_QUERY = `
  query {
    supportSection {
      enabled
      title
      intro
      maxItems: max_items
    }
  }
`;

export const SUPPORT_OPTIONS_QUERY = `
  query SupportOptions($first: IntType) {
    allSupportOptions(
      first: $first
      filter: { is_enabled: { eq: true } }
      orderBy: priority_ASC
    ) {
      id
      title
      excerpt
      body
      ctaLabel: cta_label
      priority
      isEnabled: is_enabled
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
