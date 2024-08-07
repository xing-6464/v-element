import{l as Pt,A as ut,d as Tt,h as me,a7 as Ue,k as Ct,y as Ae,o as Ye,c as ze,m as pt,r as _e,N as Ge,Z as Je,p as Ze,J as Bt,w as $t,a as Rt,t as jt,e as St,T as Lt}from"./framework.Dcy6uJZY.js";import{a as Wt,b as De,r as Mt}from"./Icon.vue_vue_type_script_setup_true_lang.B3H2jUux.js";var Nt=/\s/;function Ht(e){for(var t=e.length;t--&&Nt.test(e.charAt(t)););return t}var Vt=/^\s+/;function It(e){return e&&e.slice(0,Ht(e)+1).replace(Vt,"")}var Ke=NaN,Ft=/^[-+]0x[0-9a-f]+$/i,Xt=/^0b[01]+$/i,qt=/^0o[0-7]+$/i,Ut=parseInt;function Qe(e){if(typeof e=="number")return e;if(Wt(e))return Ke;if(De(e)){var t=typeof e.valueOf=="function"?e.valueOf():e;e=De(t)?t+"":t}if(typeof e!="string")return e===0?e:+e;e=It(e);var r=Xt.test(e);return r||qt.test(e)?Ut(e.slice(2),r?2:8):Ft.test(e)?Ke:+e}var ke=function(){return Mt.Date.now()},Yt="Expected a function",zt=Math.max,_t=Math.min;function et(e,t,r){var n,a,o,c,i,s,u=0,f=!1,d=!1,y=!0;if(typeof e!="function")throw new TypeError(Yt);t=Qe(t)||0,De(r)&&(f=!!r.leading,d="maxWait"in r,o=d?zt(Qe(r.maxWait)||0,t):o,y="trailing"in r?!!r.trailing:y);function l(p){var w=n,A=a;return n=a=void 0,u=p,c=e.apply(A,w),c}function x(p){return u=p,i=setTimeout(b,t),f?l(p):c}function g(p){var w=p-s,A=p-u,k=t-w;return d?_t(k,o-A):k}function m(p){var w=p-s,A=p-u;return s===void 0||w>=t||w<0||d&&A>=o}function b(){var p=ke();if(m(p))return E(p);i=setTimeout(b,g(p))}function E(p){return i=void 0,y&&n?l(p):(n=a=void 0,c)}function O(){i!==void 0&&clearTimeout(i),u=0,n=s=a=i=void 0}function h(){return i===void 0?c:E(ke())}function v(){var p=ke(),w=m(p);if(n=arguments,a=this,s=p,w){if(i===void 0)return x(s);if(d)return clearTimeout(i),i=setTimeout(b,t),l(s)}return i===void 0&&(i=setTimeout(b,t)),c}return v.cancel=O,v.flush=h,v}var C="top",S="bottom",L="right",B="left",Ce="auto",fe=[C,S,L,B],Z="start",oe="end",Gt="clippingParents",lt="viewport",ne="popper",Jt="reference",tt=fe.reduce(function(e,t){return e.concat([t+"-"+Z,t+"-"+oe])},[]),vt=[].concat(fe,[Ce]).reduce(function(e,t){return e.concat([t,t+"-"+Z,t+"-"+oe])},[]),Zt="beforeRead",Kt="read",Qt="afterRead",er="beforeMain",tr="main",rr="afterMain",nr="beforeWrite",ar="write",ir="afterWrite",or=[Zt,Kt,Qt,er,tr,rr,nr,ar,ir];function H(e){return e?(e.nodeName||"").toLowerCase():null}function R(e){if(e==null)return window;if(e.toString()!=="[object Window]"){var t=e.ownerDocument;return t&&t.defaultView||window}return e}function G(e){var t=R(e).Element;return e instanceof t||e instanceof Element}function j(e){var t=R(e).HTMLElement;return e instanceof t||e instanceof HTMLElement}function Be(e){if(typeof ShadowRoot>"u")return!1;var t=R(e).ShadowRoot;return e instanceof t||e instanceof ShadowRoot}function sr(e){var t=e.state;Object.keys(t.elements).forEach(function(r){var n=t.styles[r]||{},a=t.attributes[r]||{},o=t.elements[r];!j(o)||!H(o)||(Object.assign(o.style,n),Object.keys(a).forEach(function(c){var i=a[c];i===!1?o.removeAttribute(c):o.setAttribute(c,i===!0?"":i)}))})}function fr(e){var t=e.state,r={popper:{position:t.options.strategy,left:"0",top:"0",margin:"0"},arrow:{position:"absolute"},reference:{}};return Object.assign(t.elements.popper.style,r.popper),t.styles=r,t.elements.arrow&&Object.assign(t.elements.arrow.style,r.arrow),function(){Object.keys(t.elements).forEach(function(n){var a=t.elements[n],o=t.attributes[n]||{},c=Object.keys(t.styles.hasOwnProperty(n)?t.styles[n]:r[n]),i=c.reduce(function(s,u){return s[u]="",s},{});!j(a)||!H(a)||(Object.assign(a.style,i),Object.keys(o).forEach(function(s){a.removeAttribute(s)}))})}}const cr={name:"applyStyles",enabled:!0,phase:"write",fn:sr,effect:fr,requires:["computeStyles"]};function N(e){return e.split("-")[0]}var _=Math.max,ye=Math.min,K=Math.round;function Pe(){var e=navigator.userAgentData;return e!=null&&e.brands&&Array.isArray(e.brands)?e.brands.map(function(t){return t.brand+"/"+t.version}).join(" "):navigator.userAgent}function dt(){return!/^((?!chrome|android).)*safari/i.test(Pe())}function Q(e,t,r){t===void 0&&(t=!1),r===void 0&&(r=!1);var n=e.getBoundingClientRect(),a=1,o=1;t&&j(e)&&(a=e.offsetWidth>0&&K(n.width)/e.offsetWidth||1,o=e.offsetHeight>0&&K(n.height)/e.offsetHeight||1);var c=G(e)?R(e):window,i=c.visualViewport,s=!dt()&&r,u=(n.left+(s&&i?i.offsetLeft:0))/a,f=(n.top+(s&&i?i.offsetTop:0))/o,d=n.width/a,y=n.height/o;return{width:d,height:y,top:f,right:u+d,bottom:f+y,left:u,x:u,y:f}}function $e(e){var t=Q(e),r=e.offsetWidth,n=e.offsetHeight;return Math.abs(t.width-r)<=1&&(r=t.width),Math.abs(t.height-n)<=1&&(n=t.height),{x:e.offsetLeft,y:e.offsetTop,width:r,height:n}}function mt(e,t){var r=t.getRootNode&&t.getRootNode();if(e.contains(t))return!0;if(r&&Be(r)){var n=t;do{if(n&&e.isSameNode(n))return!0;n=n.parentNode||n.host}while(n)}return!1}function V(e){return R(e).getComputedStyle(e)}function ur(e){return["table","td","th"].indexOf(H(e))>=0}function F(e){return((G(e)?e.ownerDocument:e.document)||window.document).documentElement}function be(e){return H(e)==="html"?e:e.assignedSlot||e.parentNode||(Be(e)?e.host:null)||F(e)}function rt(e){return!j(e)||V(e).position==="fixed"?null:e.offsetParent}function pr(e){var t=/firefox/i.test(Pe()),r=/Trident/i.test(Pe());if(r&&j(e)){var n=V(e);if(n.position==="fixed")return null}var a=be(e);for(Be(a)&&(a=a.host);j(a)&&["html","body"].indexOf(H(a))<0;){var o=V(a);if(o.transform!=="none"||o.perspective!=="none"||o.contain==="paint"||["transform","perspective"].indexOf(o.willChange)!==-1||t&&o.willChange==="filter"||t&&o.filter&&o.filter!=="none")return a;a=a.parentNode}return null}function ce(e){for(var t=R(e),r=rt(e);r&&ur(r)&&V(r).position==="static";)r=rt(r);return r&&(H(r)==="html"||H(r)==="body"&&V(r).position==="static")?t:r||pr(e)||t}function Re(e){return["top","bottom"].indexOf(e)>=0?"x":"y"}function ae(e,t,r){return _(e,ye(t,r))}function lr(e,t,r){var n=ae(e,t,r);return n>r?r:n}function ht(){return{top:0,right:0,bottom:0,left:0}}function gt(e){return Object.assign({},ht(),e)}function yt(e,t){return t.reduce(function(r,n){return r[n]=e,r},{})}var vr=function(t,r){return t=typeof t=="function"?t(Object.assign({},r.rects,{placement:r.placement})):t,gt(typeof t!="number"?t:yt(t,fe))};function dr(e){var t,r=e.state,n=e.name,a=e.options,o=r.elements.arrow,c=r.modifiersData.popperOffsets,i=N(r.placement),s=Re(i),u=[B,L].indexOf(i)>=0,f=u?"height":"width";if(!(!o||!c)){var d=vr(a.padding,r),y=$e(o),l=s==="y"?C:B,x=s==="y"?S:L,g=r.rects.reference[f]+r.rects.reference[s]-c[s]-r.rects.popper[f],m=c[s]-r.rects.reference[s],b=ce(o),E=b?s==="y"?b.clientHeight||0:b.clientWidth||0:0,O=g/2-m/2,h=d[l],v=E-y[f]-d[x],p=E/2-y[f]/2+O,w=ae(h,p,v),A=s;r.modifiersData[n]=(t={},t[A]=w,t.centerOffset=w-p,t)}}function mr(e){var t=e.state,r=e.options,n=r.element,a=n===void 0?"[data-popper-arrow]":n;a!=null&&(typeof a=="string"&&(a=t.elements.popper.querySelector(a),!a)||mt(t.elements.popper,a)&&(t.elements.arrow=a))}const hr={name:"arrow",enabled:!0,phase:"main",fn:dr,effect:mr,requires:["popperOffsets"],requiresIfExists:["preventOverflow"]};function ee(e){return e.split("-")[1]}var gr={top:"auto",right:"auto",bottom:"auto",left:"auto"};function yr(e,t){var r=e.x,n=e.y,a=t.devicePixelRatio||1;return{x:K(r*a)/a||0,y:K(n*a)/a||0}}function nt(e){var t,r=e.popper,n=e.popperRect,a=e.placement,o=e.variation,c=e.offsets,i=e.position,s=e.gpuAcceleration,u=e.adaptive,f=e.roundOffsets,d=e.isFixed,y=c.x,l=y===void 0?0:y,x=c.y,g=x===void 0?0:x,m=typeof f=="function"?f({x:l,y:g}):{x:l,y:g};l=m.x,g=m.y;var b=c.hasOwnProperty("x"),E=c.hasOwnProperty("y"),O=B,h=C,v=window;if(u){var p=ce(r),w="clientHeight",A="clientWidth";if(p===R(r)&&(p=F(r),V(p).position!=="static"&&i==="absolute"&&(w="scrollHeight",A="scrollWidth")),p=p,a===C||(a===B||a===L)&&o===oe){h=S;var k=d&&p===v&&v.visualViewport?v.visualViewport.height:p[w];g-=k-n.height,g*=s?1:-1}if(a===B||(a===C||a===S)&&o===oe){O=L;var D=d&&p===v&&v.visualViewport?v.visualViewport.width:p[A];l-=D-n.width,l*=s?1:-1}}var P=Object.assign({position:i},u&&gr),W=f===!0?yr({x:l,y:g},R(r)):{x:l,y:g};if(l=W.x,g=W.y,s){var T;return Object.assign({},P,(T={},T[h]=E?"0":"",T[O]=b?"0":"",T.transform=(v.devicePixelRatio||1)<=1?"translate("+l+"px, "+g+"px)":"translate3d("+l+"px, "+g+"px, 0)",T))}return Object.assign({},P,(t={},t[h]=E?g+"px":"",t[O]=b?l+"px":"",t.transform="",t))}function br(e){var t=e.state,r=e.options,n=r.gpuAcceleration,a=n===void 0?!0:n,o=r.adaptive,c=o===void 0?!0:o,i=r.roundOffsets,s=i===void 0?!0:i,u={placement:N(t.placement),variation:ee(t.placement),popper:t.elements.popper,popperRect:t.rects.popper,gpuAcceleration:a,isFixed:t.options.strategy==="fixed"};t.modifiersData.popperOffsets!=null&&(t.styles.popper=Object.assign({},t.styles.popper,nt(Object.assign({},u,{offsets:t.modifiersData.popperOffsets,position:t.options.strategy,adaptive:c,roundOffsets:s})))),t.modifiersData.arrow!=null&&(t.styles.arrow=Object.assign({},t.styles.arrow,nt(Object.assign({},u,{offsets:t.modifiersData.arrow,position:"absolute",adaptive:!1,roundOffsets:s})))),t.attributes.popper=Object.assign({},t.attributes.popper,{"data-popper-placement":t.placement})}const wr={name:"computeStyles",enabled:!0,phase:"beforeWrite",fn:br,data:{}};var he={passive:!0};function xr(e){var t=e.state,r=e.instance,n=e.options,a=n.scroll,o=a===void 0?!0:a,c=n.resize,i=c===void 0?!0:c,s=R(t.elements.popper),u=[].concat(t.scrollParents.reference,t.scrollParents.popper);return o&&u.forEach(function(f){f.addEventListener("scroll",r.update,he)}),i&&s.addEventListener("resize",r.update,he),function(){o&&u.forEach(function(f){f.removeEventListener("scroll",r.update,he)}),i&&s.removeEventListener("resize",r.update,he)}}const Or={name:"eventListeners",enabled:!0,phase:"write",fn:function(){},effect:xr,data:{}};var Er={left:"right",right:"left",bottom:"top",top:"bottom"};function ge(e){return e.replace(/left|right|bottom|top/g,function(t){return Er[t]})}var Ar={start:"end",end:"start"};function at(e){return e.replace(/start|end/g,function(t){return Ar[t]})}function je(e){var t=R(e),r=t.pageXOffset,n=t.pageYOffset;return{scrollLeft:r,scrollTop:n}}function Se(e){return Q(F(e)).left+je(e).scrollLeft}function kr(e,t){var r=R(e),n=F(e),a=r.visualViewport,o=n.clientWidth,c=n.clientHeight,i=0,s=0;if(a){o=a.width,c=a.height;var u=dt();(u||!u&&t==="fixed")&&(i=a.offsetLeft,s=a.offsetTop)}return{width:o,height:c,x:i+Se(e),y:s}}function Dr(e){var t,r=F(e),n=je(e),a=(t=e.ownerDocument)==null?void 0:t.body,o=_(r.scrollWidth,r.clientWidth,a?a.scrollWidth:0,a?a.clientWidth:0),c=_(r.scrollHeight,r.clientHeight,a?a.scrollHeight:0,a?a.clientHeight:0),i=-n.scrollLeft+Se(e),s=-n.scrollTop;return V(a||r).direction==="rtl"&&(i+=_(r.clientWidth,a?a.clientWidth:0)-o),{width:o,height:c,x:i,y:s}}function Le(e){var t=V(e),r=t.overflow,n=t.overflowX,a=t.overflowY;return/auto|scroll|overlay|hidden/.test(r+a+n)}function bt(e){return["html","body","#document"].indexOf(H(e))>=0?e.ownerDocument.body:j(e)&&Le(e)?e:bt(be(e))}function ie(e,t){var r;t===void 0&&(t=[]);var n=bt(e),a=n===((r=e.ownerDocument)==null?void 0:r.body),o=R(n),c=a?[o].concat(o.visualViewport||[],Le(n)?n:[]):n,i=t.concat(c);return a?i:i.concat(ie(be(c)))}function Te(e){return Object.assign({},e,{left:e.x,top:e.y,right:e.x+e.width,bottom:e.y+e.height})}function Pr(e,t){var r=Q(e,!1,t==="fixed");return r.top=r.top+e.clientTop,r.left=r.left+e.clientLeft,r.bottom=r.top+e.clientHeight,r.right=r.left+e.clientWidth,r.width=e.clientWidth,r.height=e.clientHeight,r.x=r.left,r.y=r.top,r}function it(e,t,r){return t===lt?Te(kr(e,r)):G(t)?Pr(t,r):Te(Dr(F(e)))}function Tr(e){var t=ie(be(e)),r=["absolute","fixed"].indexOf(V(e).position)>=0,n=r&&j(e)?ce(e):e;return G(n)?t.filter(function(a){return G(a)&&mt(a,n)&&H(a)!=="body"}):[]}function Cr(e,t,r,n){var a=t==="clippingParents"?Tr(e):[].concat(t),o=[].concat(a,[r]),c=o[0],i=o.reduce(function(s,u){var f=it(e,u,n);return s.top=_(f.top,s.top),s.right=ye(f.right,s.right),s.bottom=ye(f.bottom,s.bottom),s.left=_(f.left,s.left),s},it(e,c,n));return i.width=i.right-i.left,i.height=i.bottom-i.top,i.x=i.left,i.y=i.top,i}function wt(e){var t=e.reference,r=e.element,n=e.placement,a=n?N(n):null,o=n?ee(n):null,c=t.x+t.width/2-r.width/2,i=t.y+t.height/2-r.height/2,s;switch(a){case C:s={x:c,y:t.y-r.height};break;case S:s={x:c,y:t.y+t.height};break;case L:s={x:t.x+t.width,y:i};break;case B:s={x:t.x-r.width,y:i};break;default:s={x:t.x,y:t.y}}var u=a?Re(a):null;if(u!=null){var f=u==="y"?"height":"width";switch(o){case Z:s[u]=s[u]-(t[f]/2-r[f]/2);break;case oe:s[u]=s[u]+(t[f]/2-r[f]/2);break}}return s}function se(e,t){t===void 0&&(t={});var r=t,n=r.placement,a=n===void 0?e.placement:n,o=r.strategy,c=o===void 0?e.strategy:o,i=r.boundary,s=i===void 0?Gt:i,u=r.rootBoundary,f=u===void 0?lt:u,d=r.elementContext,y=d===void 0?ne:d,l=r.altBoundary,x=l===void 0?!1:l,g=r.padding,m=g===void 0?0:g,b=gt(typeof m!="number"?m:yt(m,fe)),E=y===ne?Jt:ne,O=e.rects.popper,h=e.elements[x?E:y],v=Cr(G(h)?h:h.contextElement||F(e.elements.popper),s,f,c),p=Q(e.elements.reference),w=wt({reference:p,element:O,strategy:"absolute",placement:a}),A=Te(Object.assign({},O,w)),k=y===ne?A:p,D={top:v.top-k.top+b.top,bottom:k.bottom-v.bottom+b.bottom,left:v.left-k.left+b.left,right:k.right-v.right+b.right},P=e.modifiersData.offset;if(y===ne&&P){var W=P[a];Object.keys(D).forEach(function(T){var X=[L,S].indexOf(T)>=0?1:-1,q=[C,S].indexOf(T)>=0?"y":"x";D[T]+=W[q]*X})}return D}function Br(e,t){t===void 0&&(t={});var r=t,n=r.placement,a=r.boundary,o=r.rootBoundary,c=r.padding,i=r.flipVariations,s=r.allowedAutoPlacements,u=s===void 0?vt:s,f=ee(n),d=f?i?tt:tt.filter(function(x){return ee(x)===f}):fe,y=d.filter(function(x){return u.indexOf(x)>=0});y.length===0&&(y=d);var l=y.reduce(function(x,g){return x[g]=se(e,{placement:g,boundary:a,rootBoundary:o,padding:c})[N(g)],x},{});return Object.keys(l).sort(function(x,g){return l[x]-l[g]})}function $r(e){if(N(e)===Ce)return[];var t=ge(e);return[at(e),t,at(t)]}function Rr(e){var t=e.state,r=e.options,n=e.name;if(!t.modifiersData[n]._skip){for(var a=r.mainAxis,o=a===void 0?!0:a,c=r.altAxis,i=c===void 0?!0:c,s=r.fallbackPlacements,u=r.padding,f=r.boundary,d=r.rootBoundary,y=r.altBoundary,l=r.flipVariations,x=l===void 0?!0:l,g=r.allowedAutoPlacements,m=t.options.placement,b=N(m),E=b===m,O=s||(E||!x?[ge(m)]:$r(m)),h=[m].concat(O).reduce(function(J,I){return J.concat(N(I)===Ce?Br(t,{placement:I,boundary:f,rootBoundary:d,padding:u,flipVariations:x,allowedAutoPlacements:g}):I)},[]),v=t.rects.reference,p=t.rects.popper,w=new Map,A=!0,k=h[0],D=0;D<h.length;D++){var P=h[D],W=N(P),T=ee(P)===Z,X=[C,S].indexOf(W)>=0,q=X?"width":"height",$=se(t,{placement:P,boundary:f,rootBoundary:d,altBoundary:y,padding:u}),M=X?T?L:B:T?S:C;v[q]>p[q]&&(M=ge(M));var ue=ge(M),U=[];if(o&&U.push($[W]<=0),i&&U.push($[M]<=0,$[ue]<=0),U.every(function(J){return J})){k=P,A=!1;break}w.set(P,U)}if(A)for(var pe=x?3:1,we=function(I){var re=h.find(function(ve){var Y=w.get(ve);if(Y)return Y.slice(0,I).every(function(xe){return xe})});if(re)return k=re,"break"},te=pe;te>0;te--){var le=we(te);if(le==="break")break}t.placement!==k&&(t.modifiersData[n]._skip=!0,t.placement=k,t.reset=!0)}}const jr={name:"flip",enabled:!0,phase:"main",fn:Rr,requiresIfExists:["offset"],data:{_skip:!1}};function ot(e,t,r){return r===void 0&&(r={x:0,y:0}),{top:e.top-t.height-r.y,right:e.right-t.width+r.x,bottom:e.bottom-t.height+r.y,left:e.left-t.width-r.x}}function st(e){return[C,L,S,B].some(function(t){return e[t]>=0})}function Sr(e){var t=e.state,r=e.name,n=t.rects.reference,a=t.rects.popper,o=t.modifiersData.preventOverflow,c=se(t,{elementContext:"reference"}),i=se(t,{altBoundary:!0}),s=ot(c,n),u=ot(i,a,o),f=st(s),d=st(u);t.modifiersData[r]={referenceClippingOffsets:s,popperEscapeOffsets:u,isReferenceHidden:f,hasPopperEscaped:d},t.attributes.popper=Object.assign({},t.attributes.popper,{"data-popper-reference-hidden":f,"data-popper-escaped":d})}const Lr={name:"hide",enabled:!0,phase:"main",requiresIfExists:["preventOverflow"],fn:Sr};function Wr(e,t,r){var n=N(e),a=[B,C].indexOf(n)>=0?-1:1,o=typeof r=="function"?r(Object.assign({},t,{placement:e})):r,c=o[0],i=o[1];return c=c||0,i=(i||0)*a,[B,L].indexOf(n)>=0?{x:i,y:c}:{x:c,y:i}}function Mr(e){var t=e.state,r=e.options,n=e.name,a=r.offset,o=a===void 0?[0,0]:a,c=vt.reduce(function(f,d){return f[d]=Wr(d,t.rects,o),f},{}),i=c[t.placement],s=i.x,u=i.y;t.modifiersData.popperOffsets!=null&&(t.modifiersData.popperOffsets.x+=s,t.modifiersData.popperOffsets.y+=u),t.modifiersData[n]=c}const Nr={name:"offset",enabled:!0,phase:"main",requires:["popperOffsets"],fn:Mr};function Hr(e){var t=e.state,r=e.name;t.modifiersData[r]=wt({reference:t.rects.reference,element:t.rects.popper,strategy:"absolute",placement:t.placement})}const Vr={name:"popperOffsets",enabled:!0,phase:"read",fn:Hr,data:{}};function Ir(e){return e==="x"?"y":"x"}function Fr(e){var t=e.state,r=e.options,n=e.name,a=r.mainAxis,o=a===void 0?!0:a,c=r.altAxis,i=c===void 0?!1:c,s=r.boundary,u=r.rootBoundary,f=r.altBoundary,d=r.padding,y=r.tether,l=y===void 0?!0:y,x=r.tetherOffset,g=x===void 0?0:x,m=se(t,{boundary:s,rootBoundary:u,padding:d,altBoundary:f}),b=N(t.placement),E=ee(t.placement),O=!E,h=Re(b),v=Ir(h),p=t.modifiersData.popperOffsets,w=t.rects.reference,A=t.rects.popper,k=typeof g=="function"?g(Object.assign({},t.rects,{placement:t.placement})):g,D=typeof k=="number"?{mainAxis:k,altAxis:k}:Object.assign({mainAxis:0,altAxis:0},k),P=t.modifiersData.offset?t.modifiersData.offset[t.placement]:null,W={x:0,y:0};if(p){if(o){var T,X=h==="y"?C:B,q=h==="y"?S:L,$=h==="y"?"height":"width",M=p[h],ue=M+m[X],U=M-m[q],pe=l?-A[$]/2:0,we=E===Z?w[$]:A[$],te=E===Z?-A[$]:-w[$],le=t.elements.arrow,J=l&&le?$e(le):{width:0,height:0},I=t.modifiersData["arrow#persistent"]?t.modifiersData["arrow#persistent"].padding:ht(),re=I[X],ve=I[q],Y=ae(0,w[$],J[$]),xe=O?w[$]/2-pe-Y-re-D.mainAxis:we-Y-re-D.mainAxis,xt=O?-w[$]/2+pe+Y+ve+D.mainAxis:te+Y+ve+D.mainAxis,Oe=t.elements.arrow&&ce(t.elements.arrow),Ot=Oe?h==="y"?Oe.clientTop||0:Oe.clientLeft||0:0,We=(T=P==null?void 0:P[h])!=null?T:0,Et=M+xe-We-Ot,At=M+xt-We,Me=ae(l?ye(ue,Et):ue,M,l?_(U,At):U);p[h]=Me,W[h]=Me-M}if(i){var Ne,kt=h==="x"?C:B,Dt=h==="x"?S:L,z=p[v],de=v==="y"?"height":"width",He=z+m[kt],Ve=z-m[Dt],Ee=[C,B].indexOf(b)!==-1,Ie=(Ne=P==null?void 0:P[v])!=null?Ne:0,Fe=Ee?He:z-w[de]-A[de]-Ie+D.altAxis,Xe=Ee?z+w[de]+A[de]-Ie-D.altAxis:Ve,qe=l&&Ee?lr(Fe,z,Xe):ae(l?Fe:He,z,l?Xe:Ve);p[v]=qe,W[v]=qe-z}t.modifiersData[n]=W}}const Xr={name:"preventOverflow",enabled:!0,phase:"main",fn:Fr,requiresIfExists:["offset"]};function qr(e){return{scrollLeft:e.scrollLeft,scrollTop:e.scrollTop}}function Ur(e){return e===R(e)||!j(e)?je(e):qr(e)}function Yr(e){var t=e.getBoundingClientRect(),r=K(t.width)/e.offsetWidth||1,n=K(t.height)/e.offsetHeight||1;return r!==1||n!==1}function zr(e,t,r){r===void 0&&(r=!1);var n=j(t),a=j(t)&&Yr(t),o=F(t),c=Q(e,a,r),i={scrollLeft:0,scrollTop:0},s={x:0,y:0};return(n||!n&&!r)&&((H(t)!=="body"||Le(o))&&(i=Ur(t)),j(t)?(s=Q(t,!0),s.x+=t.clientLeft,s.y+=t.clientTop):o&&(s.x=Se(o))),{x:c.left+i.scrollLeft-s.x,y:c.top+i.scrollTop-s.y,width:c.width,height:c.height}}function _r(e){var t=new Map,r=new Set,n=[];e.forEach(function(o){t.set(o.name,o)});function a(o){r.add(o.name);var c=[].concat(o.requires||[],o.requiresIfExists||[]);c.forEach(function(i){if(!r.has(i)){var s=t.get(i);s&&a(s)}}),n.push(o)}return e.forEach(function(o){r.has(o.name)||a(o)}),n}function Gr(e){var t=_r(e);return or.reduce(function(r,n){return r.concat(t.filter(function(a){return a.phase===n}))},[])}function Jr(e){var t;return function(){return t||(t=new Promise(function(r){Promise.resolve().then(function(){t=void 0,r(e())})})),t}}function Zr(e){var t=e.reduce(function(r,n){var a=r[n.name];return r[n.name]=a?Object.assign({},a,n,{options:Object.assign({},a.options,n.options),data:Object.assign({},a.data,n.data)}):n,r},{});return Object.keys(t).map(function(r){return t[r]})}var ft={placement:"bottom",modifiers:[],strategy:"absolute"};function ct(){for(var e=arguments.length,t=new Array(e),r=0;r<e;r++)t[r]=arguments[r];return!t.some(function(n){return!(n&&typeof n.getBoundingClientRect=="function")})}function Kr(e){e===void 0&&(e={});var t=e,r=t.defaultModifiers,n=r===void 0?[]:r,a=t.defaultOptions,o=a===void 0?ft:a;return function(i,s,u){u===void 0&&(u=o);var f={placement:"bottom",orderedModifiers:[],options:Object.assign({},ft,o),modifiersData:{},elements:{reference:i,popper:s},attributes:{},styles:{}},d=[],y=!1,l={state:f,setOptions:function(b){var E=typeof b=="function"?b(f.options):b;g(),f.options=Object.assign({},o,f.options,E),f.scrollParents={reference:G(i)?ie(i):i.contextElement?ie(i.contextElement):[],popper:ie(s)};var O=Gr(Zr([].concat(n,f.options.modifiers)));return f.orderedModifiers=O.filter(function(h){return h.enabled}),x(),l.update()},forceUpdate:function(){if(!y){var b=f.elements,E=b.reference,O=b.popper;if(ct(E,O)){f.rects={reference:zr(E,ce(O),f.options.strategy==="fixed"),popper:$e(O)},f.reset=!1,f.placement=f.options.placement,f.orderedModifiers.forEach(function(D){return f.modifiersData[D.name]=Object.assign({},D.data)});for(var h=0;h<f.orderedModifiers.length;h++){if(f.reset===!0){f.reset=!1,h=-1;continue}var v=f.orderedModifiers[h],p=v.fn,w=v.options,A=w===void 0?{}:w,k=v.name;typeof p=="function"&&(f=p({state:f,options:A,name:k,instance:l})||f)}}}},update:Jr(function(){return new Promise(function(m){l.forceUpdate(),m(f)})}),destroy:function(){g(),y=!0}};if(!ct(i,s))return l;l.setOptions(u).then(function(m){!y&&u.onFirstUpdate&&u.onFirstUpdate(m)});function x(){f.orderedModifiers.forEach(function(m){var b=m.name,E=m.options,O=E===void 0?{}:E,h=m.effect;if(typeof h=="function"){var v=h({state:f,name:b,instance:l,options:O}),p=function(){};d.push(v||p)}})}function g(){d.forEach(function(m){return m()}),d=[]}return l}}var Qr=[Or,Vr,wr,cr,Nr,jr,Xr,hr,Lr],en=Kr({defaultModifiers:Qr});function tn(e,t){const r=n=>{e.value&&n.target&&(e.value.contains(n.target)||t(n))};Pt(()=>{document.addEventListener("click",r)}),ut(()=>{document.removeEventListener("click",r)})}const rn=pt("div",{id:"arrow","data-popper-arrow":""},null,-1),on=Tt({name:"XTooltip",__name:"Tooltip",props:{content:{},trigger:{default:"hover"},placement:{default:"bottom"},manual:{type:Boolean},popperOptions:{},transition:{default:"fade"},openDelay:{default:0},closeDelay:{default:0}},emits:["visible-change","click-outside"],setup(e,{expose:t,emit:r}){const n=e,a=r,o=me(!1),c=me(),i=me(),s=me();let u=null,f=Ue({}),d=Ue({});const y=Ct(()=>({placement:n.placement,modifiers:[{name:"offset",options:{offset:[0,9]}}],...n.popperOptions}));Ae(o,v=>{v&&(i.value&&c.value?u=en(i.value,c.value,y.value):u==null||u.destroy())},{flush:"post"}),Ae(()=>n.trigger,(v,p)=>{v!==p&&(f={},d={},O())}),Ae(()=>n.manual,v=>{v?(f={},d={}):O()});const l=et(b,n.openDelay),x=et(E,n.closeDelay),g=()=>{x.cancel(),l()},m=()=>{l.cancel(),x()};tn(s,()=>{n.trigger==="click"&&o.value&&!n.manual&&m(),o.value&&a("click-outside",!0)});function b(){o.value=!0,a("visible-change",!0)}function E(){o.value=!1,a("visible-change",!1)}function O(){n.trigger==="hover"?(f.mouseenter=g,d.mouseleave=m):n.trigger==="click"&&(f.click=h)}n.manual||O();function h(){o.value?m():g()}return ut(()=>{u==null||u.destroy()}),t({show:g,hide:m}),(v,p)=>(Ye(),ze("div",Ge({class:"x-tooltip"},Je(Ze(d),!0),{ref_key:"popperContainerNode",ref:s}),[pt("div",Ge({class:"x-tooltip__trigger",ref_key:"triggerNode",ref:i},Je(Ze(f),!0)),[_e(v.$slots,"default")],16),Bt(Lt,{name:v.transition},{default:$t(()=>[o.value?(Ye(),ze("div",{key:0,class:"x-tooltip__popper",ref_key:"popperNode",ref:c},[_e(v.$slots,"content",{},()=>[Rt(jt(v.content),1)]),rn],512)):St("",!0)]),_:3},8,["name"])],16))}});export{on as _,et as d};
