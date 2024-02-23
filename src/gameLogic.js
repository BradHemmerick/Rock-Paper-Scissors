import { ref, computed } from 'vue'

const CHOICES = ['rock', 'paper', 'scissors']
const OUTCOMES = {
  'rock': { 'rock': 'draw', 'paper': 'loss', 'scissors': 'win' },
  'paper': { 'rock': 'win', 'paper': 'draw', 'scissors': 'loss' },
  'scissors': { 'rock': 'loss', 'paper': 'win', 'scissors': 'draw' }
}

export function gameLogic() {
  const wins = ref(0)
  const draws = ref(0)
  const losses = ref(0)
  const choice = ref(null)
  const computerChoice = ref(null)
  const verdict = ref(null)

  const play = (playerChoice) => {
    choice.value = playerChoice
    computerChoice.value = CHOICES[Math.floor(Math.random() * CHOICES.length)]
    const outcome = OUTCOMES[choice.value][computerChoice.value]
    if (outcome === 'win') {
      wins.value++
      verdict.value = 'You win!'
    } else if (outcome === 'loss') {
      losses.value++
      verdict.value = 'You Lose!'
    } else {
      draws.value++
      verdict.value = 'It\'s a draw'
    }
  }

  const winPercentage = computed(() => {
    const total = wins.value + draws.value + losses.value
    return total ? (wins.value / total) * 100 : 0
  })

  const resetRound = () => {
    choice.value = null
    computerChoice.value = null
    verdict.value = null
  }

  const loadGame = () => {
    wins.value = parseInt(localStorage.getItem('wins')) || 0
    draws.value = parseInt(localStorage.getItem('draws')) || 0
    losses.value = parseInt(localStorage.getItem('losses')) || 0
  }

  loadGame()

  return { wins, draws, losses, choice, computerChoice, verdict, play, winPercentage, resetRound }
}
