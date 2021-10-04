<template>
  <div>
    <div class="cards-wrap" v-if="dataReady">
      <Card v-for="(dog, index) in DOGS" :key="index" :dog="dog" />
    </div>
    <Preloader v-else />
  </div>
</template>

<script>
import Card from "@/components/Cards/Card";
import Preloader from "@/components/Preloader";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "CardsViewer",
  components: {
    Card,
    Preloader,
  },
  data() {
    return {
      dataReady: false,
    };
  },
  computed: {
    ...mapGetters(["DOGS", "PAYLOAD"]),
  },
  methods: {
    ...mapActions([
      "GET_UNIQUE_DOGS_STATE",
      "GET_DOGS_FROM_API",
      "UPDATE_VIEWS_ON_PAGE",
      "START_LOADED_DOGS",
      "ADD_TO_LOADED_DOGS",
    ]),
    loadMore: function () {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        this.ADD_TO_LOADED_DOGS();
      }
    },
  },

  created() {
    window.addEventListener("scroll", this.loadMore);
  },

  beforeDestroy() {
    window.removeEventListener("scroll", this.loadMore);
  },

  async mounted() {
    await this.GET_DOGS_FROM_API(this.PAYLOAD);
    this.dataReady = true;
  },
};
</script>

<style lang="scss"></style>
