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
            playerHealthBar: "<div class='progress-bar progress-bar-striped progress-bar-animated bg-success' \
                role='progressbar' style='width:100%' aria-valuenow='100' aria-valuemin='0' \
                aria-valuemax='100'>100</div>",
            monsterAttDmg: Math.floor(Math.random() * 15),
            monsterHealth: 100,
            monsterHealthBar: "<div class='progress-bar progress-bar-striped progress-bar-animated bg-success' \
                role='progressbar' style='width:100%' aria-valuenow='100' aria-valuemin='0' \
                aria-valuemax='100'>100</div>"
        }
    },
    watch: {
        playerHealth() {
            this.playerHealthBar = "<div class='progress-bar progress-bar-striped progress-bar-animated bg-success' \
                role='progressbar' style='width:" + this.playerHealth + "%' aria-valuenow='" + this.playerHealth + "' aria-valuemin='0' \
                aria-valuemax='100'>" + this.playerHealth + "</div>"
            if (this.playerHealth <= 0) {
                alert('You lost :(')
                this.resetGame()
            }
        },
        monsterHealth() {
            this.monsterHealthBar = "<div class='progress-bar progress-bar-striped progress-bar-animated bg-success' \
                role='progressbar' style='width:" + this.monsterHealth + "%' aria-valuenow='" + this.monsterHealth + "' aria-valuemin='0' \
                aria-valuemax='100'>" + this.monsterHealth + "</div>"
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
            this.playerHealthBar = "<div class='progress-bar progress-bar-striped progress-bar-animated bg-success' \
                role='progressbar' style='width:100%' aria-valuenow='100' aria-valuemin='0' \
                aria-valuemax='100'>100</div>"
            this.monsterAttDmg = Math.floor(Math.random() * 15)
            this.monsterHealth = 100
            this.monsterHealthBar = "<div class='progress-bar progress-bar-striped progress-bar-animated bg-success' \
                role='progressbar' style='width:100%' aria-valuenow='100' aria-valuemin='0' \
                aria-valuemax='100'>100</div>"
        },
    },
        computed: {
            getPlayerName() {
                this.playerName = sessionStorage.getItem('sonic__playerName')
            }
        }
    }).mount('#appContainer__app')