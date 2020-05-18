<template>
  <div class="q-pa-md row justify-center">
    <q-card
      cols="10"
      v-touch-pan.prevent.mouse="handlePan"
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
      <q-toggle
        cols="2"
        v-model="showInfo"
        checked-icon="check"
        color="primary"
        unchecked-icon="clear"
        label="Show meta"
      />
      <q-slider label v-model="sensitivity" :min="1" :max="10" />
      <q-badge style="height: 26px; font-size: 14px;" color="primary">
        Sensitivity: {{ sensitivity }} (1 to 10)
      </q-badge>
    

    </div>

  </div>
</template>

<script>
import socket from "../utils/socket";
import { throttle } from "lodash";
// Module
import nipplejs from "nipplejs";
export default {
  data() {
    return {
      info: null,
      panning: false,
      sensitivity: 2,
      showInfo: false
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
    }
  },

  mounted() {
    var joysticks = {
      static: {
        zone: document.querySelector(".zone.static"),
        mode: "static",
        position: {
          left: "50%",
          top: "50%"
        },
        color: "blue"
      }
    };
    let joystick;
    let evt = "static";

    var type =
      typeof evt === "string" ? evt : evt.target.getAttribute("data-type");
    if (joystick) {
      joystick.destroy();
    }
    joystick = nipplejs.create(joysticks[type]);
    //bindNipple();
  }
};
</script>

<style lang="sass" scoped>
.custom-area
  width: 90%
  height: 480px
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
