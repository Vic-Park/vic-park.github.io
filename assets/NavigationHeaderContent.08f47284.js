import{d as t,r as e,o,c as r,t as s,m as l,a,F as i,k as n}from"./vendor.838b1b71.js";var d=t({props:{title:{type:String,required:!0},toId:{type:String,default:""},route:{type:String,default:""}},setup:t=>({scrollToId:function(){document.getElementById(t.toId).scrollIntoView({behavior:"smooth"})}})});const u={class:"text-white text-lg hover:text-blue-400"};d.render=function(t,i,n,d,c,p){const v=e("router-link");return t.toId?(o(),r("div",{key:0,onClick:i[1]||(i[1]=(...e)=>t.scrollToId&&t.scrollToId(...e)),class:"cursor-pointer text-white text-lg hover:text-blue-400"},s(t.title),1)):(o(),r(v,{key:1,to:t.route,"active-class":"text-blue-400"},{default:l((()=>[a("div",u,s(t.title),1)])),_:1},8,["to"]))};var c=t({name:"NavigationHeader",props:{tabs:{type:Array,required:!0}},components:{NavigationHeaderLink:d}});const p={class:"flex flex-1 flex-row gap-x-4 justify-end"};c.render=function(t,s,l,a,d,u){const c=e("NavigationHeaderLink");return o(),r("div",p,[(o(!0),r(i,null,n(t.tabs,(t=>(o(),r(c,{class:["mx-2",t.class],key:t.title,route:t.route,toId:t.toId,title:t.title},null,8,["route","toId","title","class"])))),128))])};export{c as _};
