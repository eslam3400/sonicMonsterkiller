$('#playerNameModal').modal('show')
let setPlayerName = () => {
    if ($('#playerName').val() == '') sessionStorage.setItem('sonic__playerName', 'Player1')
    else sessionStorage.setItem('sonic__playerName', $('#playerName').val())
    $('#playerNameModal').modal('hide')
    console.log(sessionStorage.getItem('sonic__playerName'))
}
const game = Vue.createApp({
    data() {
        return {
            playerName: null,
            playerAttDmg: Math.floor(Math.random() * 20),
            playerHealth: 100,
            monsterAttDmg: Math.floor(Math.random() * 15),
            monsterHealth: 100
        }
    },
    watch: {
        playerHealth() {
            if (this.playerHealth <= 0) {
                alert('You lost :(')
                this.resetGame()
            }
        },
        monsterHealth() {
            if (this.monsterHealth <= 0) {
                alert('You won :D')
                this.resetGame()
            }
        }
    },
    methods: {
        attackMonster() {
            this.monsterHealth -= this.playerAttDmg
            this.attackplayer()
        },
        attackplayer() {
            this.playerHealth -= this.monsterAttDmg
        },
        resetGame() {
            this.playerName = null
            this.playerAttDmg = Math.floor(Math.random() * 20)
            this.playerHealth = 100
            this.monsterAttDmg = Math.floor(Math.random() * 15)
            this.monsterHealth = 100
        },
    },
    computed: {
        getPlayerName() {
            this.playerName = sessionStorage.getItem('sonic__playerName')
        }
    }
}).mount('#appContainer__app')