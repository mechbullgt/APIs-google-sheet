let a = ["11 May 2018","10 May 2018"];

function x (a){
    let y = (new Date(a).getTime());
    return y;
}

console.log('x(a) :', x(a));