function z(e,n){let t=e.slice(0,n).split(/\r\n|\n|\r/g);return[t.length,t.pop().length+1]}function K(e,n,t){let l=e.split(/\r\n|\n|\r/g),i="",r=(Math.log10(n+1)|0)+1;for(let o=n-1;o<=n+1;o++){let f=l[o-1];f&&(i+=o.toString().padEnd(r," "),i+=":  ",i+=f,i+=`
`,o===n&&(i+=" ".repeat(r+t+2),i+=`^
`))}return i}var c=class extends Error{line;column;codeblock;constructor(n,t){let[l,i]=z(t.toml,t.ptr),r=K(t.toml,l,i);super(`Invalid TOML document: ${n}

${r}`,t),this.line=l,this.column=i,this.codeblock=r}};function w(e,n=0,t=e.length){let l=e.indexOf(`
`,n);return e[l-1]==="\r"&&l--,l<=t?l:-1}function g(e,n){for(let t=n;t<e.length;t++){let l=e[t];if(l===`
`)return t;if(l==="\r"&&e[t+1]===`
`)return t+1;if(l<" "&&l!=="	"||l==="\x7F")throw new c("control characters are not allowed in comments",{toml:e,ptr:n})}return e.length}function m(e,n,t,l){let i;for(;(i=e[n])===" "||i==="	"||!t&&(i===`
`||i==="\r"&&e[n+1]===`
`);)n++;return l||i!=="#"?n:m(e,g(e,n),t)}function O(e,n,t,l,i=!1){if(!l)return n=w(e,n),n<0?e.length:n;for(let r=n;r<e.length;r++){let o=e[r];if(o==="#")r=w(e,r);else{if(o===t)return r+1;if(o===l||i&&(o===`
`||o==="\r"&&e[r+1]===`
`))return r}}throw new c("cannot find end of structure",{toml:e,ptr:n})}function b(e,n){let t=e[n],l=t===e[n+1]&&e[n+1]===e[n+2]?e.slice(n,n+3):t;n+=l.length-1;do n=e.indexOf(l,++n);while(n>-1&&t!=="'"&&e[n-1]==="\\"&&(e[n-2]!=="\\"||e[n-3]==="\\"));return n>-1&&(n+=l.length,l.length>1&&(e[n]===t&&n++,e[n]===t&&n++)),n}var M=/^(\d{4}-\d{2}-\d{2})?[T ]?(?:(\d{2}):\d{2}:\d{2}(?:\.\d+)?)?(Z|[-+]\d{2}:\d{2})?$/i,h=class e extends Date{#n=!1;#t=!1;#e=null;constructor(n){let t=!0,l=!0,i="Z";if(typeof n=="string"){let r=n.match(M);r?(r[1]||(t=!1,n=`0000-01-01T${n}`),l=!!r[2],l&&n[10]===" "&&(n=n.replace(" ","T")),r[2]&&+r[2]>23?n="":(i=r[3]||null,n=n.toUpperCase(),!i&&l&&(n+="Z"))):n=""}super(n),isNaN(this.getTime())||(this.#n=t,this.#t=l,this.#e=i)}isDateTime(){return this.#n&&this.#t}isLocal(){return!this.#n||!this.#t||!this.#e}isDate(){return this.#n&&!this.#t}isTime(){return this.#t&&!this.#n}isValid(){return this.#n||this.#t}toISOString(){let n=super.toISOString();if(this.isDate())return n.slice(0,10);if(this.isTime())return n.slice(11,23);if(this.#e===null)return n.slice(0,-1);if(this.#e==="Z")return n;let t=+this.#e.slice(1,3)*60+ +this.#e.slice(4,6);return t=this.#e[0]==="-"?t:-t,new Date(this.getTime()-t*6e4).toISOString().slice(0,-1)+this.#e}static wrapAsOffsetDateTime(n,t="Z"){let l=new e(n);return l.#e=t,l}static wrapAsLocalDateTime(n){let t=new e(n);return t.#e=null,t}static wrapAsLocalDate(n){let t=new e(n);return t.#t=!1,t.#e=null,t}static wrapAsLocalTime(n){let t=new e(n);return t.#n=!1,t.#e=null,t}};var v=/^((0x[0-9a-fA-F](_?[0-9a-fA-F])*)|(([+-]|0[ob])?\d(_?\d)*))$/,G=/^[+-]?\d(_?\d)*(\.\d(_?\d)*)?([eE][+-]?\d(_?\d)*)?$/,U=/^[+-]?0[0-9_]/,X=/^[0-9a-f]{4,8}$/i,$={b:"\b",t:"	",n:`
`,f:"\f",r:"\r",'"':'"',"\\":"\\"};function E(e,n=0,t=e.length){let l=e[n]==="'",i=e[n++]===e[n]&&e[n]===e[n+1];i&&(t-=2,e[n+=2]==="\r"&&n++,e[n]===`
`&&n++);let r=0,o,f="",u=n;for(;n<t-1;){let a=e[n++];if(a===`
`||a==="\r"&&e[n]===`
`){if(!i)throw new c("newlines are not allowed in strings",{toml:e,ptr:n-1})}else if(a<" "&&a!=="	"||a==="\x7F")throw new c("control characters are not allowed in strings",{toml:e,ptr:n-1});if(o){if(o=!1,a==="u"||a==="U"){let d=e.slice(n,n+=a==="u"?4:8);if(!X.test(d))throw new c("invalid unicode escape",{toml:e,ptr:r});try{f+=String.fromCodePoint(parseInt(d,16))}catch{throw new c("invalid unicode escape",{toml:e,ptr:r})}}else if(i&&(a===`
`||a===" "||a==="	"||a==="\r")){if(n=m(e,n-1,!0),e[n]!==`
`&&e[n]!=="\r")throw new c("invalid escape: only line-ending whitespace may be escaped",{toml:e,ptr:r});n=m(e,n)}else if(a in $)f+=$[a];else throw new c("unrecognized escape sequence",{toml:e,ptr:r});u=n}else!l&&a==="\\"&&(r=n-1,o=!0,f+=e.slice(u,r))}return f+e.slice(u,t-1)}function D(e,n,t,l){if(e==="true")return!0;if(e==="false")return!1;if(e==="-inf")return-1/0;if(e==="inf"||e==="+inf")return 1/0;if(e==="nan"||e==="+nan"||e==="-nan")return NaN;if(e==="-0")return l?0n:0;let i=v.test(e);if(i||G.test(e)){if(U.test(e))throw new c("leading zeroes are not allowed",{toml:n,ptr:t});e=e.replace(/_/g,"");let o=+e;if(isNaN(o))throw new c("invalid number",{toml:n,ptr:t});if(i){if((i=!Number.isSafeInteger(o))&&!l)throw new c("integer value cannot be represented losslessly",{toml:n,ptr:t});(i||l===!0)&&(o=BigInt(e))}return o}let r=new h(e);if(!r.isValid())throw new c("invalid value",{toml:n,ptr:t});return r}function Y(e,n,t,l){let i=e.slice(n,t),r=i.indexOf("#");r>-1&&(g(e,r),i=i.slice(0,r));let o=i.trimEnd();if(!l){let f=i.indexOf(`
`,o.length);if(f>-1)throw new c("newlines are not allowed in inline tables",{toml:e,ptr:n+f})}return[o,r]}function p(e,n,t,l,i){if(l===0)throw new c("document contains excessively nested structures. aborting.",{toml:e,ptr:n});let r=e[n];if(r==="["||r==="{"){let[u,a]=r==="["?V(e,n,l,i):A(e,n,l,i),d=t?O(e,a,",",t):a;if(a-d&&t==="}"){let s=w(e,a,d);if(s>-1)throw new c("newlines are not allowed in inline tables",{toml:e,ptr:s})}return[u,d]}let o;if(r==='"'||r==="'"){o=b(e,n);let u=E(e,n,o);if(t){if(o=m(e,o,t!=="]"),e[o]&&e[o]!==","&&e[o]!==t&&e[o]!==`
`&&e[o]!=="\r")throw new c("unexpected character encountered",{toml:e,ptr:o});o+=+(e[o]===",")}return[u,o]}o=O(e,n,",",t);let f=Y(e,n,o-+(e[o-1]===","),t==="]");if(!f[0])throw new c("incomplete key-value declaration: no value specified",{toml:e,ptr:n});return t&&f[1]>-1&&(o=m(e,n+f[1]),o+=+(e[o]===",")),[D(f[0],e,n,i),o]}var q=/^[a-zA-Z0-9-_]+[ \t]*$/;function T(e,n,t="="){let l=n-1,i=[],r=e.indexOf(t,n);if(r<0)throw new c("incomplete key-value: cannot find end of key",{toml:e,ptr:n});do{let o=e[n=++l];if(o!==" "&&o!=="	")if(o==='"'||o==="'"){if(o===e[n+1]&&o===e[n+2])throw new c("multiline strings are not allowed in keys",{toml:e,ptr:n});let f=b(e,n);if(f<0)throw new c("unfinished string encountered",{toml:e,ptr:n});l=e.indexOf(".",f);let u=e.slice(f,l<0||l>r?r:l),a=w(u);if(a>-1)throw new c("newlines are not allowed in keys",{toml:e,ptr:n+l+a});if(u.trimStart())throw new c("found extra tokens after the string part",{toml:e,ptr:f});if(r<f&&(r=e.indexOf(t,f),r<0))throw new c("incomplete key-value: cannot find end of key",{toml:e,ptr:n});i.push(E(e,n,f))}else{l=e.indexOf(".",n);let f=e.slice(n,l<0||l>r?r:l);if(!q.test(f))throw new c("only letter, numbers, dashes and underscores are allowed in keys",{toml:e,ptr:n});i.push(f.trimEnd())}}while(l+1&&l<r);return[i,m(e,r+1,!0,!0)]}function A(e,n,t,l){let i={},r=new Set,o,f=0;for(n++;(o=e[n++])!=="}"&&o;){let u={toml:e,ptr:n-1};if(o===`
`)throw new c("newlines are not allowed in inline tables",u);if(o==="#")throw new c("inline tables cannot contain comments",u);if(o===",")throw new c("expected key-value, found comma",u);if(o!==" "&&o!=="	"){let a,d=i,s=!1,[I,Z]=T(e,n-1);for(let x=0;x<I.length;x++){if(x&&(d=s?d[a]:d[a]={}),a=I[x],(s=Object.hasOwn(d,a))&&(typeof d[a]!="object"||r.has(d[a])))throw new c("trying to redefine an already defined value",{toml:e,ptr:n});!s&&a==="__proto__"&&Object.defineProperty(d,a,{enumerable:!0,configurable:!0,writable:!0})}if(s)throw new c("trying to redefine an already defined value",{toml:e,ptr:n});let[N,j]=p(e,Z,"}",t-1,l);r.add(N),d[a]=N,n=j,f=e[n-1]===","?n-1:0}}if(f)throw new c("trailing commas are not allowed in inline tables",{toml:e,ptr:f});if(!o)throw new c("unfinished table encountered",{toml:e,ptr:n});return[i,n]}function V(e,n,t,l){let i=[],r;for(n++;(r=e[n++])!=="]"&&r;){if(r===",")throw new c("expected value, found comma",{toml:e,ptr:n-1});if(r==="#")n=g(e,n);else if(r!==" "&&r!=="	"&&r!==`
`&&r!=="\r"){let o=p(e,n-1,"]",t-1,l);i.push(o[0]),n=o[1]}}if(!r)throw new c("unfinished array encountered",{toml:e,ptr:n});return[i,n]}function C(e,n,t,l){let i=n,r=t,o,f=!1,u;for(let a=0;a<e.length;a++){if(a){if(i=f?i[o]:i[o]={},r=(u=r[o]).c,l===0&&(u.t===1||u.t===2))return null;if(u.t===2){let d=i.length-1;i=i[d],r=r[d].c}}if(o=e[a],(f=Object.hasOwn(i,o))&&r[o]?.t===0&&r[o]?.d)return null;f||(o==="__proto__"&&(Object.defineProperty(i,o,{enumerable:!0,configurable:!0,writable:!0}),Object.defineProperty(r,o,{enumerable:!0,configurable:!0,writable:!0})),r[o]={t:a<e.length-1&&l===2?3:l,d:!1,i:0,c:{}})}if(u=r[o],u.t!==l&&!(l===1&&u.t===3)||(l===2&&(u.d||(u.d=!0,i[o]=[]),i[o].push(i={}),u.c[u.i++]=u={t:1,d:!1,i:0,c:{}}),u.d))return null;if(u.d=!0,l===1)i=f?i[o]:i[o]={};else if(l===0&&f)return null;return[o,i,u.c]}function L(e,{maxDepth:n=1e3,integersAsBigInt:t}={}){let l={},i={},r=l,o=i;for(let f=m(e,0);f<e.length;){if(e[f]==="["){let u=e[++f]==="[",a=T(e,f+=+u,"]");if(u){if(e[a[1]-1]!=="]")throw new c("expected end of table declaration",{toml:e,ptr:a[1]-1});a[1]++}let d=C(a[0],l,i,u?2:1);if(!d)throw new c("trying to redefine an already defined table or value",{toml:e,ptr:f});o=d[2],r=d[1],f=a[1]}else{let u=T(e,f),a=C(u[0],r,o,0);if(!a)throw new c("trying to redefine an already defined table or value",{toml:e,ptr:f});let d=p(e,u[1],void 0,n,t);a[1][a[0]]=d[0],f=d[1]}if(f=m(e,f,!0),e[f]&&e[f]!==`
`&&e[f]!=="\r")throw new c("each key-value declaration must be followed by an end-of-line",{toml:e,ptr:f});f=m(e,f)}return l}var P=/^[a-z0-9-_]+$/i;function y(e){let n=typeof e;if(n==="object"){if(Array.isArray(e))return"array";if(e instanceof Date)return"date"}return n}function F(e){for(let n=0;n<e.length;n++)if(y(e[n])!=="object")return!1;return e.length!=0}function S(e){return JSON.stringify(e).replace(/\x7f/g,"\\u007f")}function _(e,n,t,l){if(t===0)throw new Error("Could not stringify the object: maximum object depth exceeded");if(n==="number")return isNaN(e)?"nan":e===1/0?"inf":e===-1/0?"-inf":l&&Number.isInteger(e)?e.toFixed(1):e.toString();if(n==="bigint"||n==="boolean")return e.toString();if(n==="string")return S(e);if(n==="date"){if(isNaN(e.getTime()))throw new TypeError("cannot serialize invalid date");return e.toISOString()}if(n==="object")return J(e,t,l);if(n==="array")return H(e,t,l)}function J(e,n,t){let l=Object.keys(e);if(l.length===0)return"{}";let i="{ ";for(let r=0;r<l.length;r++){let o=l[r];r&&(i+=", "),i+=P.test(o)?o:S(o),i+=" = ",i+=_(e[o],y(e[o]),n-1,t)}return i+" }"}function H(e,n,t){if(e.length===0)return"[]";let l="[ ";for(let i=0;i<e.length;i++){if(i&&(l+=", "),e[i]===null||e[i]===void 0)throw new TypeError("arrays cannot contain null or undefined values");l+=_(e[i],y(e[i]),n-1,t)}return l+" ]"}function Q(e,n,t,l){if(t===0)throw new Error("Could not stringify the object: maximum object depth exceeded");let i="";for(let r=0;r<e.length;r++)i+=`[[${n}]]
`,i+=k(e[r],n,t,l),i+=`

`;return i}function k(e,n,t,l){if(t===0)throw new Error("Could not stringify the object: maximum object depth exceeded");let i="",r="",o=Object.keys(e);for(let f=0;f<o.length;f++){let u=o[f];if(e[u]!==null&&e[u]!==void 0){let a=y(e[u]);if(a==="symbol"||a==="function")throw new TypeError(`cannot serialize values of type '${a}'`);let d=P.test(u)?u:S(u);if(a==="array"&&F(e[u]))r+=Q(e[u],n?`${n}.${d}`:d,t-1,l);else if(a==="object"){let s=n?`${n}.${d}`:d;r+=`[${s}]
`,r+=k(e[u],s,t-1,l),r+=`

`}else i+=d,i+=" = ",i+=_(e[u],a,t,l),i+=`
`}}return`${i}
${r}`.trim()}function R(e,{maxDepth:n=1e3,numbersAsFloat:t=!1}={}){if(y(e)!=="object")throw new TypeError("stringify can only be called with an object");return k(e,"",n,t)}var ke={parse:L,stringify:R,TomlDate:h,TomlError:c};export{h as TomlDate,c as TomlError,ke as default,L as parse,R as stringify};
/*! Bundled license information:

smol-toml/dist/error.js:
smol-toml/dist/util.js:
smol-toml/dist/date.js:
smol-toml/dist/primitive.js:
smol-toml/dist/extract.js:
smol-toml/dist/struct.js:
smol-toml/dist/parse.js:
smol-toml/dist/stringify.js:
smol-toml/dist/index.js:
  (*!
   * Copyright (c) Squirrel Chat et al., All rights reserved.
   * SPDX-License-Identifier: BSD-3-Clause
   *
   * Redistribution and use in source and binary forms, with or without
   * modification, are permitted provided that the following conditions are met:
   *
   * 1. Redistributions of source code must retain the above copyright notice, this
   *    list of conditions and the following disclaimer.
   * 2. Redistributions in binary form must reproduce the above copyright notice,
   *    this list of conditions and the following disclaimer in the
   *    documentation and/or other materials provided with the distribution.
   * 3. Neither the name of the copyright holder nor the names of its contributors
   *    may be used to endorse or promote products derived from this software without
   *    specific prior written permission.
   *
   * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
   * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
   * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
   * DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
   * FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
   * DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
   * SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
   * CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
   * OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
   * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
   *)
*/
//# sourceMappingURL=index.js.map
