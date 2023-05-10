import Pages from '@/api/pages';
export default (context, inject) => {
  // Initialize API factories
  const factories = {
    pages: Pages(context.$axios),
  };
  // Inject $api
  inject('api', factories);
};
