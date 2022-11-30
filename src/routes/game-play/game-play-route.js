module.exports = {
    testfunction: function(){return test1();},
    aaa: function(str){return test2(str);}
};

function test1(){
    console.log(111111111111133333333333333);
    return test2('test1');
}

function test2(str){
    return 'test2' + str;
}