<template>
    <div>
        <div class="breadcrumb-sec">
    <div class="container">
      <span class="breadcrumbs" v-for="(item, index) in items" :key="index" :class="{ active: index === items.length - 1 }">
        <router-link v-if="index !== items.length - 1" :to="item.url" class="parent-link">{{ item.label }}  </router-link><span v-else> / {{ item.label }}</span>
      </span>
    </div>
  </div>
    </div>
    </template>
    <script>
 export default {
   
    props: {
    items: {
      type: Array,
      required: true
    }
  }
  };
</script>