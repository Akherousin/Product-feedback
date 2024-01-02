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

  //   postShow(topicSlug: string, postId: string) {
  //     return `/topics/${topicSlug}/posts/${postId}`;
  //   },
};

export default paths;
