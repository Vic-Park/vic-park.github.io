import{B as d,C as l,c as u,a as p}from"./announcements.b013cabf.js";import{_}from"./index.9191619c.js";import{d as f,r as a,c as e,a as t,F as c,j as b,i as r,o}from"./vendor.25d481dc.js";import"./mdi.5147d403.js";import"./date.1f9226ff.js";const x=f({components:{BackToTopFab:d,ClubAnnouncementListing:l},setup(){return{announcementsArray:u(p)}}}),A={class:"column items-center max-w-6xl mx-auto"},v=t("div",{class:"shadow-title mt-8"},"announcements",-1),B={class:"max-w-6xl px-12 mt-8"};function g(s,j,k,C,T,h){const i=a("ClubAnnouncementListing"),m=a("BackToTopFab");return o(),e(c,null,[t("div",A,[v,t("div",B,[(o(!0),e(c,null,b(s.announcementsArray,n=>(o(),e("div",{key:n.title,class:"pb-8"},[r(i,{title:n.title,date:n.date.toString(),content:n.content},null,8,["title","date","content"])]))),128))])]),r(m)],64)}var N=_(x,[["render",g]]);export{N as default};
