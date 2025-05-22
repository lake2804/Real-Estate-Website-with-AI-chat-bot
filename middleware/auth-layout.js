export default function ({ route, store }) {
  if (route.path === '/login' || route.path === '/register') {
    store.commit('SET_LAYOUT', 'auth');
  } else {
    store.commit('SET_LAYOUT', 'main');
  }
}
