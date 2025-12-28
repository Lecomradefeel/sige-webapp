export const PARTICIPATE_QUERY = `
  query {
    allCtaSections(first: 1) {
      title
      subtitle
      items {
        order
        kicker
        title
        description
        link
        variant
      }
    }
  }
`;
