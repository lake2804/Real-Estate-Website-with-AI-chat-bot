export const state = () => ({
  layout: 'default'
});

export const mutations = {
  SET_LAYOUT(state, layout) {
    state.layout = layout;
  }
};
