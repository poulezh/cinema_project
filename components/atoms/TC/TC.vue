<template>
  <div class="countdown" :class="{ _loaded: loaded }">
    <div class="top-timer-img">
      <img src="/img/timer.webp" alt="" />
    </div>
    <div class="timer-in">
      <div class="timer-in-title">До повышения цен осталось</div>
      <div class="timer-in-timer">
        <div class="timer-in-timer-l">
          <div>05</div>
          <div>дней</div>
        </div>
        <div class="timer-in-dot">:</div>
        <div class="timer-in-timer-l">
          <div>08</div>
          <div>часов</div>
        </div>
        <div class="timer-in-dot">:</div>
        <div class="timer-in-timer-l">
          <div>32</div>
          <div>минуты</div>
        </div>
        <div class="timer-in-dot">:</div>
        <div class="timer-in-timer-l">
          <div>08</div>
          <div>секунд</div>
        </div>
      </div>
      <div class="timer-text">Успейте приобрести квартиру до 1 июня 2023</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loaded: true,
    };
  },
};
</script>

<style lang="stylus" scoped>
.countdown
    padding: 32px 55px;
    background: rgba(0,58,66,.7);
    -webkit-backdrop-filter: blur(15px);
    backdrop-filter: blur(15px);
    position: fixed;
    right: 0;
    top: 12%;
    z-index: 99;
    display: flex;
    gap: 30px;
    width: fit-content;
    transition: all 1s;
    transform: translateX(200%);

.countdown._loaded
    transform: translateX(0);

.timer-in-title
    font-family: Basis Grotesque Pro;
    font-style: normal;
    font-weight: 400;
    font-size: 22px;
    line-height: 28px;
    display: flex;
    align-items: center;
    text-align: center;
    color: #fff;
    margin-bottom: 10px;
.timer-in-timer
  gap: 18px
  display: flex
  margin-bottom: 10px
.timer-in-timer-l
    width: fit-content;
    min-width: 44px;
    max-width: 44px;
.timer-in-timer-l>div:first-child
    font-family: Basis Grotesque Pro;
    font-style: normal;
    font-weight: 400;
    font-size: 36px;
    line-height: 46px;
    text-align: center;
    color: #d9ecea;
.timer-in-timer-l>div:last-child
    font-family: Basis Grotesque Pro;
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 100%;
    text-align: center;
    color: hsla(0,0%,100%,.5);
.timer-in-dot
    font-family: Basis Grotesque Pro;
    font-style: normal;
    font-weight: 400;
    font-size: 24px;
    line-height: 187.5%;
    color: #fff;
.timer-text
    font-family: Basis Grotesque Pro;
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 18px;
    display: flex;
    align-items: center;
    text-align: center;
    color: #fff;
    flex: none;
    order: 2;
    flex-grow: 0;
</style>
