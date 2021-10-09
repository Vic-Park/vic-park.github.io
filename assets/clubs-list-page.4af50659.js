import{h as k,i as $,j as x}from"./mdi.1aa3c8da.js";import{d as v,H as L,h as p,o as b,c as g,a as t,x as _,p as r,r as w,v as V,y as I,w as j,I as U,F as T,s as D,B as F,C as S,z as h}from"./vendor.1372b403.js";import{a as A,g as N,b as P,c as q}from"./clubs.460c8543.js";import{I as z}from"./image-with-fallback.79bf4bde.js";import{_ as y}from"./index.5ce605f0.js";import"./vic-park-logo.e00cf530.js";const B=v({name:"ClubListing",components:{ImageWithFallback:z},props:{name:{type:String,required:!0},slug:{type:String,required:!0},shortDescription:{type:String,required:!0}},setup(e){const o=A(e.slug),c=N(e.slug),u=L();async function i(){await u.push(o)}return{clubIconUrl:c,animateNavigate:i,mdiChevronRight:k}}}),W={class:"club-listing"},M={class:"text-white mb-4 flex items-center relative p-8"},Q=t("div",{class:"club-listing-background absolute inset-0 -z-1 bg-red-dark"},null,-1),R={class:"column flex-grow"},H={class:"font-kollektif text-2xl font-bold"},J={class:"text-md"},E=["to"],G={class:"club-listing-arrow opacity-0 absolute inset-0 rounded-full",style:{"background-color":"rgba(255, 255, 255, 0.5)"}};function Y(e,o,c,u,i,f){const n=p("ImageWithFallback"),a=p("vue-icon");return b(),g("div",W,[t("div",M,[Q,t("div",R,[t("div",H,_(e.name),1),t("div",J,_(e.shortDescription),1)]),t("div",{class:"ml-4 relative cursor-pointer",to:`/club/${e.slug}`,onClick:o[0]||(o[0]=(...l)=>e.animateNavigate&&e.animateNavigate(...l))},[r(n,{src:e.clubIconUrl,alt:e.name,class:"club-listing-image min-w-50 w-50 h-50 rounded-full object-cover"},null,8,["src","alt"]),t("div",G,[r(a,{icon:e.mdiChevronRight,size:"200px",class:"text-black font-bold club-listing-arrow-icon"},null,8,["icon"])])],8,E)])])}var K=y(B,[["render",Y]]);const O=v({name:"ClubsListPage",components:{ClubListing:K},setup(){var f,n,a;const e=w(""),o=P(q),c=w(!1),u=V(()=>{const l=e.value.toLowerCase();return o.filter(({name:s,shortDescription:d})=>s.toLowerCase().includes(l)||d.toLowerCase().includes(l)).map(({slug:s,name:d,shortDescription:m})=>({name:d,slug:s,shortDescription:m}))}),i={};for(const l of o){const s=(n=(f=l.categories)==null?void 0:f.split(","))!=null?n:[];for(const d of s){const m=d.trim();i[m]=(a=i[m])!=null?a:[],i[m].push({name:l.name,slug:l.slug,shortDescription:l.shortDescription})}}return{searchQuery:e,filteredClubs:u,mdiMagnify:$,mdiPlus:x,isAddClubTooltipVisible:c}}}),C=e=>(F("data-v-6233bb93"),e=e(),S(),e),X={class:"column items-center px-8 max-w-6xl mx-auto"},Z=C(()=>t("div",{class:"shadow-title my-8"},"clubs",-1)),ee={class:"row justify-between h-10 w-full items-start mb-8 relative"},te=h(" add club "),se=C(()=>t("div",{class:"max-w-150 bg-white text-black p-4 border-blue-400 border-2 rounded-md mt-1"},[h(" To add a club to this list, please fill out the following Google Form: "),t("br"),t("a",{class:"link",href:"https://forms.gle/qeFtjLJmUcvW7Vwo8"},"https://forms.gle/qeFtjLJmUcvW7Vwo8"),t("br"),t("div",{class:"text-sm mt-1"},[t("span",{class:"font-bold"},"Note:"),h(" You must be signed in with your TDSB account to access the form. ")])],-1)),oe={class:"relative w-60 self-end"},le={class:"column"},ie={key:1,class:"text-center"};function ne(e,o,c,u,i,f){const n=p("vue-icon"),a=p("vue-tooltip"),l=p("ClubListing");return b(),g("div",X,[Z,t("div",ee,[t("button",{id:"update-club-button","w:p":"l-2 y-2 r-3",class:"bg-blue-400 row items-center text-white font-medium cursor-pointer relative",onClick:o[0]||(o[0]=s=>e.isAddClubTooltipVisible=!e.isAddClubTooltipVisible)},[r(n,{icon:e.mdiPlus,class:"mr-1",size:"24px"},null,8,["icon"]),te]),r(a,{modelValue:e.isAddClubTooltipVisible,"onUpdate:modelValue":o[1]||(o[1]=s=>e.isAddClubTooltipVisible=s),reference:"#update-club-button",class:"max-w-full overflow-hidden"},{default:I(()=>[se]),_:1},8,["modelValue"]),t("div",oe,[r(n,{class:"search-icon text-gray-300 absolute",icon:e.mdiMagnify,height:"100%"},null,8,["icon"]),j(t("input",{"onUpdate:modelValue":o[2]||(o[2]=s=>e.searchQuery=s),"w:border":"2 gray-300","w:focus":"outline-none ring-2 ring-yellow-deep border-transparent",class:"pl-3 self-center w-full h-full max-w-md p-1 font-kollektif text-xl",placeholder:"search club"},null,512),[[U,e.searchQuery]])])]),t("div",le,[e.filteredClubs.length>0?(b(!0),g(T,{key:0},D(e.filteredClubs,s=>(b(),g("div",{key:s.slug,class:"pb-2"},[r(l,{name:s.name,"short-description":s.shortDescription,slug:s.slug},null,8,["name","short-description","slug"])]))),128)):(b(),g("div",ie," Unfortunately, we couldn't find a club that meets this criteria. However, you can always start your own club! "))])])}var pe=y(O,[["render",ne],["__scopeId","data-v-6233bb93"]]);export{pe as default};
