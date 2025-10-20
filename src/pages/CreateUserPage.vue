<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { createUser } from '@/services/user.service'

const router = useRouter()

// État du formulaire
const formData = ref({
  firstName: '',
  lastName: '',
  email: '',
  age: 25,
  isActive: true,
})

const loading = ref(false)

const handleSubmit = () => {
  loading.value = true
  createUser(formData.value)
    .then(() => {
      router.push('/')
    })
    .catch((err) => {
      console.error('Erreur lors de la création:', err)
    })
    .finally(() => {
      loading.value = false
    })
}
</script>

<template>
  <div class="create-user">
    <div class="container py-xl">
      <div class="card">
        <div class="card__header">
          <h1 class="mb-0">Créer un utilisateur</h1>
          <p class="text--secondary mt-sm mb-0">
            Remplissez le formulaire ci-dessous pour créer un nouvel utilisateur.
          </p>
        </div>

        <div class="card__body">
          <form @submit.prevent="handleSubmit" class="create-user__form" novalidate>
            <div class="grid grid--cols-2">
              <!-- Prénom -->
              <div class="form__group">
                <label for="firstName" class="form__label">Prénom *</label>
                <input
                  id="firstName"
                  v-model="formData.firstName"
                  type="text"
                  class="form__input"
                  placeholder="Entrez le prénom"
                  required
                />
              </div>

              <!-- Nom -->
              <div class="form__group">
                <label for="lastName" class="form__label">Nom *</label>
                <input
                  id="lastName"
                  v-model="formData.lastName"
                  type="text"
                  class="form__input"
                  placeholder="Entrez le nom de famille"
                  required
                />
              </div>
            </div>

            <!-- Email -->
            <div class="form__group">
              <label for="email" class="form__label">Adresse email *</label>
              <input
                id="email"
                v-model="formData.email"
                type="email"
                class="form__input"
                placeholder="utilisateur@exemple.com"
                required
              />
            </div>

            <div class="grid grid--cols-2">
              <!-- Âge -->
              <div class="form__group">
                <label for="age" class="form__label">Âge *</label>
                <input
                  id="age"
                  v-model.number="formData.age"
                  type="number"
                  min="18"
                  max="120"
                  class="form__input"
                  placeholder="25"
                  required
                />
                <div class="form__help">Entre 18 et 120 ans</div>
              </div>

              <!-- Statut actif -->
              <div class="form__group">
                <label class="form__label">Statut</label>
                <div class="flex flex--items-center mt-sm">
                  <input id="isActive" v-model="formData.isActive" type="checkbox" class="mr-sm" />
                  <label for="isActive" class="create-user__checkbox-label">
                    Utilisateur actif
                  </label>
                </div>
                <div class="form__help">Les utilisateurs inactifs ne peuvent pas se connecter</div>
              </div>
            </div>

            <!-- Actions -->
            <div class="create-user__actions flex flex--between flex--items-center mt-2xl">
              <router-link to="/" class="btn btn--secondary">
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fill-rule="evenodd"
                    d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                    clip-rule="evenodd"
                  />
                </svg>
                Retour à la liste
              </router-link>

              <button type="submit" class="btn btn--primary" :disabled="loading">
                <div v-if="loading" class="loading mr-sm"></div>
                <svg v-else width="20" height="20" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fill-rule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clip-rule="evenodd"
                  />
                </svg>
                Créer l'utilisateur
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.create-user {
  min-height: 100vh;

  &__form {
    max-width: var(--max-width-2xl);
    margin: 0 auto;
  }

  &__checkbox-label {
    cursor: pointer;
  }

  &__actions {
    @media (max-width: 768px) {
      flex-direction: column;
      gap: var(--spacing-md);

      .btn {
        width: 100%;
        justify-content: center;
      }
    }
  }
}

// Style pour les checkboxes
input[type='checkbox'] {
  width: 1.25rem;
  height: 1.25rem;
  accent-color: var(--color-primary);
  cursor: pointer;
}

// Responsive pour le grid
@media (max-width: 768px) {
  .grid--cols-2 {
    grid-template-columns: 1fr;
  }
}
</style>
