class Visualizer {
   constructor(pi, digitsToRead) {
      this.pi = pi;
      this.piDigits = pi[0].length;
      this.index = 0;
      this.digitsToRead = digitsToRead;
      this.digits = [];
   }

   getNewDigitsFromPi(shiftValues) {
      var newDigitsAvailable = false;

      if (this.index < this.piDigits) {
         newDigitsAvailable = true;

         if (this.digits.length == 0) {
            this.fillDigitsArray();
         } else if (shiftValues) {
            this.index += 1;
            this.digits.shift()
            this.digits.push(pi[0][this.index]);
         } else {
            this.digits = []
            this.fillDigitsArray();
         }
      }

      return newDigitsAvailable;
   }

   fillDigitsArray() {
      for (let i = 0; i < this.digitsToRead; i++) {
         this.digits.push(pi[0][this.index + i]);
      }
      this.index += this.digitsToRead;
   }

   getJoinedDigitsAsString() {
      return join(this.digits, "");
   }
}