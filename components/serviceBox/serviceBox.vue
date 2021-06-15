<template>
	<button class="service-box" open-type="contact"></button>
</template>

<script>
	export default {
		name:"serviceBox",
		data() {
			return {
				
			};
		}
	}
</script>

<style>
.service-box {
  position: fixed;
  right: 20rpx;
  bottom: 200rpx;
  z-index: 88;
  width: 146rpx;
  height: 134rpx;
  padding-bottom: env(safe-area-inset-bottom);
  background: url(https://vkceyugu.cdn.bspapp.com/VKCEYUGU-a8f14610-3d69-42cf-8b7c-464a63a1b080/22429d3b-c50f-4b94-b563-82d276ceb992.png)
    no-repeat center/contain;
}
</style>
