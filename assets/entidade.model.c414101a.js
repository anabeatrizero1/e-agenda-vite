var s=Object.defineProperty;var d=(t,r,o)=>r in t?s(t,r,{enumerable:!0,configurable:!0,writable:!0,value:o}):t[r]=o;var a=(t,r,o)=>(d(t,typeof r!="symbol"?r+"":r,o),o);class n{gerarNovoId(){const r=Date.now().toString(36),o=Math.random().toString(36).substring(2,8);return`${r}-${o}`}}class i{constructor(){a(this,"id",new n().gerarNovoId());this.id=new n().gerarNovoId()}}export{i as E};