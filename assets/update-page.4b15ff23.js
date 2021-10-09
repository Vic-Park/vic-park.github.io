var B=Object.defineProperty,L=Object.defineProperties;var H=Object.getOwnPropertyDescriptors;var E=Object.getOwnPropertySymbols;var F=Object.prototype.hasOwnProperty,D=Object.prototype.propertyIsEnumerable;var v=(e,n,i)=>n in e?B(e,n,{enumerable:!0,configurable:!0,writable:!0,value:i}):e[n]=i,s=(e,n)=>{for(var i in n||(n={}))F.call(n,i)&&v(e,i,n[i]);if(E)for(var i of E(n))D.call(n,i)&&v(e,i,n[i]);return e},f=(e,n)=>L(e,H(n));import{d as V,r as p,c as R,a as m,w as J,I as G,q as W,x as A,t as q,B as z,C as Y,o as k}from"./vendor.1372b403.js";import{_ as Q}from"./index.5ce605f0.js";class M extends Error{constructor(n,i,o){const c=n.status||n.status===0?n.status:"",l=n.statusText||"",t=`${c} ${l}`.trim(),r=t?`status code ${t}`:"an unknown error";super(`Request failed with ${r}`);this.name="HTTPError",this.response=n,this.request=i,this.options=o}}class N extends Error{constructor(n){super("Request timed out");this.name="TimeoutError",this.request=n}}const b=e=>e!==null&&typeof e=="object",_=(...e)=>{for(const n of e)if((!b(n)||Array.isArray(n))&&typeof n!="undefined")throw new TypeError("The `options` argument must be an object");return S({},...e)},U=(e={},n={})=>{const i=new globalThis.Headers(e),o=n instanceof globalThis.Headers,c=new globalThis.Headers(n);for(const[l,t]of c.entries())o&&t==="undefined"||t===void 0?i.delete(l):i.set(l,t);return i},S=(...e)=>{let n={},i={};for(const o of e)if(Array.isArray(o))Array.isArray(n)||(n=[]),n=[...n,...o];else if(b(o)){for(let[c,l]of Object.entries(o))b(l)&&c in n&&(l=S(n[c],l)),n=f(s({},n),{[c]:l});b(o.headers)&&(i=U(i,o.headers),n.headers=i)}return n},X=typeof globalThis.AbortController=="function",Z=typeof globalThis.ReadableStream=="function",x=typeof globalThis.FormData=="function",j=["get","post","put","patch","head","delete"],ee={json:"application/json",text:"text/*",formData:"multipart/form-data",arrayBuffer:"*/*",blob:"*/*"},T=2147483647,I=Symbol("stop"),te=e=>j.includes(e)?e.toUpperCase():e,ne=["get","put","head","delete","options","trace"],ie=[408,413,429,500,502,503,504],$=[413,429,503],P={limit:2,methods:ne,statusCodes:ie,afterStatusCodes:$,maxRetryAfter:Number.POSITIVE_INFINITY},re=(e={})=>{if(typeof e=="number")return f(s({},P),{limit:e});if(e.methods&&!Array.isArray(e.methods))throw new Error("retry.methods must be an array");if(e.statusCodes&&!Array.isArray(e.statusCodes))throw new Error("retry.statusCodes must be an array");return f(s(s({},P),e),{afterStatusCodes:$})},oe=async(e,n,i)=>new Promise((o,c)=>{const l=setTimeout(()=>{n&&n.abort(),c(new N(e))},i.timeout);i.fetch(e).then(o).catch(c).then(()=>{clearTimeout(l)})}),se=async e=>new Promise(n=>{setTimeout(n,e)});class g{constructor(n,i={}){var o,c;if(this._retryCount=0,this._input=n,this._options=f(s({credentials:this._input.credentials||"same-origin"},i),{headers:U(this._input.headers,i.headers),hooks:S({beforeRequest:[],beforeRetry:[],afterResponse:[]},i.hooks),method:te((o=i.method)!==null&&o!==void 0?o:this._input.method),prefixUrl:String(i.prefixUrl||""),retry:re(i.retry),throwHttpErrors:i.throwHttpErrors!==!1,timeout:typeof i.timeout=="undefined"?1e4:i.timeout,fetch:(c=i.fetch)!==null&&c!==void 0?c:globalThis.fetch.bind(globalThis)}),typeof this._input!="string"&&!(this._input instanceof URL||this._input instanceof globalThis.Request))throw new TypeError("`input` must be a string, URL, or Request");if(this._options.prefixUrl&&typeof this._input=="string"){if(this._input.startsWith("/"))throw new Error("`input` must not begin with a slash when using `prefixUrl`");this._options.prefixUrl.endsWith("/")||(this._options.prefixUrl+="/"),this._input=this._options.prefixUrl+this._input}if(X&&(this.abortController=new globalThis.AbortController,this._options.signal&&this._options.signal.addEventListener("abort",()=>{this.abortController.abort()}),this._options.signal=this.abortController.signal),this.request=new globalThis.Request(this._input,this._options),this._options.searchParams){const l=typeof this._options.searchParams=="string"?this._options.searchParams.replace(/^\?/,""):new URLSearchParams(this._options.searchParams).toString(),t="?"+l,r=this.request.url.replace(/(?:\?.*?)?(?=#|$)/,t);(x&&this._options.body instanceof globalThis.FormData||this._options.body instanceof URLSearchParams)&&!(this._options.headers&&this._options.headers["content-type"])&&this.request.headers.delete("content-type"),this.request=new globalThis.Request(new globalThis.Request(r,this.request),this._options)}this._options.json!==void 0&&(this._options.body=JSON.stringify(this._options.json),this.request.headers.set("content-type","application/json"),this.request=new globalThis.Request(this.request,{body:this._options.body}))}static create(n,i){const o=new g(n,i),c=async()=>{if(o._options.timeout>T)throw new RangeError(`The \`timeout\` option cannot be greater than ${T}`);await Promise.resolve();let r=await o._fetch();for(const a of o._options.hooks.afterResponse){const d=await a(o.request,o._options,o._decorateResponse(r.clone()));d instanceof globalThis.Response&&(r=d)}if(o._decorateResponse(r),!r.ok&&o._options.throwHttpErrors)throw new M(r,o.request,o._options);if(o._options.onDownloadProgress){if(typeof o._options.onDownloadProgress!="function")throw new TypeError("The `onDownloadProgress` option must be a function");if(!Z)throw new Error("Streams are not supported in your environment. `ReadableStream` is missing.");return o._stream(r.clone(),o._options.onDownloadProgress)}return r},t=o._options.retry.methods.includes(o.request.method.toLowerCase())?o._retry(c):c();for(const[r,a]of Object.entries(ee))t[r]=async()=>{o.request.headers.set("accept",o.request.headers.get("accept")||a);const d=(await t).clone();if(r==="json"){if(d.status===204)return"";if(i.parseJson)return i.parseJson(await d.text())}return d[r]()};return t}_calculateRetryDelay(n){if(this._retryCount++,this._retryCount<this._options.retry.limit&&!(n instanceof N)){if(n instanceof M){if(!this._options.retry.statusCodes.includes(n.response.status))return 0;const o=n.response.headers.get("Retry-After");if(o&&this._options.retry.afterStatusCodes.includes(n.response.status)){let c=Number(o);return Number.isNaN(c)?c=Date.parse(o)-Date.now():c*=1e3,typeof this._options.retry.maxRetryAfter!="undefined"&&c>this._options.retry.maxRetryAfter?0:c}if(n.response.status===413)return 0}return .3*2**(this._retryCount-1)*1e3}return 0}_decorateResponse(n){return this._options.parseJson&&(n.json=async()=>this._options.parseJson(await n.text())),n}async _retry(n){try{return await n()}catch(i){const o=Math.min(this._calculateRetryDelay(i),T);if(o!==0&&this._retryCount>0){await se(o);for(const c of this._options.hooks.beforeRetry)if(await c({request:this.request,options:this._options,error:i,retryCount:this._retryCount})===I)return;return this._retry(n)}throw i}}async _fetch(){for(const n of this._options.hooks.beforeRequest){const i=await n(this.request,this._options);if(i instanceof Request){this.request=i;break}if(i instanceof Response)return i}return this._options.timeout===!1?this._options.fetch(this.request.clone()):oe(this.request.clone(),this.abortController,this._options)}_stream(n,i){const o=Number(n.headers.get("content-length"))||0;let c=0;return new globalThis.Response(new globalThis.ReadableStream({async start(l){const t=n.body.getReader();i&&i({percent:0,transferredBytes:0,totalBytes:o},new Uint8Array);async function r(){const{done:a,value:d}=await t.read();if(a){l.close();return}if(i){c+=d.byteLength;const u=o===0?0:c/o;i({percent:u,transferredBytes:c,totalBytes:o},d)}l.enqueue(d),await r()}await r()}}))}}/*! MIT License © Sindre Sorhus */const O=e=>{const n=(i,o)=>g.create(i,_(e,o));for(const i of j)n[i]=(o,c)=>g.create(o,_(e,c,{method:i}));return n.create=i=>O(_(i)),n.extend=i=>O(_(e,i)),n.stop=I,n},ae=O();var de=ae,y={};(function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.Type=e.TypeBuilder=e.VoidKind=e.UndefinedKind=e.PromiseKind=e.FunctionKind=e.ConstructorKind=e.AnyKind=e.UnknownKind=e.NullKind=e.BooleanKind=e.IntegerKind=e.NumberKind=e.StringKind=e.LiteralKind=e.EnumKind=e.ArrayKind=e.RecordKind=e.ObjectKind=e.TupleKind=e.UnionKind=e.IntersectKind=e.KeyOfKind=e.BoxKind=e.ReadonlyModifier=e.OptionalModifier=e.ReadonlyOptionalModifier=void 0,e.ReadonlyOptionalModifier=Symbol("ReadonlyOptionalModifier"),e.OptionalModifier=Symbol("OptionalModifier"),e.ReadonlyModifier=Symbol("ReadonlyModifier"),e.BoxKind=Symbol("BoxKind"),e.KeyOfKind=Symbol("KeyOfKind"),e.IntersectKind=Symbol("IntersectKind"),e.UnionKind=Symbol("UnionKind"),e.TupleKind=Symbol("TupleKind"),e.ObjectKind=Symbol("ObjectKind"),e.RecordKind=Symbol("RecordKind"),e.ArrayKind=Symbol("ArrayKind"),e.EnumKind=Symbol("EnumKind"),e.LiteralKind=Symbol("LiteralKind"),e.StringKind=Symbol("StringKind"),e.NumberKind=Symbol("NumberKind"),e.IntegerKind=Symbol("IntegerKind"),e.BooleanKind=Symbol("BooleanKind"),e.NullKind=Symbol("NullKind"),e.UnknownKind=Symbol("UnknownKind"),e.AnyKind=Symbol("AnyKind"),e.ConstructorKind=Symbol("ConstructorKind"),e.FunctionKind=Symbol("FunctionKind"),e.PromiseKind=Symbol("PromiseKind"),e.UndefinedKind=Symbol("UndefinedKind"),e.VoidKind=Symbol("VoidKind");function n(l){return typeof l=="object"&&l!==null&&!Array.isArray(l)}function i(l){return typeof l=="object"&&l!==null&&Array.isArray(l)}function o(l){return n(l)?Object.keys(l).reduce((t,r)=>f(s({},t),{[r]:o(l[r])}),{}):i(l)?l.map(t=>o(t)):l}class c{ReadonlyOptional(t){return f(s({},t),{modifier:e.ReadonlyOptionalModifier})}Readonly(t){return f(s({},t),{modifier:e.ReadonlyModifier})}Optional(t){return f(s({},t),{modifier:e.OptionalModifier})}Tuple(t,r={}){const a=!1,d=t.length,u=t.length;return t.length>0?f(s({},r),{kind:e.TupleKind,type:"array",items:t,additionalItems:a,minItems:d,maxItems:u}):f(s({},r),{kind:e.TupleKind,type:"array",minItems:d,maxItems:u})}Object(t,r={}){const a=Object.keys(t),d=a.filter(K=>{const w=t[K];return w.modifier&&(w.modifier===e.OptionalModifier||w.modifier===e.ReadonlyOptionalModifier)}),u=a.filter(K=>!d.includes(K)),C=u.length>0?u:void 0;return C?f(s({},r),{kind:e.ObjectKind,type:"object",properties:t,required:C}):f(s({},r),{kind:e.ObjectKind,type:"object",properties:t})}Intersect(t,r={}){return f(s({},r),{kind:e.IntersectKind,type:"object",allOf:t})}Union(t,r={}){return f(s({},r),{kind:e.UnionKind,anyOf:t})}Array(t,r={}){return f(s({},r),{kind:e.ArrayKind,type:"array",items:t})}Enum(t,r={}){const d=Object.keys(t).filter(u=>isNaN(u)).map(u=>t[u]).map(u=>typeof u=="string"?{type:"string",const:u}:{type:"number",const:u});return f(s({},r),{kind:e.EnumKind,anyOf:d})}Literal(t,r={}){return f(s({},r),{kind:e.LiteralKind,const:t,type:typeof t})}String(t={}){return f(s({},t),{kind:e.StringKind,type:"string"})}RegEx(t,r={}){return this.String(f(s({},r),{pattern:t.source}))}Number(t={}){return f(s({},t),{kind:e.NumberKind,type:"number"})}Integer(t={}){return f(s({},t),{kind:e.IntegerKind,type:"integer"})}Boolean(t={}){return f(s({},t),{kind:e.BooleanKind,type:"boolean"})}Null(t={}){return f(s({},t),{kind:e.NullKind,type:"null"})}Unknown(t={}){return f(s({},t),{kind:e.UnknownKind})}Any(t={}){return f(s({},t),{kind:e.AnyKind})}KeyOf(t,r={}){const a=Object.keys(t.properties);return f(s({},r),{kind:e.KeyOfKind,type:"string",enum:a})}Record(t,r,a={}){const d=t.kind===e.UnionKind?`^${t.anyOf.map(u=>u.const).join("|")}$`:t.kind===e.NumberKind?"^(0|[1-9][0-9]*)$":t.pattern?t.pattern:"^.*$";return f(s({},a),{kind:e.RecordKind,type:"object",patternProperties:{[d]:r}})}Required(t,r={}){const a=s(s({},o(t)),r);a.required=Object.keys(a.properties);for(const d of Object.keys(a.properties)){const u=a.properties[d];switch(u.modifier){case e.ReadonlyOptionalModifier:u.modifier=e.ReadonlyModifier;break;case e.ReadonlyModifier:u.modifier=e.ReadonlyModifier;break;case e.OptionalModifier:delete u.modifier;break;default:delete u.modifier;break}}return a}Partial(t,r={}){const a=s(s({},o(t)),r);delete a.required;for(const d of Object.keys(a.properties)){const u=a.properties[d];switch(u.modifier){case e.ReadonlyOptionalModifier:u.modifier=e.ReadonlyOptionalModifier;break;case e.ReadonlyModifier:u.modifier=e.ReadonlyOptionalModifier;break;case e.OptionalModifier:u.modifier=e.OptionalModifier;break;default:u.modifier=e.OptionalModifier;break}}return a}Pick(t,r,a={}){const d=s(s({},o(t)),a);d.required=d.required?d.required.filter(u=>r.includes(u)):void 0;for(const u of Object.keys(d.properties))r.includes(u)||delete d.properties[u];return d}Omit(t,r,a={}){const d=s(s({},o(t)),a);d.required=d.required?d.required.filter(u=>!r.includes(u)):void 0;for(const u of Object.keys(d.properties))r.includes(u)&&delete d.properties[u];return d}Strict(t,r={}){return JSON.parse(JSON.stringify(s(s({},r),t)))}Constructor(t,r,a={}){return f(s({},a),{kind:e.ConstructorKind,type:"constructor",arguments:t,returns:r})}Function(t,r,a={}){return f(s({},a),{kind:e.FunctionKind,type:"function",arguments:t,returns:r})}Promise(t,r={}){return f(s({},r),{type:"promise",kind:e.PromiseKind,item:t})}Undefined(t={}){return f(s({},t),{type:"undefined",kind:e.UndefinedKind})}Void(t={}){return f(s({},t),{type:"void",kind:e.VoidKind})}Rec(t,r={}){const a=r.$id||"",d=t({$ref:`${a}#/definitions/self`});return f(s({},r),{$ref:`${a}#/definitions/self`,definitions:{self:d}})}Box(t,r={}){return f(s({},r),{kind:e.BoxKind,definitions:t})}Ref(...t){const r=t[0].$id||"",a=t[1];return t.length===2?{$ref:`${r}#/definitions/${a}`}:{$ref:r}}}e.TypeBuilder=c,e.Type=new c})(y);var h;(function(e){e.SUCCESS="SUCCESS",e.NO_CHANGE="NO_CHANGE",e.INCORRECT_SECRET="INCORRECT_SECRET"})(h||(h={}));y.Type.Object({code:y.Type.Literal(h.SUCCESS),data:y.Type.Object({commitSha:y.Type.String()})});y.Type.Object({code:y.Type.Literal(h.NO_CHANGE)});y.Type.Object({code:y.Type.Literal(h.INCORRECT_SECRET)});function ue(e){return`An unknown error occurred: ${JSON.stringify(e)}`}function le(e){switch(e.code){case h.NO_CHANGE:return"The website is up-to-date with the Google Sheet; nothing was changed.";case h.SUCCESS:return`A website update has successfully been initiated. You can view the changes by <a href="https://github.com/Vic-Park/vic-park.github.io/commit/${e.data.commitSha}">clicking here.</a>`;case h.INCORRECT_SECRET:return"An incorrect secret was provided.";default:return ue(e)}}const ce=de.extend({prefixUrl:"https://vpci-clubs-auto-update.herokuapp.com"});async function fe(e){try{const n=await e.json();return le(n)}catch{return e.text()}}const ye=V({setup(){const e=p(""),n=p(),i=p(),o=p(!1);async function c(){o.value=!0;try{n.value=void 0,i.value=void 0;const l=await ce.post("update",{json:{secret:e.value},timeout:!1,throwHttpErrors:!1}),t=await fe(l);l.ok?i.value=t:n.value=t}finally{o.value=!1}}return{updateWebsite:c,isLoading:o,secret:e,errorMessage:n,replyMessage:i}}}),he=e=>(z("data-v-33f71438"),e=e(),Y(),e),me={class:"column center h-full max-w-4xl mx-auto"},pe=he(()=>m("p",{class:"text-center px-4"},' To update the website from the values in the Google Sheets, please enter the secret in the following textbox and press the "Update" button. ',-1)),be={class:"mt-2 column items-center"},_e={class:"row"},ge=["disabled"],Ke={class:"mt-2 text-center"},we={key:0,class:"text-red-600"},Re=["innerHTML"];function ke(e,n,i,o,c,l){return k(),R("div",me,[pe,m("div",be,[m("div",_e,[J(m("input",{"onUpdate:modelValue":n[0]||(n[0]=t=>e.secret=t),class:"border-2 rounded-md p-2",placeholder:"Enter the secret here..."},null,512),[[G,e.secret]]),m("button",{disabled:e.isLoading,class:W([[e.isLoading?"bg-gray-500 cursor-wait":"bg-red-dark hover:bg-burgundy"],"p-2 ml-2 rounded-md font-bold text-white"]),onClick:n[1]||(n[1]=(...t)=>e.updateWebsite&&e.updateWebsite(...t))},A(e.isLoading?"Updating...":"Update"),11,ge)]),m("div",Ke,[e.errorMessage!==void 0?(k(),R("div",we,A(e.errorMessage),1)):q("",!0),e.replyMessage!==void 0?(k(),R("div",{key:1,class:"reply-message",innerHTML:e.replyMessage},null,8,Re)):q("",!0)])])])}var Ce=Q(ye,[["render",ke],["__scopeId","data-v-33f71438"]]);export{Ce as default};
