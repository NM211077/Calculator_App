export const sum=(a,b)=>{
    if (!b)return a;
    var r1,r2,m;
    try{r1=a.toString().split(".")[1].length}catch(e){r1=0}
    try{r2=b.toString().split(".")[1].length}catch(e){r2=0}
    m=Math.pow(10,Math.max(r1,r2));
    return (a*m+b*m)/m;
};

export const subtraction=(a,b)=>{
    console.log(b);
    if (!b)return a;
    var r1,r2,m;
    try{r1=a.toString().split(".")[1].length}catch(e){r1=0}
    try{r2=b.toString().split(".")[1].length}catch(e){r2=0}
    m=Math.pow(10,Math.max(r1,r2));
    return (a*m-b*m)/m;
};

export const multiply=(a,b)=>{
    if (!b)return a;
    return a*b;
};

export const division=(a,b)=>{
    if (!b)return a;
    if (b===0)return "You cannot divide by zero";
    var r1,r2,m;
    try{r1=a.toString().split(".")[1].length}catch(e){r1=0}
    try{r2=b.toString().split(".")[1].length}catch(e){r2=0}
    m=Math.pow(10,Math.max(r1,r2));
    return ((a*m)/(b*m))/m;
};
