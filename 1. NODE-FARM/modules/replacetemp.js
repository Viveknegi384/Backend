//every single file is actually the module by this we can exports the function as module to another file

module.exports= (temp,prod)=>{
    let output=temp.replace(/{%PRODUCTNAME%}/g,prod.productName);  //  ->  /.../g — means global search (replace all occurrences).if we not use this(uses -> '...') then it only replace first reoccurrence
    output=output.replace(/{%IMAGE%}/g ,prod.image);
    output=output.replace(/{%FROM%}/g ,prod.from);
    output=output.replace(/{%QUANTITY%}/g ,prod.quantity);
    output=output.replace(/{%PRICE%}/g ,prod.price);
    output=output.replace(/{%NUTRIENTS%}/g ,prod.nutrients);
    output=output.replace(/{%DESCRIPTION%}/g ,prod.description);
    output=output.replace(/{%ID%}/g ,prod.id);

    if (!prod.organic) output = output.replace(/{%NOT_ORGANIC%}/g,'not-organic');
    return output;
} 