import{e as G,f as P}from"./mdi.5147d403.js";import{C as D,B as K,c as O,a as Q}from"./announcements.b013cabf.js";import{d as w,q as I,l as N,r as c,o as m,c as f,a as n,y as R,i,w as S,p as q,t as E,v as Y,z as j,A as B,F as H,j as z,b as J,B as W,k as X}from"./vendor.25d481dc.js";import{g as Z,a as ee,b as te,c as ne}from"./clubs.66e5c5e8.js";import{I as oe}from"./image-with-fallback.00a90cd6.js";import{_ as ae}from"./vic-park-logo.e00cf530.js";import{_ as $}from"./index.9191619c.js";import{N as se}from"./navigation-header-content.6b5bd1ee.js";import"./date.1f9226ff.js";function re(e){if(!Array.isArray(e))throw new TypeError(`Expected an array, got ${typeof e}`);e=[...e];for(let t=e.length-1;t>0;t--){const o=Math.floor(Math.random()*(t+1));[e[t],e[o]]=[e[o],e[t]]}return e}/**
  shave - Shave is a javascript plugin that truncates multi-line text within a html element based on set max height
  @version v2.5.10
  @link https://github.com/yowainwright/shave#readme
  @author Jeff Wainwright <yowainwright@gmail.com> (jeffry.in)
  @license MIT
**/function ce(e,t){var o=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{};if(typeof t=="undefined"||isNaN(t))throw Error("maxHeight is required");var a=typeof e=="string"?document.querySelectorAll(e):e;if(!!a){var d=o.character||"&mldr;",p=o.classname||"js-shave",r=typeof o.spaces=="boolean"?o.spaces:!0,l=o.charclassname||"js-shave-char",b='<span class="'.concat(l,'">').concat(d,"</span>");"length"in a||(a=[a]);for(var v=0;v<a.length;v+=1){var s=a[v],_=s.style,x=s.querySelector(".".concat(p)),h=s.textContent===void 0?"innerText":"textContent";x&&(s.removeChild(s.querySelector(".".concat(l))),s[h]=s[h]);var g=s[h],u=r?g.split(" "):g;if(!(u.length<2)){var T=_.height;_.height="auto";var F=_.maxHeight;if(_.maxHeight="none",s.offsetHeight<=t){_.height=T,_.maxHeight=F;continue}for(var y=u.length-1,A=0,C=void 0;A<y;)C=A+y+1>>1,s[h]=r?u.slice(0,C).join(" "):u.slice(0,C),s.insertAdjacentHTML("beforeend",b),s.offsetHeight>t?y=C-1:A=C;s[h]=r?u.slice(0,y).join(" "):u.slice(0,y),s.insertAdjacentHTML("beforeend",b);var U=r?" ".concat(u.slice(y).join(" ")):u.slice(y),V=document.createTextNode(U),k=document.createElement("span");k.classList.add(p),k.style.display="none",k.appendChild(V),s.insertAdjacentElement("beforeend",k),_.height=T,_.maxHeight=F}}}}const ie=w({components:{ImageWithFallback:oe},props:{name:{type:String,required:!0},description:{type:String,required:!0},slug:{type:String,required:!0},equityStatement:{type:String,default:void 0}},setup(e){const t=I(),o=I();function a(){ce(o.value,t.value.getBoundingClientRect().height)}const d=I(!1),p=N(()=>({transform:d.value?"rotateY(180deg)":void 0})),r=N(()=>({pointerEvents:d.value?"none":"auto"}));let l=!1;function b(){d.value=!d.value,l||(l=!0,a())}const v=N(()=>{if(e.equityStatement!==void 0){const x=e.equityStatement.indexOf("["),h=e.equityStatement.indexOf("]");let g=e.equityStatement.slice(x+1,h);return/\w|\d/.test(g[g.length-1])&&(g+="."),g}else return e.description}),s=Z(e.slug),_=ee(e.slug);return{clubIconUrl:s,clubPageUrl:_,mdiArrowRight:G,onClick:b,cardStyle:p,frontCardStyle:r,clubExcerpt:v,clubExcerptContainer:t,clubExcerptTextContainer:o}}}),le=e=>(j("data-v-7b178200"),e=e(),B(),e),ue={"w:text":"3xl center",class:"fallback-card-cover font-bold absolute top-1/2 left-1/2 p-8 w-full column items-center"},de=le(()=>n("img",{src:ae,width:"150"},null,-1)),_e={class:"flip-card-back w-full h-full p-4 column items-center","w:text":"burgundy center"},me={"w:text":"xl center",class:"font-bold uppercase mb-2"},pe={ref:"clubExcerptContainer",class:"text-md overflow-hidden"},fe={class:"column mt-auto"};function ve(e,t,o,a,d,p){const r=c("ImageWithFallback"),l=c("vue-icon"),b=c("router-link");return m(),f("div",{class:"flip-card w-[20rem] h-[20rem]",onClick:t[1]||(t[1]=(...v)=>e.onClick&&e.onClick(...v))},[n("div",{class:"flip-card-inner h-full w-full relative",style:R(e.cardStyle)},[n("div",{class:"flip-card-front absolute w-full h-full",style:R(e.frontCardStyle)},[i(r,{class:"absolute w-full h-full object-cover object-center",src:e.clubIconUrl,alt:e.name},{fallback:S(()=>[n("div",ue,[q(E(e.name)+" ",1),de])]),_:1},8,["src","alt"])],4),n("div",_e,[n("h4",me,E(e.name),1),n("div",pe,[n("p",{ref:"clubExcerptTextContainer"},E(e.clubExcerpt),513)],512),n("div",fe,[i(b,{to:e.clubPageUrl,class:"self-center"},{default:S(()=>[i(l,{icon:e.mdiArrowRight,size:"30px","w:text":"yellow hover:burgundy",onClick:t[0]||(t[0]=Y(()=>{},["stop"]))},null,8,["icon"])]),_:1},8,["to"])])])],4)])}var he=$(ie,[["render",ve],["__scopeId","data-v-7b178200"]]);const ge=w({components:{ClubGalleryCard:he},setup(){return{clubsArray:re(te(ne))}}}),be=e=>(j("data-v-4712a611"),e=e(),B(),e),ye={id:"clubs",class:"max-w-6xl w-full","w:m":"x-8 t-12 b-16"},$e={class:"club-gallery"},we=be(()=>n("div",{class:"grid-background"},null,-1));function xe(e,t,o,a,d,p){const r=c("ClubGalleryCard");return m(),f("div",ye,[n("div",$e,[we,(m(!0),f(H,null,z(e.clubsArray,l=>(m(),f("div",{key:l.slug,class:"m-[1rem]"},[i(r,{name:l.name,description:l.shortDescription,slug:l.slug,"equity-statement":l.equityStatement},null,8,["name","description","slug","equity-statement"])]))),128))])])}var Ce=$(ge,[["render",xe],["__scopeId","data-v-4712a611"]]);const ke={},Se=q(" explore ");function je(e,t){const o=c("router-link");return m(),J(o,{"w:p":"y-3 x-5",class:"z-10 bg-yellow text-white font-bold",to:"/clubs"},{default:S(()=>[Se]),_:1})}var M=$(ke,[["render",je]]),Be="/images/hero-image.jpg";const Ae=w({components:{ExploreButton:M}}),L=e=>(j("data-v-5a32e254"),e=e(),B(),e),Ie={class:"relative"},Ne=L(()=>n("div",{class:"absolute background-tint inset-0"},null,-1)),qe=L(()=>n("img",{src:Be,class:"object-cover hero-image w-full"},null,-1)),Ee={class:"absolute inset-0 column center"},He=L(()=>n("div",{class:"z-10 hero-title text-white font-kollektif"}," victoria park ci ",-1));function Le(e,t,o,a,d,p){const r=c("ExploreButton");return m(),f("div",Ie,[Ne,qe,n("div",Ee,[He,i(r,{class:"hidden sm:block mt-5"})])])}var Te=$(Ae,[["render",Le],["__scopeId","data-v-5a32e254"]]);const Fe=[{title:"announcements",route:"/announcements"},{title:"clubs",route:"/clubs"},{title:"calendar",route:"/events"}],Ge=w({name:"NavigationHeader",components:{NavigationHeaderContent:se},setup(){return{tabs:Fe}}}),Re={class:"row absolute top-0 inset-x-0 justify-between p-2 bg-transparent z-50"};function ze(e,t,o,a,d,p){const r=c("NavigationHeaderContent");return m(),f("div",Re,[i(r,{tabs:e.tabs},null,8,["tabs"])])}var Me=$(Ge,[["render",ze]]);function Ue(e){return W((t,o)=>({get(){var a;return t(),(a=window.localStorage.getItem(e))!=null?a:void 0},set(a){a===void 0?window.localStorage.removeItem(e):window.localStorage.setItem(e,a),o()}}))}const Ve=w({props:{localStorageFlag:{type:String,required:!0},html:{type:String,required:!0}},setup(e){const t=Ue(e.localStorageFlag);function o(){t.value="hidden"}return{mdiClose:P,flag:t,closeNotification:o}}}),Pe=e=>(j("data-v-30646280"),e=e(),B(),e),De={key:0,class:"row bg-blue-400 items-center py-2 px-4 justify-between"},Ke=Pe(()=>n("div",{class:"mr-auto flex-1"},null,-1)),Oe=["innerHTML"];function Qe(e,t,o,a,d,p){const r=c("vue-icon");return e.flag!=="hidden"?(m(),f("div",De,[Ke,n("div",{class:"notification text-center text-white flex-grow px-4",innerHTML:e.html},null,8,Oe),i(r,{icon:e.mdiClose,class:"ml-auto text-white cursor-pointer min-w-[24px]",size:"24px",onClick:e.closeNotification},null,8,["icon","onClick"])])):X("",!0)}var Ye=$(Ve,[["render",Qe],["__scopeId","data-v-30646280"]]);const Je=w({name:"HomePage",components:{NotificationBanner:Ye,LandingNavigationHeader:Me,HeroBanner:Te,ClubAnnouncementListing:D,ClubGallery:Ce,ExploreButton:M,BackToTopFab:K},setup(){return{announcementsArray:O(Q).slice(0,3),mdiArrowRight:G}}}),We={class:"relative"},Xe={class:"column items-center"},Ze=n("div",null,[n("div",{id:"equity","w:text":"center red 4xl",class:"mb-6 mt-8 font-kollektif"}," clubs equity statement "),n("div",{class:"max-w-4xl italic font-medium text-red-dark text-center px-8"}," Clubs offered at VP aim to create inclusive spaces for everyone. Students of all identities and experiences are welcome to join clubs where members can come together based on shared interests. Each club is a reflection of the larger school community where all voices are valued and heard. ")],-1),et={class:"max-w-6xl mb-8 column px-8"},tt=n("div",{"w:text":"center white 4xl",class:"mb-8 py-8 bg-burgundy font-bold"}," recent announcements ",-1),nt={class:"group self-center"},ot={class:"inline-flex flex-row items-center"},at=q(" View all announcements ");function st(e,t,o,a,d,p){const r=c("NotificationBanner"),l=c("LandingNavigationHeader"),b=c("HeroBanner"),v=c("ExploreButton"),s=c("ClubGallery"),_=c("ClubAnnouncementListing"),x=c("vue-icon"),h=c("router-link"),g=c("BackToTopFab");return m(),f(H,null,[i(r,{html:"If you're the leader of a club in the 2021-2022 school year, please fill out the following Google Form: <a href='https://forms.gle/jnKNCGR9P4QyA7ey6'>https://forms.gle/jnKNCGR9P4QyA7ey6</a>","local-storage-flag":"form-notification"}),n("div",We,[i(l),i(b),n("div",Xe,[i(v,{class:"sm:hidden mt-10"}),Ze,i(s,{class:"my-8"}),n("div",et,[tt,(m(!0),f(H,null,z(e.announcementsArray,u=>(m(),f("div",{key:u.title,class:"pb-8"},[i(_,{title:u.title,date:u.date.toString(),content:u.content},null,8,["title","date","content"])]))),128)),n("div",nt,[i(h,{to:"/announcements",class:"group-hover:text-red announcements-link"},{default:S(()=>[n("div",ot,[at,i(x,{icon:e.mdiArrowRight,size:"20px",class:"ml-1 group-hover:text-red"},null,8,["icon"])])]),_:1})])])])]),i(g)],64)}var ft=$(Je,[["render",st]]);export{ft as default};
