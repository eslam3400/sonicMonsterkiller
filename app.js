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
            playerEnergy: 0, 
            monsterHealth: 100,
            monsterEnergy: 0,
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
        },
        monsterEnergy(){
            if (this.monsterEnergy >= 100) {
                let randomChoies = Math.floor(Math.random() * 2)
                if( randomChoies == 0 ) this.monsterHeal()
                else this.monsterSpecialAtt()
            }
        }
    },
    methods: {
        attackMonster() {
            let dmg = Math.floor(Math.random() * 10)
            this.monsterHealth -= dmg
            this.addBattelLog(sessionStorage.getItem('sonic__playerName'),'attacked',dmg)
            if (this.monsterHealth > 0) this.attackplayer()
            this.playerEnergy += Math.floor(Math.random() * 20)
        },
        attackplayer() {
            let dmg = Math.floor(Math.random() * 10)
            this.addBattelLog('Monster','Attacked',dmg)
            this.playerHealth -= dmg
            this.monsterEnergy += Math.floor(Math.random() * 20)
        },
        addBattelLog(who,what,amount){
            this.battelLog.push({who,what,amount})
        },
        playerHeal(){
            let heal = Math.floor(Math.random() * 15)
            this.playerHealth += heal
            this.addBattelLog(sessionStorage.getItem('sonic__playerName'),'Healed',heal)
            this.playerEnergy = 0
        },
        monsterHeal(){
            let heal = Math.floor(Math.random() * 15)
            this.monsterHealth += heal
            this.addBattelLog('Monster','Healed',heal)
            this.monsterEnergy = 0
        },
        playerSpecialAtt(){
            let specialAttack = Math.floor(Math.random() * 10) + Math.floor(Math.random() * 10)
            this.monsterHealth -= specialAttack
            this.addBattelLog(sessionStorage.getItem('sonic__playerName'),'Special Attack',specialAttack)
            this.playerEnergy = 0
        },
        monsterSpecialAtt(){
            let specialAttack = Math.floor(Math.random() * 10) + Math.floor(Math.random() * 10)
            this.playerHealth -= specialAttack
            this.addBattelLog('Monster','Special Attack',specialAttack)
            this.monsterEnergy = 0
        },
        resetGame() {
            this.playerName = null
            this.playerHealth = 100
            this.monsterHealth = 100
            this.battelLog = []
            this.battelStatus = null
            this.playerEnergy =  0 
            this.monsterEnergy =  0
        }
    },
    computed: {
        playerHealthBar(){
            return {width: this.playerHealth + "%"}
        },
        playerEnergyBar(){
            return {width: this.playerEnergy + "%"}
        },
        playerHealthBarColor(){
            if (this.playerHealth <= 20) return {'bg-danger':true}
            else if (this.playerHealth <= 50) return {'bg-warning':true}
            else return {'bg-success':true}
        },
        monsterHealthBar(){
            return {width: this.monsterHealth + "%"}
        },
        monsterEnergyBar(){
            return {width: this.monsterEnergy + "%"}
        },
        monsterHealthBarColor(){
            if (this.monsterHealth <= 20) return {'bg-danger':true}
            else if (this.monsterHealth <= 50) return {'bg-warning':true}
            else return {'bg-success':true}
        }
    }
}).mount('#appContainer__app')