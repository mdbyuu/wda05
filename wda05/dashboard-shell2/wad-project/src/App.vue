<script setup>
import { ref, computed, watch } from "vue";
import UserCard from "./components/UserCard.vue";

const judul = "Dashboard Vue - Pertemuan 5";
const users = ref([]);
const keadaan = ref("idle");

async function muatPengguna() {
  keadaan.value = "loading";
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    if (!response.ok) {
      throw new Error("Status HTTP: " + response.status);
    }
    const data = await response.json();
    if (data.length === 0) {
      keadaan.value = "empty";
      return;
    }
    users.value = data;
    keadaan.value = "success";
  } catch (error) {
    console.error("Gagal memuat data:", error);
    keadaan.value = "error";
  }
}
// --- pindah ke sini, LUAR fungsi ---
const queryPencarian = ref("");
const riwayatPencarian = ref([]);

const penggunaTersaring = computed(() => {
  const q = queryPencarian.value.toLowerCase().trim();
  if (!q) return users.value;
  return users.value.filter((user) =>
    user.username.toLowerCase().includes(q)
  );
});

watch(queryPencarian, (nilaiBaru) => {
  if (nilaiBaru.trim() !== "") {
    riwayatPencarian.value.push(nilaiBaru);
  }
});

// --- State Arah Urutan ---
const arahUrutan = ref("asc"); // 'asc' atau 'desc'

// Chained computed untuk mengurutkan penggunaTersaring berdasarkan nama
const penggunaTerurut = computed(() => {
  // Salin array dengan spread operator agar tidak me-mutate data penggunaTersaring
  return [...penggunaTersaring.value].sort((a, b) => {
    const perbandingan = a.name.localeCompare(b.name);
    return arahUrutan.value === "asc" ? perbandingan : -perbandingan;
  });
});
</script>

<template>
  <header class="app-header">
    <h1>{{ judul }}</h1>
  </header>

<main class="app-main">
  <button @click="muatPengguna">Muat Pengguna</button>
  <input v-model="queryPencarian" type="text" placeholder="Cari username..." />

  <!-- Tombol Kontrol Sortir -->
   <div class="sort-buttons"> 
    <button
      :class="{ active: arahUrutan === 'asc'}"
      @click="arahUrutan = 'asc'"
    >
      Urutkan A-Z
    </button>
    <button
      :class="{ active: arahUrutan === 'desc'}"
      @click="arahUrutan = 'desc'"
    >
      Urutkan Z-A
    </button>
  </div>

  <p v-if="keadaan === 'loading'">Memuat data...</p>
  <p v-else-if="keadaan === 'empty'">Tidak ada pengguna ditemukan.</p>
  <p v-else-if="keadaan === 'error'">Gagal memuat data. Coba lagi.</p>

  <ul v-else-if="keadaan === 'success'">
    <!-- v-for membaca hasil chained computed penggunaTerurut -->
    <UserCard
      v-for="user in penggunaTerurut"
      :key="user.id"
      :user="user"
    />
  </ul>
  </main>
</template>

<style scoped>
.app-header {
  padding: 1.5rem;
  background: #0b4f6c;
  color: white;
}
.app-main {
  padding: 1.5rem;
}
.controls-bar {
  display: flex;
  gap: 0.75rem;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 1.25rem;
}
.sort-buttons {
  display: flex;
  gap: 0.35rem;
}
.sort-buttons button {
  padding: 0.35rem 0.75rem;
  border: 1px solid #0b4f6c;
  background-color: transparent;
  color: inherit;
  cursor: pointer;
  border-radius: 4px;
  font-size: 0.85rem;
}
.sort-buttons button.active {
  background-color: #0b4f6c;
  color: white;
  font-weight: bold;
}
</style>
