
let n = 7;
let nguyento = true;


if(n <2){
    nguyento = false;
}

for(let i = 2; i <= n; i++){
    if(n % i === 0){
        nguyento = false;
        break;
   }
   if(nguyento){
    console.log("la so nguyen to");
   }else{
    console.log("khong phai so nguyen to")
   }
}
