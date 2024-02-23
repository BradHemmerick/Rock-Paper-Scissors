<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { gameLogic } from './gameLogic'

const { wins, draws, losses, choice, computerChoice, verdict, play, winPercentage, resetRound } = gameLogic()

onMounted(() => {
  window.addEventListener('keypress', (e) => {
    if (e.key === 'r') {
      resetRound()
    }
  })
})

watch([wins, draws, losses], () => {
  localStorage.setItem('wins', wins.value)
  localStorage.setItem('draws', draws.value)
  localStorage.setItem('losses', losses.value)
}, { deep: true })
</script>

<template>
	<div class="bg-gray-700 text-white text-center min-h-screen flex flex-col">
		<header class="container mx-auto p-6">
			<h1 class="text-4xl font-bold">Rock, Paper, Scissors!</h1>
		</header>

		<main class="container mx-auto p-6 flex-1">
			<div v-if="choice === null" class="flex items-center justify-center -mx-6">

				<button @click="play('rock')"
					class="bg-white rounded-full shadow-lg w-64 p-12 mx-6 transition-colors duration-300 hover:bg-pink-500">
					<img src="./assets/RockIcon.png" alt="Rock" class="w-full" />
				</button>

				<button @click="play('paper')"
					class="bg-white rounded-full shadow-lg w-64 p-12 mx-6 transition-colors duration-300 hover:bg-green-500">
					<img src="./assets/PaperIcon.svg" alt="Paper" />
				</button>

				<button @click="play('scissors')"
					class="bg-white rounded-full shadow-lg w-64 p-12 mx-6 transition-colors duration-300 hover:bg-yellow-500">
					<img src="./assets/ScissorsIcon.svg" alt="Scissors" />
				</button>

			</div>

			<div v-else>
				<div class="text-3xl mb-4">
					You picked <span class="text-pink-500">{{ choice }}</span>
				</div>
				<div class="text-3xl mb-4">
					The computer picked <span class="text-green-500">{{ computerChoice }}</span>
				</div>
				<div class="text-6xl mb-12">
					{{ verdict }}
				</div>

				<button @click="resetRound" class="bg-pink-500 text-lg py-2 px-4">Reset</button>
			</div>

			<div class="mt-12 text-3xl mb-4">{{ wins }} : {{ draws }} : {{ losses }}</div>

			<div class="text-lg">Win rate: {{ Math.round(winPercentage) }}%</div>
		</main>

		<footer class="container mx-auto p-6">
		</footer>
	</div>
</template>

<style></style>