import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    payload: {
      counter: 20,
      breed: "boxer",
    },
   
    breedsMenu: false,
    isOverlay: false,
    dogs: [],
    breeds: [],
  },
  mutations: {
    SET_DOGS_TO_STATE: (state, res) => {
      state.dogs = res;
    },
    SET_BREEDS_TO_STATE: (state, res) => {
      state.breeds = res;
    },
    SET_BREEDS_MENU_ACTIVE: (state) => {
      state.breedsMenu = true;
      state.isOverlay = true;
    },
    SET_BREEDS_MENU_DISABLE: (state) => {
      (state.breedsMenu = false), (state.isOverlay = false);
    },
    CLEAR_STORE_BEFORE_UPLOAD: (state) => {
      state.dogs = [];
    },
    START_LOADED_DOGS: (state) => {
      state.loadedDogs = state.dogs;
    }, //?
    ADD_UPLOADED_DOGS_TO_STATE: (state, newDogs) => {
      let setUnique = new Set(newDogs);
      state.dogs.push(...setUnique);
    },
    RETURN_CLEAN_DOGS_STATE: (state) => {
      let set = new Set(state.dogs);
      let cleanState = [...set];
      state.dogs = cleanState;
    },
    LOAD_CURRENT_PAYLOAD: (state, currentBreed) => {
      state.payload.breed = currentBreed;
    }
  },
  actions: {
    GET_DOGS_FROM_API({ commit }, payload) {
      return axios(
        `https://dog.ceo/api/breed/${payload.breed}/images/random/${payload.counter}`,
        {
          method: "GET",
        }
      )
        .then((res) => {
          commit("SET_DOGS_TO_STATE", res.data.message);
          return res;
        })
        .catch((err) => {
          console.log(err);
          return err;
        });
    },
    GET_ALL_BREEDS_FROM_API({ commit }) {
      return axios("https://dog.ceo/api/breeds/list/all", {
        method: "GET",
      })
        .then((res) => {
          commit("SET_BREEDS_TO_STATE", res.data.message);
          return res;
        })
        .catch((err) => {
          console.log(err);
          return err;
        });
    },
    ADD_TO_LOADED_DOGS({ commit, dispatch }) {
      return axios(
        `https://dog.ceo/api/breed/${this.state.payload.breed}/images/random/${this.state.payload.counter}`,
        {
          method: "GET",
        }
      ).then((res) => {
        dispatch("GET_UNIQUE_DOGS_STATE");
        commit("ADD_UPLOADED_DOGS_TO_STATE", res.data.message);
      });
    },
    GET_CURRENT_PAYLOAD({commit}, currentBreed) {
      commit("LOAD_CURRENT_PAYLOAD", currentBreed)
    },
    UPDATE_STORE_DOGS({ commit }) {
      commit("CLEAR_STORE_BEFORE_UPLOAD");
    },
    SHOW_BREEDS_MENU({ commit }) {
      commit("SET_BREEDS_MENU_ACTIVE");
    },
    CLOSE_BREEDS_MENU({ commit }) {
      commit("SET_BREEDS_MENU_DISABLE");
    },
  
    START_LOADED_DOGS({ commit }) {
      commit("START_LOADED_DOGS");
    },
    GET_UNIQUE_DOGS_STATE({ commit }) {
      commit("RETURN_CLEAN_DOGS_STATE");
    },
  },
  modules: {},
  getters: {
    DOGS(state) {
      return state.dogs;
    },
    BREEDS(state) {
      return state.breeds;
    },
    IS_BREEDS_MENU(state) {
      return state.breedsMenu;
    },
    IS_OVERLAY(state) {
      return state.isOverlay;
    },
    VIEWS_ON_PAGE(state) {
      return state.counter;
    },
    PAYLOAD(state) {
      return state.payload;
    },
  },
});
