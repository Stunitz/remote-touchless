<template>
  <div class="q-pa-md row justify-center">
    <div style="width: 100%; " class="row justify-center ">
      <input
        @input="handleInput"
        type="text"
        style="width: 100%; margin: 0 40px 10px 40px;"
        v-model="lastValue"
      />
    </div>
    <div style="width: 100%; " class="row justify-center ">
      <q-btn
        color="primary"
        @click="keyTap('backspace')"
        style="margin: 0 16px 10px 0px;"
        >BACK</q-btn
      >

      <q-btn
        color="primary"
        style="margin: 0 16px 10px 0px;"
        @click="keyTap('space')"
        >SPACE</q-btn
      >
      <q-btn
        color="primary"
        style="margin: 0 16px 10px 0px;"
        @click="keyTap('enter')"
        >ENTER</q-btn
      >
    </div>
    <q-card
      cols="10"
      v-touch-pan.prevent.mouse="handlePan"
      @click="handleClick('left')"
      class="custom-area cursor-pointer bg-primary text-white shadow-2 relative-position row flex-center"
    >
      <div v-if="panning">
        <q-spinner-bars class="sending-signal" color="white" size="2em" />
        <q-tooltip :offset="[0, 8]">QSpinnerBars</q-tooltip>
      </div>

      <div cols="2" v-if="showInfo && info" class="custom-info">
        <pre>{{ info }}</pre>
      </div>
      <div v-else class="text-center custom-info">
        <q-icon
          :style="{
            color: panning
              ? info.direction === 'up'
                ? 'white'
                : '#1976d2'
              : 'white'
          }"
          style="font-size: 32px"
          name="arrow_upward"
        />
        <div class="row items-center">
          <q-icon
            :style="{
              color: panning
                ? info.direction === 'left'
                  ? 'white'
                  : '#1976d2'
                : 'white'
            }"
            style="font-size: 32px"
            name="arrow_back"
          />
          <div style="font-size: 18px">Pan in any direction</div>
          <!-- <div style="width: 100%; height: 100%;"><div style="width: 100%; height: 100%;" class="zone static"></div></div> -->
          <q-icon
            :style="{
              color: panning
                ? info.direction === 'right'
                  ? 'white'
                  : '#1976d2'
                : 'white'
            }"
            style="font-size: 32px"
            name="arrow_forward"
          />
        </div>
        <q-icon
          :style="{
            color: panning
              ? info.direction === 'down'
                ? 'white'
                : '#1976d2'
              : 'white'
          }"
          style="font-size: 32px"
          name="arrow_downward"
        />
      </div>

      <div v-show="panning" class="touch-signal">
        <q-icon name="touch_app" />
      </div>
    </q-card>

    <div style="width: 100%; " class="q-pa-md row justify-center ">
      <q-btn-group>
        <q-btn @click="keyTap('up')" rounded color="primary" label="🔼" />

        <q-btn
          @click="keyTap('down')"
          rounded
          auto-close
          color="primary"
          label="🔽"
        />
      </q-btn-group>
    </div>
    <div style="width: 100%; " class="row justify-center ">
      <q-btn-group>
        <q-btn
          @click="handleClick('left')"
          color="primary"
          label="LEFT CLICK"
        />

        <q-btn
          @click="handleClick('right')"
          auto-close
          color="primary"
          label="RIGHT CLICK"
        />
      </q-btn-group>
    </div>

    <div style="width: 100%; " class=" row justify-center ">
      <!-- <q-toggle
        cols="2"
        v-model="showInfo"
        checked-icon="check"
        color="primary"
        unchecked-icon="clear"
        label="Show meta"
      /> -->

      <q-slider label v-model="sensitivity" :min="1" :max="10" />
      <q-badge style="height: 26px; font-size: 14px;" color="primary">
        Sensitivity: {{ sensitivity }} (1 to 10)
      </q-badge>
    </div>
  </div>
</template>

<script>
import socket from "../utils/socket";

export default {
  data() {
    return {
      info: null,
      panning: false,
      sensitivity: 2,
      showInfo: false,
      delay: 700,
      clicks: 0,
      timer: null,
      lastValue: "",
      interval: false,
      test: ""
    };
  },

  methods: {
    handlePan({ evt, ...info }) {
      this.info = info;

      if (info.isFirst) {
        this.panning = true;
      } else if (info.isFinal) {
        this.panning = false;
      }

      socket.mouseMove({
        x: info.delta.x * this.sensitivity,
        y: info.delta.y * this.sensitivity,
        scroll: false
      });
    },

    handleClick(button) {
      this.clicks++;
      let double = false;

      if (this.clicks === 1) {
        console.log("single click");
        this.timer = setTimeout(() => {
          this.clicks = 0;
        }, this.delay);
        double = false;
      } else {
        console.log("double click");
        clearTimeout(this.timer);
        this.clicks = 0;
        double = true;
      }

      socket.mouseClick({ button: button, double });
    },

    handleInput(event) {
      if (event.data === undefined) return;
      this.test = event.data;
      // alert(event.data);
      let newValue = event.data[event.data.length - 1];
      newValue = newValue === "" || newValue === " " ? " " : newValue;
      console.log("typing: ", newValue);
      socket.keypress(newValue);
      this.lastValue = newValue;
    },
    keyTap(key) {
      console.log("keyTap: ", key);
      socket.keyTap(key);
    }
  }
};
</script>

<style lang="sass" scoped>
.custom-area
  width: 90%
  height: 340px
  border-radius: 3px
  padding: 8px

.custom-info pre
  width: 180px
  font-size: 12px

.touch-signal
  position: absolute
  top: 16px
  right: 16px
  width: 35px
  height: 35px
  font-size: 25px
  border-radius: 50% !important
  text-align: center
  background: rgba(255, 255, 255, .2)

.sending-signal
  position: absolute
  top: 16px
  left: 16px
  width: 35px
  height: 35px
  font-size: 25px
  text-align: center
</style>
