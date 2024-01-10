const paths = {
  home() {
    return '/';
  },

  createRequest() {
    return `/new`;
  },

  showRequestPage(slug: string) {
    return `/${slug}`;
  },

  showEditPage(slug: string) {
    return `/${slug}/edit`;
  },

  //   postShow(topicSlug: string, postId: string) {
  //     return `/topics/${topicSlug}/posts/${postId}`;
  //   },
};

export default paths;
