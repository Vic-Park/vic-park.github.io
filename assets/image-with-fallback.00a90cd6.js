import{_ as t}from"./vic-park-logo.e00cf530.js";import{_ as n}from"./index.9191619c.js";import{d as l,q as i,o as d,c as m,E as o,m as p,a as c}from"./vendor.25d481dc.js";const f=l({inheritAttrs:!1,props:{src:{type:String,required:!0},alt:{type:String,required:!0}},setup(){const r=i(!1);function e(a){a.preventDefault(),r.value=!0}return{onImageLoadError:e,imageLoadFailed:r}}}),u=["src","alt"],g=["alt"];function k(r,e,a,$,E,v){return r.imageLoadFailed?p(r.$slots,"fallback",{key:1},()=>[c("img",o({src:t,alt:r.alt},r.$attrs),null,16,g)]):(d(),m("img",o({key:0,src:r.src,alt:r.alt},r.$attrs,{onError:e[0]||(e[0]=(...s)=>r.onImageLoadError&&r.onImageLoadError(...s))}),null,16,u))}var y=n(f,[["render",k]]);export{y as I};
