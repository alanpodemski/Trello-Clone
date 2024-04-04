<script setup>
import { useBoardStore } from '~/stores/boardStore';

const boardStore = useBoardStore();
const route = useRoute();
const router = useRouter();

const task = computed(() => {
    return boardStore.getTask(route.params.id);
});

function deleteTask() {
    boardStore.deleteTask(route.params.id);
    router.push('/');
}
</script>

<template>
  <div class="task-wrapper">
    <div class="task-view">
        <section v-if="task" class="w-full">
          <UFormGroup label="Name" class="w-full mb-4">
          <UInput type="text" v-model="task.name"></UInput>
          </UFormGroup>
          <UFormGroup label="Description" class="w-full mb-4">
            <UTextarea v-model="task.description"></UTextarea>
          </UFormGroup>
          <UButton 
              icon="i-heroicons-trash" 
              color="red"
              @click="deleteTask(taskIndex)">
              Delete task
          </UButton>
        </section>
        <section v-else class="w-full">
          <p>Task not found</p>
        </section>
    </div>
  </div>
</template>

<style scoped>
</style>