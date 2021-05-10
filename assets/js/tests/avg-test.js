describe("avg", function() {

  describe("возвращает среднее арифметическое 2-х чисел", function(){

    function check(a,b){
      let result = Math.ceil((a + b) / 2);

      it(`среднее арифметическое чисел ${a} и ${b} = ${result}`, function() {
        assert.equal(avg(a,b), result);
      });
    }

    for(let i = 0; i < 7; i++){
      let a = Math.floor(Math.random() * 11), 
          b = Math.floor(Math.random() * 16);
        check(a,b);
    }

  });
  
});

mocha.run();