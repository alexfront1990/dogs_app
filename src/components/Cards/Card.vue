<template>
  <div class="card card--3x">
    <div class="card__wrap">
      <button @click="addToFavorites" class="card__add-favorites">Like</button>
      <div class="card__img">
        <img :src="dog" />
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "Card",
  components: {},
  props: {
    dog: {},
  },
  methods: {
    addToFavorites: function () {
      alert("YEAH");
    },
  },
};
</script>

<style lang="scss">
.card {
  margin: 0px 0px 16px 0px;
  &--3x {
    flex: 0 1 33.33333%;
    padding: 0px 8px;
  }
  &__wrap {
    position: relative;
    height: 200px;
    background: #424242;
    border-radius: 8px;
  }
  &__img {
    position: relative;
    width: 100%;
    height: 100%;
    border-radius: 8px;
    overflow: hidden;
    &:before {
      content: "";
      position: absolute;
      width: 100%;
      height: 100%;
      bottom: 0px;
      left: 0px;
      background: linear-gradient(
        1.26deg,
        #000000 -5.53%,
        rgba(0, 0, 0, 0) 54.45%
      );
    }

    img {
      overflow: hidden;
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center;
    }
  }
  &__add-favorites {
    position: absolute;
    left: 8px;
    top: 8px;
    z-index: 1;
  }
}
</style>
