import{d as t}from"./mdi.313bf820.js";import{d as e,u as s,m as i,r as o,q as n,o as l,c as a,t as r,j as c,w as d,s as u,n as v,v as k,x as p,b as g,F as m,k as y,y as x,l as f,e as h}from"./vendor.eb985214.js";function C(t){document.querySelector(`#${t}`).scrollIntoView({behavior:"smooth"})}var b=e({inheritAttrs:!1,props:{title:{type:String,required:!0},toId:{type:String,default:""},route:{type:String,default:""},noActiveClass:{type:Boolean,default:!1}},setup(){const t=s();return{scrollToId:C,navigationLinkClass:i((()=>t.meta.navigationLinkClass))}}});const w={key:1,class:"text-white"};b.render=function(t,e,s,i,k,p){const g=o("router-link");return n(t.$slots,"link",{},(()=>[t.toId?(l(),a("div",{key:0,class:"cursor-pointer","w:text":"white lg hover:gray-300",onClick:e[0]||(e[0]=e=>t.scrollToId(t.toId))},r(t.title),1)):(l(),a("div",w,[c(g,{to:t.route,"exact-active-class":t.noActiveClass?"":"text-burgundy",class:v(["text-lg",void 0!==t.navigationLinkClass?t.navigationLinkClass:"hover:burgundy"])},{default:d((()=>[u(r(t.title),1)])),_:1},8,["to","exact-active-class","class"])]))]))};var I=e({name:"NavigationHeader",components:{NavigationHeaderLink:b},props:{tabs:{type:Array,required:!0}},setup(){const e=k(!1);return{mdiMenu:t,isMenuOpen:e,onMenuClick:function(){e.value=!e.value},scrollToId:C}}});const M={"w:md":"flex",class:"hidden flex-1 flex-row gap-x-4 justify-end"},L={class:"md:hidden"},j={key:0,class:"relative z-50"},q={class:"\n\t\t\t\t\tcolumn\n\t\t\t\t\tabsolute\n\t\t\t\t\tright-0\n\t\t\t\t\tborder\n\t\t\t\t\trounded-sm\n\t\t\t\t\toverflow-hidden\n\t\t\t\t\tbg-white\n\t\t\t\t\tp-1\n\t\t\t\t"},A=["onClick"],O={"w:text":"lg hover:red"};I.render=function(t,e,s,i,n,u){const k=o("NavigationHeaderLink"),C=o("vue-icon"),b=o("router-link"),w=p("click-outside");return l(),a(m,null,[c(k,{class:"mx-2 mr-auto",route:"/","no-active-class":"",title:"home"}),g("div",M,[(l(!0),a(m,null,y(t.tabs,(t=>(l(),a("div",{key:t.title,class:"mx-2"},[c(k,{route:t.route,"to-id":t.toId,title:t.title,class:v(t.class)},null,8,["route","to-id","title","class"])])))),128))]),g("div",L,[c(C,{icon:t.mdiMenu,class:"text-white h-full mr-2 cursor-pointer",size:"20px",onClick:t.onMenuClick},null,8,["icon","onClick"]),t.isMenuOpen?x((l(),a("div",j,[g("div",q,[(l(!0),a(m,null,y(t.tabs,(s=>(l(),a("div",{key:s.title,"w:p":"x-2 y-1"},[c(k,{key:s.title,route:s.route,"to-id":s.toId,title:s.title,class:v(s.class)},{link:d((()=>[g("div",{onClick:e[0]||(e[0]=e=>t.isMenuOpen=!1)},[s.toId?(l(),a("div",{key:0,"w:text":"black lg hover:red",class:"cursor-pointer",onClick:e=>s.toId&&t.scrollToId(s.toId)},r(s.title),9,A)):(l(),h(b,{key:1,to:s.route,"active-class":"text-red"},{default:d((()=>[g("div",O,r(s.title),1)])),_:2},1032,["to"]))])])),_:2},1032,["route","to-id","title","class"])])))),128))])],512)),[[w,()=>t.isMenuOpen=!1]]):f("",!0)])],64)};var S="/img/vic-park-logo.png";export{I as _,S as a};
