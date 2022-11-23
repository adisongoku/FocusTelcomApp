<template>
<div>
 <div class="header clearfix" >
   Zadzwonimy do Ciebie w ciągu 26 sekund.
 </div>
 <label class="form-label clearfix"  for="form-number">
   Wprowadź numer
 </label>
 <input v-model="number"
  class="form-number clearfix"  id="form-number"/>
 <div class="call-button"  @click="call()">
   Zadzwoń teraz
 </div>
</div>
</template>