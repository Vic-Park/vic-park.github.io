import{m as e}from"./mdi.0e269f65.js";import{_ as t,c as n,a as l}from"./announcements.64378ad6.js";import{d as a,g as s,h as r,p as o,i as c,r as i,o as u,c as d,a as m,t as b,j as f,k as g,w as p,F as v,l as x,m as y}from"./vendor.9787bb58.js";import{c as h}from"./clubs.5539e366.js";import{_ as w}from"./NavigationHeaderContent.23b10d52.js";import"./date.d7bb23b1.js";var k=a({props:{name:{type:String,required:!0},description:{type:String,required:!0},slug:{type:String,required:!0}},setup(t){const n=s(!1),l=s(!0),a=r((()=>({transform:n.value?"rotateY(180deg)":void 0}))),o=r((()=>({pointerEvents:n.value?"none":"auto"})));return{imgPath:`/img/club-thumbnail-img/${t.slug}.jpg`,clubPagePath:`/club/${t.slug}`,mdiArrowRight:e,clubHasImage:l,onImageLoadError:function(e){e.preventDefault(),l.value=!1},isDescriptionActive:n,onClick:function(){n.value=!n.value},cardStyle:a,frontCardStyle:o}}});const C=p();o("data-v-70c93330");const j={key:0,class:"w-full h-full relative flex flex-col items-center"},A={class:"\n              font-bold\n              rounded-md\n              m-2\n              py-1\n              px-4\n              text-center\n              inline-block\n              transform \n              bg-white\n              text-black\n              border-2\n              border-black\n              "},H={key:1,class:"\n            font-bold \n            text-4xl \n            text-center \n            transform \n            -translate-x-1/2 \n            -translate-y-1/2 \n            absolute \n            top-1/2 left-1/2 \n            p-8 \n            w-full\n            flex\n            flex-col\n            items-center\n            "},_=m("img",{src:"/img/vic-park-logo.png",width:"150"},null,-1),L={class:"flip-card-back w-full h-full bg-white absolute text-burgundy text-center p-4"},I={class:"font-black uppercase text-xl text-center mb-2"},S={class:"text-md"},E={class:"w-full my-auto"};c();const N=C(((e,t,n,l,a,s)=>{const r=i("vue-icon"),o=i("router-link");return u(),d("div",{class:"flip-card",onClick:t[3]||(t[3]=(...t)=>e.onClick&&e.onClick(...t))},[m("div",{class:"flip-card-inner w-full h-80 relative",style:e.cardStyle},[m("div",{class:"flip-card-front absolute w-full h-full",style:e.frontCardStyle},[e.clubHasImage?(u(),d("div",j,[m("img",{class:"absolute w-full h-full object-cover object-center",src:e.imgPath,onError:t[1]||(t[1]=(...t)=>e.onImageLoadError&&e.onImageLoadError(...t)),alt:e.name},null,40,["src","alt"]),m("div",A,b(e.name),1)])):(u(),d("div",H,[f(b(e.name)+" ",1),_]))],4),m("div",L,[m("h4",I,b(e.name),1),m("p",S,b(e.description),1),m("div",E,[m(o,{to:e.clubPagePath,class:"absolute bottom-4 left-0 right-0"},{default:C((()=>[m(r,{icon:e.mdiArrowRight,size:"30px",class:"hover:text-burgundy mx-auto text-yellow",onClick:t[2]||(t[2]=g((()=>{}),["stop"]))},null,8,["icon"])])),_:1},8,["to"])])])],4)])}));k.render=N,k.__scopeId="data-v-70c93330";var P=a({components:{ClubGalleryCard:k},setup:()=>({clubsArray:Object.entries(h).map((([e,{data:t}],n)=>({slug:t.slug,name:t.name,description:t.shortDescription})))}),methods:{scrollRight(e){e.target.parentElement.childNodes[1].scrollLeft+=1e3},scrollLeft(e){e.target.parentElement.childNodes[1].scrollLeft-=1e3}}});const q=p();o("data-v-d3826538");const z={id:"clubs",class:"mt-12 mb-16 mx-8 max-w-6xl w-full"},R={class:"relative club-gallery"},G=m("div",{class:"grid-background bg-burgundy"},null,-1);c();const D=q(((e,t,n,l,a,s)=>{const r=i("ClubGalleryCard");return u(),d("div",z,[m("div",R,[G,(u(!0),d(v,null,x(e.clubsArray,(e=>(u(),d("div",{key:e.slug,class:"m-4"},[m(r,{name:e.name,description:e.description,slug:e.slug},null,8,["name","description","slug"])])))),128))])])}));P.render=D,P.__scopeId="data-v-d3826538";var B=a({});const V=p();o("data-v-4cc66414");const $={class:"relative"},F=m("div",{class:"absolute background-tint inset-0"},null,-1),O=m("img",{src:"/img/hero-image.jpg",class:"object-cover hero-image w-full"},null,-1),Y={class:"absolute inset-0 flex flex-col items-center justify-center"},J=m("div",{class:"z-10 hero-title text-white font-kollektif"},"victoria park ci",-1),K=f(" explore ");c();const M=V(((e,t,n,l,a,s)=>{const r=i("router-link");return u(),d("div",$,[F,O,m("div",Y,[J,m(r,{class:"z-10 bg-yellow mt-10 py-3 px-5 text-white text-3xl font-black",to:"/clubs"},{default:V((()=>[K])),_:1})])])}));B.render=M,B.__scopeId="data-v-4cc66414";const Q=[{title:"announcements",route:"/announcements"},{title:"equity",toId:"equity"},{title:"clubs",route:"/clubs"},{title:"calendar",route:"/events"}];var T=a({name:"NavigationHeader",components:{NavigationHeaderContent:w},setup:()=>({tabs:Q})});const U={class:"absolute top-0 flex flex-row inset-x-0 justify-between p-2 bg-transparent z-50"};T.render=function(e,t,n,l,a,s){const r=i("NavigationHeaderContent");return u(),d("div",U,[m(r,{tabs:e.tabs},null,8,["tabs"])])};var W=a({name:"HomePage",components:{LandingNavigationHeader:T,HeroBanner:B,ClubAnnouncementListing:t,ClubGallery:P},setup:()=>({announcementsArray:n(l).slice(0,3),mdiArrowRight:e})});const X={class:"flex flex-col items-center"},Z=m("div",{class:"my-8"},[m("div",{id:"equity",class:"mb-6 mt-8 font-kollektif text-center text-red text-4xl"}," clubs equity statement "),m("div",{class:"max-w-4xl italic font-medium text-red-dark text-center px-8"}," Clubs offered at VP aim to create inclusive spaces for everyone. Students of all identities and experiences are welcome to join clubs where members can come together based on shared interests. Each club is a reflection of the larger school community where all voices are valued and heard. ")],-1),ee={class:"max-w-6xl mb-8 flex flex-col px-8"},te=m("div",{class:"text-4xl text-center mb-8 py-8 text-white bg-burgundy font-black"}," recent announcements ",-1),ne={class:"group self-center"},le={class:"inline-flex flex-row items-center"},ae=f(" View all announcements ");W.render=function(e,t,n,l,a,s){const r=i("LandingNavigationHeader"),o=i("HeroBanner"),c=i("ClubGallery"),b=i("ClubAnnouncementListing"),f=i("vue-icon"),g=i("router-link");return u(),d(v,null,[m(r),m(o),m("div",X,[Z,m(c,{class:"my-8"}),m("div",ee,[te,(u(!0),d(v,null,x(e.announcementsArray,(e=>(u(),d("div",{key:e.title,class:"pb-8"},[m(b,{title:e.title,date:e.date.toString(),content:e.content},null,8,["title","date","content"])])))),128)),m("div",ne,[m(g,{to:"/announcements",class:"group-hover:text-red announcements-link"},{default:y((()=>[m("div",le,[ae,m(f,{icon:e.mdiArrowRight,size:"20px",class:"ml-1 group-hover:text-red"},null,8,["icon"])])])),_:1})])])])],64)};export default W;
