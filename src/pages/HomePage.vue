<script setup lang="ts">
import UsersList from '@/components/UsersList.vue'
</script>

<template>
  <div class="home-page">
    <div class="container py-xl">
      <div class="home-page__header flex flex--between flex--items-center mb-xl">
        <div>
          <h1 class="mb-sm">Gestion des utilisateurs</h1>
          <p class="text--secondary mb-0">Gérez les utilisateurs de votre application</p>
        </div>
      </div>

      <UsersList />
    </div>
  </div>
</template>

<style scoped lang="scss">
.home-page {
  min-height: 100vh;
}
</style>
