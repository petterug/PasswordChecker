<script>
  export default {
    name: 'PasswordCheckerView',
    components: {
    },
    data() {
      return {
        totalScore: 0,
        password: '',
        num: {
          exess: 0,
          upper: 0,
          numbers: 0,
          symbols: 0, 
        },
        minimumLength: 8,
        baseScore : 50,
        bonus: {
          excess: 3,
          upperCase: 4,
          numbers: 5,
          symbols: 5,
        },
        message: '',

      }
    },
    methods: {
    },
    computed: {

      UpperCaseBonus() {
        this.num.upper = 0;
        for (const char in this.password) {
          if (this.password[char].match(/[A-ZÆØÅ]/g)) {
            this.num.upper++;
          }
        }
        return this.num.upper * this.bonus.upperCase;
      },

      LowerCase() {
        if(this.password.match(/^[\sa-z]+$/g)) {
          return -15
        }
        return 0
      },

      OnlyNumbers() {
        if(this.password.match(/^[\s0-9]+$/g)) {
          return -35
        }
        return 0
      },

      BaseScore() {
        return this.password.length >= this.minimumLength ? this.baseScore : 0;
      },

      LengthBonus() {
        if (this.password.length > this.minimumLength) {
          return (this.password.length - this.minimumLength) * this.bonus.excess;
        }
        return 0;
      },

      NumberBonus() {
        this.num.numbers = 0;
        for (const char in this.password) {
          if (this.password[char].match(/[0-9]/g)) {
            this.num.numbers++;
          }
        }
        return this.num.numbers * this.bonus.numbers;
      },

      SymbolBonus() {
        this.num.symbols = 0;
        for (const char in this.password) {
          if (this.password[char].match(/[^a-zA-Z0-9]/g)) {
            this.num.symbols++;
          }
        }
        return this.num.symbols * this.bonus.symbols;
      },

      ComboBonus() {
        if ( this.num.upper > 0 && this.num.symbols > 0 && this.num.numbers > 0) {
          return 35
        } else if (this.num.upper > 0 && this.num.symbols > 0 || this.num.upper > 0 && this.num.numbers > 0 || this.num.symbols > 0 && this.num.numbers > 0) {
          return 25
        } else {
          return 0;
        }
      },

      RepeatingPattern() {
        if( (/([a-z0-9]{3,})\1/.test(this.password))) {
          return -50
        } else {
          return 0
        }
      },

      TotalScore() {
        return this.BaseScore + this.LengthBonus + this.UpperCaseBonus + this.NumberBonus + this.SymbolBonus + this.LowerCase + this.OnlyNumbers + this.ComboBonus + this.RepeatingPattern;
      }
    }
  }
</script>

<template>
  <main>
  <div id="container">
    <h1>A simple password strength checker</h1>
    <p>Type in your password to get visual feedback regarding the strength of your password.</p>
    
    <div class="block">
      <input v-model="password" />
      <p v-if="password.length < minimumLength">PASSWORD TOO SHORT</p>
      <p v-if="password.length >= minimumLength && TotalScore < 50" class="weak default">WEAK</p>
      <p v-if="TotalScore >= 50 && TotalScore < 75" class="strong default">AVERAGE</p>
      <p v-if="TotalScore >= 75&& TotalScore < 100" class="stronger default">STRONG</p>
      <p v-if="TotalScore >= 100" class="strongest default">SECURE</p>
    </div>
    <div class="block">
    <div id="results" class="default">Breakdown of points</div>
    <div id="details"></div>
    <p class="message"></p>
  </div>
  </div>
    
    <div class="block">
      <div>Base Score: {{ BaseScore }}</div>
      <div>Length Bonus: {{ LengthBonus }} 
        [<span v-if="this.password.length >= minimumLength">{{ this.password.length - minimumLength }}</span>
        <span v-else>0</span>x{{ bonus.excess }}]
      </div>
      <div>Uppercase Bonus: {{ UpperCaseBonus }}[{{ num.upper}}X{{ bonus.upperCase }}]</div>
      <div>Number Bonus: {{ NumberBonus }}[{{ num.numbers}}X{{ bonus.numbers }}]</div>
      <div>Symbol Bonus: {{ SymbolBonus }}[{{ num.symbols}}X{{ bonus.symbols }}]</div>
      <div>Combination Bonus: {{ ComboBonus }} </div>
      <div>Lowercase only penalty: {{ LowerCase }}</div>
      <div>Numbers only penalty: {{ OnlyNumbers }}</div>
      <div>Repeating pattern penalty: {{ RepeatingPattern }}</div>
      <div>Total Score:
        <span v-if="this.password.length < minimumLength">0</span>
        <span v-else>
          <!-- {{ BaseScore + LengthBonus + UpperCaseBonus + NumberBonus + SymbolBonus + LowerCase + OnlyNumbers + ComboBonus + RepeatingPattern }} -->
          {{ TotalScore }}
        </span>
      </div>
    </div>

  </main>
</template>

<style>
input {
  width: 400px;
  margin: 2rem 0 0.1rem 0;
  padding: 0.2rem;
  font-size: 1.5rem;
  font-family: "Lato";
  outline: none;
  border: none;
  border-bottom: 2px solid black;
}
#container {
  width: 800px;
  margin: 0 auto;
  padding: 50px 0 0 0;
}
.block {
  width: 400px;
  margin: 0 auto;
}
#complexity,
#results {
  width: 400px;
  padding: 3px 0;
  height: 40px;
  color: #000;
  font-size: 1.25rem;
  text-align: center;
  color: white;
  font-weight: bold;
}
div#complexity {
  width: fit-content;
  padding: 0.1rem 0.5rem;
  font-size: 1rem;
  text-transform: uppercase;
}
#results {
  margin: 30px 0 20px 0;
}

.default {
  background-color: black;
}
.weak {
  background-color: #C62828;
  color: white;
}
.strong {
  background-color: #FF8F00;
  color: white;
}
.stronger {
  background-color: #1976D2;
  color: white;
}
.strongest {
  background-color: #388E3C;
  color: white;
}
span.value {
  font-weight: bold;
  float: right;
}
p.message {
  color: red;
  font-weight: bold;
}
</style>