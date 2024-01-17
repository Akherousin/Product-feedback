const paths = {
  home() {
    return '/';
  },

  createRequest() {
    return `/new`;
  },

  showRequestPage(slug: string) {
    return `/feedback/${slug}`;
  },

  showEditPage(slug: string) {
    return `/feedback/${slug}/edit`;
  },

  //   postShow(topicSlug: string, postId: string) {
  //     return `/topics/${topicSlug}/posts/${postId}`;
  //   },
};

export default paths;
