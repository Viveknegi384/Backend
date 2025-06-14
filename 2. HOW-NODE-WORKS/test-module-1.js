// class Calculator{
//     add(a,b){
//         return a+b
//     }
    
//     mutiply(a,b){
//         return a*b
//     }
//     divide(a,b){
//         return a/b
//     }

// }

// module.exports = Calculator;
//in replace of above we can also do below one (as ham single value export kar rhe h i.e. class)
module.exports = class {
    add(a,b){
        return a+b
    }
    
    mutiply(a,b){
        return a*b
    }
    divide(a,b){
        return a/b
    }

}
