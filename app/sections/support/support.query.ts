export const SUPPORT_QUERY = `
  query {
    supportSection {
      enabled
      title
      intro
      maxItems
      options {
        id
        title
        excerpt
        body
        ctaLabel
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

    allSupportOptions(
      filter: { is_enabled: { eq: true } }
      orderBy: priority_ASC
    ) {
      id
      title
      excerpt
      body
      ctaLabel
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
