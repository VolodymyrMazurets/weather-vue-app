import { http } from '../../services';

const state = () => ({});

const mutations = {};

const actions = {
  createPost: async (store, { name, text }) => {
    try {
    await http.createPost({ name, text });
    } catch (error) {
      console.log(error, 'error');
    }
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
