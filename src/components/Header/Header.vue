<template>
  <header class="header">
    <div class="container">
      <div class="header__top">
        <div class="header__top-logo"><a href="/">пёсель</a></div>
        <div class="header__top-favorites">
          <button>Избранные пёсели</button>
        </div>
      </div>
      <div class="header__bottom">
        <ul class="header__bottom-breeds">
          <li>
            <a
              class="chooseBreeds"
              href="#"
              @click.stop.prevent="showBreedsList"
              >Породы</a
            >
            <div
              class="breeds-list"
              ref="breedsMenu"
              :class="IS_BREEDS_MENU ? 'breeds-list--active' : ''"
            >
              <button
                
                @click="filterDogsByBreeds(breed)"
                v-for="(breed, index) in breedsItems"
                :key="index"
                class="breeds-list__btn"
                :class="{active: currBreed === breed}"
                :disabled="currBreed === breed"
                
              >
                {{ breed }}
              </button>
            </div>
          </li>
        </ul>
        <div class="header__bottom-dropdown">
          <div class="switch-component">
            <button @click="changeSwitch">
              <span class="title">Сортировка по алфавиту</span>
              <label class="switch">
                <input name="switch-test" type="checkbox" :checked="isSwitch">
                <span class="slider round"></span>
              </label> 
            </button>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "Header",
  components: {},
  data() {
    return {
      currBreed: "",
      isSwitch: false,
      breedsItems: {},
    };
  },
  computed: {
    ...mapGetters(["BREEDS", "IS_BREEDS_MENU", "PAYLOAD"]),
  },
  methods: {
    ...mapActions([
      "GET_CURRENT_PAYLOAD",
      "UPDATE_STORE_DOGS",
      "GET_DOGS_FROM_API",
      "GET_ALL_BREEDS_FROM_API",
      "SHOW_BREEDS_MENU",
      "CLOSE_BREEDS_MENU",
    ]),
    changeSwitch: function() {
      this.isSwitch =! this.isSwitch;
    },
    loadBreedsStart: function () {
      this.breedsItems = Object.keys(this.BREEDS);
    },
    showBreedsList: function () {
      this.SHOW_BREEDS_MENU();
    },
    closeBreedsList: function (e) {
      if (!this.$refs.breedsMenu.contains(e.target)) {
        this.CLOSE_BREEDS_MENU();
      }
    },
      filterDogsByBreeds: function (breed) {
        this.currBreed = breed;
        this.UPDATE_STORE_DOGS()
        this.GET_CURRENT_PAYLOAD(breed)
        this.GET_DOGS_FROM_API(this.PAYLOAD)
        console.log(breed)
        this.CLOSE_BREEDS_MENU();

      },
  },
  created() {
    window.addEventListener("click", this.closeBreedsList);
  },
  beforeDestroy() {
    window.removeEventListener("click", this.closeBreedsList);
  },
  async mounted() {
    await this.GET_ALL_BREEDS_FROM_API();
    this.loadBreedsStart();
  },
};
</script>

<style lang="scss">
.header {
  background: #151419;
  box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.55);
  margin: 0px 0px 24px 0px;
  position: sticky;
  top: 0px;
  left: 0px;
  width: 100%;
  z-index: 9;
}
.header__top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 60px;
  &-logo {
    text-transform: uppercase;
    color: #fff;
    a {
      font-weight: bold;
      letter-spacing: 2px;
      text-decoration: none;
      color: #3C59F0;
      img {
        max-width: 120px;
        height: auto;
      }
    }
  }
  &-favorites {
    button {
      background: transparent;
      border: none;
      color: inherit;
    }
  }
}
.header__bottom {
  display: flex;
  justify-content: space-between;
  padding: 10px 0px;
  align-items: center;
  ul {
    list-style: none;
  }
  &-breeds {
    position: relative;
    flex: 1 1 auto;
    li {
      text-align: left;
      .chooseBreeds {
        color: #fff;
        position: relative;
        text-decoration: none;
      }
      .breeds-list {
        width: 310px;
        height: 100vh;
        overflow-y: auto;
        padding: 16px;
        position: fixed;
        top: 0;
        left: 0;
        background: #151419;
        transform: translateX(-100%);
        transition: transform 0.3s;
        &--active {
          transform: translateX(0%);
        }

        &__btn {
          cursor: pointer;
          display: inline-block;
          padding: 5px 10px;
          background: #eee;
          margin: 0px 8px 8px 0px;
          border-radius: 16px;
          border: none;
          font-size: 16px;
        }
        &__btn.active {
          background: #3C59F0;
          color: #fff;
          pointer-events: none;
          
        }
      }
    }
  }
  &-dropdown {
    position: relative;
  }
}

.switch-component {
  position: relative;
  button {
    display: flex;
    align-items: center;
    padding: 0px 8px;
    background: transparent;
    border: none;
    color: inherit;
    span {
      padding: 0px 8px 0px 0px;
    }
  }
  .switch {
  position: relative;
  display: inline-block;
  width: 42px;
  height: 24px;
  pointer-events: none;
}

.switch input { 
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: .4s;
  transition: .4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 16px;
  width: 16px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: .4s;
  transition: .4s;
}

input:checked + .slider {
  background-color: #3C59F0;
}


input:checked + .slider:before {
  -webkit-transform: translateX(19px);
  -ms-transform: translateX(19px);
  transform: translateX(19px);
}

.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}
  
}
</style>
