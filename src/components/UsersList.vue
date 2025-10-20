<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getUsers } from '@/services/user.service'
import type { User } from '@/types/api'

const users = ref<User[]>([])
const loading = ref(false)

const loadUsers = async () => {
  loading.value = true
  getUsers().then((data) => {
    users.value = data
    loading.value = false
  })
}

onMounted(() => {
  loadUsers()
})
</script>

<template>
  <div class="users-list">
    <div class="card">
      <div class="card__header">
        <div class="users-list__header flex flex--between flex--items-center">
          <h2 class="mb-0">Liste des utilisateurs</h2>
          <router-link to="/users/create" class="btn btn--primary">
            <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20">
              <path
                fill-rule="evenodd"
                d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                clip-rule="evenodd"
              />
            </svg>
            Ajouter un utilisateur
          </router-link>
        </div>
      </div>

      <div class="card__body p-0">
        <!-- État de chargement -->
        <div v-if="loading" class="users-list__loading flex flex--center py-3xl">
          <div class="loading loading--lg"></div>
          <span class="ml-md text--secondary">Chargement des utilisateurs...</span>
        </div>

        <!-- Liste des utilisateurs -->
        <div v-else-if="users.length > 0" class="users-list__table-wrapper">
          <table class="table">
            <thead class="table__header">
              <tr>
                <th class="table__head">ID</th>
                <th class="table__head">Nom complet</th>
                <th class="table__head">Email</th>
                <th class="table__head">Âge</th>
                <th class="table__head">Statut</th>
                <th class="table__head">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="user in users" :key="user.id" class="table__row">
                <td class="table__cell">
                  <span class="text--bold">#{{ user.id }}</span>
                </td>
                <td class="table__cell">
                  <div class="text--bold">{{ user.firstName }} {{ user.lastName }}</div>
                </td>
                <td class="table__cell">
                  <a :href="`mailto:${user.email}`" class="text--primary">
                    {{ user.email }}
                  </a>
                </td>
                <td class="table__cell">{{ user.age }} ans</td>
                <td class="table__cell">
                  <span :class="['badge', user.isActive ? 'badge--success' : 'badge--error']">
                    {{ user.isActive ? 'Actif' : 'Inactif' }}
                  </span>
                </td>
                <td class="table__cell">
                  <div class="users-list__actions">
                    <button class="btn btn--sm btn--secondary" title="Modifier l'utilisateur">
                      <svg width="16" height="16" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"
                        />
                      </svg>
                      Modifier
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- État vide -->
        <div v-else class="users-list__empty p-3xl text--center">
          <div class="text--muted mb-md">
            <svg
              width="64"
              height="64"
              fill="currentColor"
              viewBox="0 0 20 20"
              class="mx-auto mb-md"
            >
              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 class="text--muted mb-md">Aucun utilisateur trouvé</h3>
          <p class="text--secondary mb-lg">Commencez par créer votre premier utilisateur.</p>
          <router-link to="/users/create" class="btn btn--primary">
            Créer un utilisateur
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.users-list {
  max-width: var(--max-width-6xl);
  margin: 0 auto;
  padding: var(--spacing-xl) 0;

  &__table-wrapper {
    overflow-x: auto;

    @media (max-width: 768px) {
      .table__cell:nth-child(3),
      .table__cell:nth-child(4),
      .table__head:nth-child(3),
      .table__head:nth-child(4) {
        display: none;
      }
    }
  }

  &__actions {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
}

.btn--sm {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  white-space: nowrap;
}
</style>
