import{e as G}from"./mdi.c70c7cbb.js";import{C as M,B as O,c as P,a as Y}from"./announcements.1793c8e7.js";import{d as w,q,l as A,r as c,o as m,c as f,a as t,y as z,i as l,w as S,p as B,t as H,v as J,z as I,A as N,F as E,j as U,b as K}from"./vendor.375efd1f.js";import{g as Q,a as W,c as X}from"./clubs.7f632464.js";import{I as Z}from"./image-with-fallback.37a4e643.js";import{_ as ee}from"./vic-park-logo.2e1e9acb.js";import{_ as $}from"./index.121cfe24.js";import{N as te}from"./navigation-header-content.ff9ec3f9.js";import"./date.1f9226ff.js";/**
  shave - Shave is a javascript plugin that truncates multi-line text within a html element based on set max height
  @version v2.5.10
  @link https://github.com/yowainwright/shave#readme
  @author Jeff Wainwright <yowainwright@gmail.com> (jeffry.in)
  @license MIT
**/function ne(e,n){var a=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{};if(typeof n=="undefined"||isNaN(n))throw Error("maxHeight is required");var r=typeof e=="string"?document.querySelectorAll(e):e;if(!!r){var d=a.character||"&mldr;",_=a.classname||"js-shave",s=typeof a.spaces=="boolean"?a.spaces:!0,i=a.charclassname||"js-shave-char",v='<span class="'.concat(i,'">').concat(d,"</span>");"length"in r||(r=[r]);for(var p=0;p<r.length;p+=1){var o=r[p],u=o.style,k=o.querySelector(".".concat(_)),g=o.textContent===void 0?"innerText":"textContent";k&&(o.removeChild(o.querySelector(".".concat(i))),o[g]=o[g]);var b=o[g],h=s?b.split(" "):b;if(!(h.length<2)){var T=u.height;u.height="auto";var F=u.maxHeight;if(u.maxHeight="none",o.offsetHeight<=n){u.height=T,u.maxHeight=F;continue}for(var y=h.length-1,j=0,C=void 0;j<y;)C=j+y+1>>1,o[g]=s?h.slice(0,C).join(" "):h.slice(0,C),o.insertAdjacentHTML("beforeend",v),o.offsetHeight>n?y=C-1:j=C;o[g]=s?h.slice(0,y).join(" "):h.slice(0,y),o.insertAdjacentHTML("beforeend",v);var V=s?" ".concat(h.slice(y).join(" ")):h.slice(y),D=document.createTextNode(V),x=document.createElement("span");x.classList.add(_),x.style.display="none",x.appendChild(D),o.insertAdjacentElement("beforeend",x),u.height=T,u.maxHeight=F}}}}const oe=w({components:{ImageWithFallback:Z},props:{name:{type:String,required:!0},description:{type:String,required:!0},slug:{type:String,required:!0},equityStatement:{type:String,required:!0}},setup(e){const n=q(!1),a=q(),r=q(),d=A(()=>({transform:n.value?"rotateY(180deg)":void 0})),_=A(()=>({pointerEvents:n.value?"none":"auto"}));let s=!1;function i(){n.value=!n.value,s||(s=!0,ne(r.value,a.value.getBoundingClientRect().height))}const v=A(()=>{const u=e.equityStatement.indexOf("["),k=e.equityStatement.indexOf("]");return e.equityStatement.slice(u+1,k)}),p=Q(e.slug),o=W(e.slug);return{clubIconUrl:p,clubPageUrl:o,mdiArrowRight:G,onClick:i,cardStyle:d,frontCardStyle:_,clippedEquityStatement:v,equityStatementContainer:a,equityStatementTextContainer:r}}}),ae=e=>(I("data-v-7bde2719"),e=e(),N(),e),se={"w:text":"4xl center",class:"fallback-card-cover font-bold absolute top-1/2 left-1/2 p-8 w-full column items-center"},re=ae(()=>t("img",{src:ee,width:"150"},null,-1)),ce={class:"flip-card-back w-full h-full p-4 column items-center","w:text":"burgundy center"},ie={"w:text":"xl center",class:"font-bold uppercase mb-2"},le={ref:"equityStatementContainer",class:"text-md overflow-hidden"},ue={class:"column mt-auto"};function de(e,n,a,r,d,_){const s=c("ImageWithFallback"),i=c("vue-icon"),v=c("router-link");return m(),f("div",{class:"flip-card w-[20rem] h-[20rem]",onClick:n[1]||(n[1]=(...p)=>e.onClick&&e.onClick(...p))},[t("div",{class:"flip-card-inner h-full w-full relative",style:z(e.cardStyle)},[t("div",{class:"flip-card-front absolute w-full h-full",style:z(e.frontCardStyle)},[l(s,{class:"absolute w-full h-full object-cover object-center",src:e.clubIconUrl,alt:e.name},{fallback:S(()=>[t("div",se,[B(H(e.name)+" ",1),re])]),_:1},8,["src","alt"])],4),t("div",ce,[t("h4",ie,H(e.name),1),t("div",le,[t("p",{ref:"equityStatementTextContainer"},H(e.clippedEquityStatement),513)],512),t("div",ue,[l(v,{to:e.clubPageUrl,class:"self-center"},{default:S(()=>[l(i,{icon:e.mdiArrowRight,size:"30px","w:text":"yellow hover:burgundy",onClick:n[0]||(n[0]=J(()=>{},["stop"]))},null,8,["icon"])]),_:1},8,["to"])])])],4)])}var me=$(oe,[["render",de],["__scopeId","data-v-7bde2719"]]);const _e=w({components:{ClubGalleryCard:me},setup(){return{clubsArray:Object.values(X).map(({slug:n,name:a,shortDescription:r,equityStatement:d})=>({slug:n,name:a,shortDescription:r,equityStatement:d}))}}}),pe=e=>(I("data-v-d4e2dade"),e=e(),N(),e),fe={id:"clubs",class:"max-w-6xl w-full mx-8 mt-12 mb-16"},ve={class:"relative club-gallery"},he=pe(()=>t("div",{class:"grid-background bg-burgundy"},null,-1));function ge(e,n,a,r,d,_){const s=c("ClubGalleryCard");return m(),f("div",fe,[t("div",ve,[he,(m(!0),f(E,null,U(e.clubsArray,i=>(m(),f("div",{key:i.slug,class:"m-[1rem]"},[l(s,{name:i.name,description:i.shortDescription,slug:i.slug,"equity-statement":i.equityStatement},null,8,["name","description","slug","equity-statement"])]))),128))])])}var be=$(_e,[["render",ge],["__scopeId","data-v-d4e2dade"]]);const ye={},$e=B(" explore ");function ke(e,n){const a=c("router-link");return m(),K(a,{"w:p":"y-3 x-5",class:"z-10 bg-yellow text-white font-bold",to:"/clubs"},{default:S(()=>[$e]),_:1})}var R=$(ye,[["render",ke]]),Ce="/img/hero-image.jpg";const we=w({components:{ExploreButton:R}}),L=e=>(I("data-v-dbe835b2"),e=e(),N(),e),xe={class:"relative"},Se=L(()=>t("div",{class:"absolute background-tint inset-0"},null,-1)),je=L(()=>t("img",{src:Ce,class:"object-cover hero-image w-full"},null,-1)),qe={class:"absolute inset-0 column center"},Ae=L(()=>t("div",{class:"z-10 hero-title text-white font-kollektif"}," victoria park ci ",-1));function Be(e,n,a,r,d,_){const s=c("ExploreButton");return m(),f("div",xe,[Se,je,t("div",qe,[Ae,l(s,{class:"hidden sm:block mt-5"})])])}var He=$(we,[["render",Be],["__scopeId","data-v-dbe835b2"]]);const Ie=[{title:"announcements",route:"/announcements"},{title:"clubs",route:"/clubs"},{title:"calendar",route:"/events"}],Ne=w({name:"NavigationHeader",components:{NavigationHeaderContent:te},setup(){return{tabs:Ie}}}),Ee={class:"row absolute top-0 inset-x-0 justify-between p-2 bg-transparent z-50"};function Le(e,n,a,r,d,_){const s=c("NavigationHeaderContent");return m(),f("div",Ee,[l(s,{tabs:e.tabs},null,8,["tabs"])])}var Te=$(Ne,[["render",Le]]);const Fe=w({name:"HomePage",components:{LandingNavigationHeader:Te,HeroBanner:He,ClubAnnouncementListing:M,ClubGallery:be,ExploreButton:R,BackToTopFab:O},setup(){return{announcementsArray:P(Y).slice(0,3),mdiArrowRight:G}}}),Ge={class:"column items-center"},ze=t("div",null,[t("div",{id:"equity","w:text":"center red 4xl",class:"mb-6 mt-8 font-kollektif"}," clubs equity statement "),t("div",{class:"max-w-4xl italic font-medium text-red-dark text-center px-8"}," Clubs offered at VP aim to create inclusive spaces for everyone. Students of all identities and experiences are welcome to join clubs where members can come together based on shared interests. Each club is a reflection of the larger school community where all voices are valued and heard. ")],-1),Ue={class:"max-w-6xl mb-8 column px-8"},Re=t("div",{"w:text":"center white 4xl",class:"mb-8 py-8 bg-burgundy font-bold"}," recent announcements ",-1),Ve={class:"group self-center"},De={class:"inline-flex flex-row items-center"},Me=B(" View all announcements ");function Oe(e,n,a,r,d,_){const s=c("LandingNavigationHeader"),i=c("HeroBanner"),v=c("ExploreButton"),p=c("ClubGallery"),o=c("ClubAnnouncementListing"),u=c("vue-icon"),k=c("router-link"),g=c("BackToTopFab");return m(),f(E,null,[l(s),l(i),t("div",Ge,[l(v,{class:"sm:hidden mt-10"}),ze,l(p,{class:"my-8"}),t("div",Ue,[Re,(m(!0),f(E,null,U(e.announcementsArray,b=>(m(),f("div",{key:b.title,class:"pb-8"},[l(o,{title:b.title,date:b.date.toString(),content:b.content},null,8,["title","date","content"])]))),128)),t("div",Ve,[l(k,{to:"/announcements",class:"group-hover:text-red announcements-link"},{default:S(()=>[t("div",De,[Me,l(u,{icon:e.mdiArrowRight,size:"20px",class:"ml-1 group-hover:text-red"},null,8,["icon"])])]),_:1})])])]),l(g)],64)}var tt=$(Fe,[["render",Oe]]);export{tt as default};
