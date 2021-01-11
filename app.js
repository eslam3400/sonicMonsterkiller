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
            playerHealth: 100,
            monsterHealth: 100,
            battelStatus: null,
            battelLog: []
        }
    },
    watch: {
        playerHealth() {
            if (this.playerHealth <= 0) {
                alert('You lost :(')
                this.battelStatus = 'ended'
            }
        },
        monsterHealth() {
            if (this.monsterHealth <= 0) {
                alert('You won :D')
                this.battelStatus = 'ended'
            }
        }
    },
    methods: {
        attackMonster() {
            let dmg = Math.floor(Math.random() * 20)
            this.monsterHealth -= dmg
            this.addBattelLog(sessionStorage.getItem('sonic__playerName'),'attacked',dmg)
            this.attackplayer()
        },
        attackplayer() {
            let dmg = Math.floor(Math.random() * 20)
            this.addBattelLog('Monster','attacked',dmg)
            this.playerHealth -= dmg
        },
        addBattelLog(who,what,amount){
            this.battelLog.push({who,what,amount})
        },
        resetGame() {
            this.playerName = null
            this.playerHealth = 100
            this.monsterHealth = 100
            this.battelLog = []
            this.battelStatus = null
        }
    },
    computed: {
        playerHealthBar(){
            return {width: this.playerHealth + "%"}
        },
        playerHealthBarColor(){
            if (this.playerHealth <= 20) return {'bg-danger':true}
            else if (this.playerHealth <= 50) return {'bg-warning':true}
            else return {'bg-success':true}
        },
        monsterHealthBar(){
            return {width: this.monsterHealth + "%"}
        },
        monsterHealthBarColor(){
            if (this.monsterHealth <= 20) return {'bg-danger':true}
            else if (this.monsterHealth <= 50) return {'bg-warning':true}
            else return {'bg-success':true}
        }
    }
}).mount('#appContainer__app')