import{_ as t,c as e,a as n}from"./announcements.4bc9ae9e.js";import{d as s,r as a,o,c as l,a as c,F as r,k as i}from"./vendor.838b1b71.js";import"./date.d7bb23b1.js";var d=s({components:{ClubAnnouncementListing:t},setup:()=>({announcementsArray:e(n)})});const m=c("div",{style:{"text-shadow":"2px 2px #db7f43"},class:"text-white font-bold text-4xl self-stretch text-center bg-red-dark p-6"}," announcements ",-1),u={class:"flex flex-col items-center mt-12"},x={class:"max-w-6xl px-12"};d.render=function(t,e,n,s,d,b){const p=a("ClubAnnouncementListing");return o(),l(r,null,[m,c("div",u,[c("div",x,[(o(!0),l(r,null,i(t.announcementsArray,(t=>(o(),l("div",{key:t.title,class:"pb-8"},[c(p,{title:t.title,date:t.date.toString(),content:t.content},null,8,["title","date","content"])])))),128))])])],64)};export default d;
