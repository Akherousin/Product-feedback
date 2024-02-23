import { Category } from '@prisma/client';

const paths = {
  home() {
    return '/';
  },

  homeFiltered(filter: Category) {
    return `/${filter}`;
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

  showRoadmapPage() {
    return '/roadmap';
  },
};

export default paths;
