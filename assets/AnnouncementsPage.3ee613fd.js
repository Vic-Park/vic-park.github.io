import{a as n,_ as t,c as e,b as s}from"./announcements.5bc36f2e.js";import{d as a,r as o,o as c,c as i,b as l,F as r,k as m,j as u}from"./vendor.eb985214.js";import"./mdi.313bf820.js";import"./date.d7bb23b1.js";var d=a({components:{BackToTopFab:n,ClubAnnouncementListing:t},setup:()=>({announcementsArray:e(s)})});const b=l("div",{class:"shadow-title mt-8"},"announcements",-1),p={class:"column items-center mt-12"},f={class:"max-w-6xl px-12"};d.render=function(n,t,e,s,a,d){const v=o("ClubAnnouncementListing"),j=o("BackToTopFab");return c(),i(r,null,[b,l("div",p,[l("div",f,[(c(!0),i(r,null,m(n.announcementsArray,(n=>(c(),i("div",{key:n.title,class:"pb-8"},[u(v,{title:n.title,date:n.date.toString(),content:n.content},null,8,["title","date","content"])])))),128))])]),u(j)],64)};export{d as default};
