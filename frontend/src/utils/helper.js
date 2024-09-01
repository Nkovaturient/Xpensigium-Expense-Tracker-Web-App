

export const calcPercent=(value, total)=>{
   return Math.round((value/total)*100);
} 

export const calcSum=(data)=>{
    const value=data.reduce((acc, curr)=> acc+curr, 0);
   return value;
}