<script setup>
import { ref } from "vue";

defineProps({
  user: {
    type: Object,
    required: true,
  },
});

const tampilkanDetail = ref(false);
</script>

<template>
  <li class="user-card">
    <div class="user-info">
      <strong>{{ user.name }}</strong>
      <span>{{ user.email }}</span>
    </div>

    <!-- Tombol toggle detail -->
    <button @click="tampilkanDetail = !tampilkanDetail" class="btn-detail">
      {{ tampilkanDetail ? "Sembunyikan" : "Lihat Detail" }}
    </button>

    <!-- Data tambahan -->
    <div v-if="tampilkanDetail" class="detail-container">
      <p><strong>Telepon:</strong> {{ user.phone }}</p>
      <p><strong>Perusahaan:</strong> {{ user.company?.name }}</p>
      <p><strong>Kota:</strong> {{ user.address?.city }}</p>
    </div>
  </li>
</template>

<style scoped>
.user-card {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  border-bottom: 1px solid #e0e0e0;
}

.user-info {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.btn-detail {
  align-self: flex-start;
  padding: 0.25rem 0.6rem;
  font-size: 0.85rem;
  cursor: pointer;
  border: 1px solid #0b4f6c;
  background-color: transparent;
  color: #0b4f6c;
  border-radius: 4px;
}

.btn-detail:hover {
  background-color: #f0f7fa;
}

.detail-container {
  margin-top: 0.5rem;
  padding: 0.6rem 0.8rem;
  background-color: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 6px;
  font-size: 0.875rem;
  color: #e0e0e0;
}

.detail-container p {
  margin: 0.25rem 0;
}
</style>