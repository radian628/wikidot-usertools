"use strict";(()=>{function k(o,n){let e=[],p=n.limits.reduce((i,a)=>Math.max(i,a.duration),0),c=[],t=new Set;setInterval(()=>{for(;;){let i=e.at(0);if(!i)return;let a=Date.now();if(c=c.filter(r=>(a-r.time)/1e3<=p),t.size>=n.maxConcurrentRequests)return;for(let r of n.limits){let u=0;for(let m of c)(a-m.time)/1e3<=r.duration&&u++;if(u>=r.maxRequests)return}e.shift(),c.push({time:Date.now()});let d=o(...i.params);t.add(d),(async()=>{let r=await d;i.callback(r),t.delete(d)})()}});let s=(...i)=>new Promise((a,d)=>{e.push({params:i,callback:r=>{a(r)}})});return s._throttled=!0,s}async function P(o){return await(await fetch("https://apiv1.crom.avn.sh/graphql",{body:JSON.stringify({query:o}),method:"POST",mode:"cors",headers:{"Content-Type":"application/json"}})).json()}async function l(o,n){let e,p=[];for(;;){let c=`{
  pages(filter: ${o}, first: 100${e?`, after: "${e}"`:""}) {
    edges {
      node ${n} 
    },
    pageInfo {
      hasNextPage,
      endCursor
    }
  }
}`,t=await P(c);if(p.push(...t.data.pages.edges.map(s=>s.node)),!t.data.pages.pageInfo.hasNextPage)break;e=t.data.pages.pageInfo.endCursor}return p}var h=`http://scp-wiki.wikidot.com/9000booblesnoot
9966
9006
9886
9116
9669

http://scp-wiki.wikidot.com/9000cakoh
9099
9747
9084
9317
9039

http://scp-wiki.wikidot.com/9000contest8bitbreadbox
9125
9555
9005
9375
9336

http://scp-wiki.wikidot.com/9000contestaftokrator
9800
9008
900X
9X00
9XXX

http://scp-wiki.wikidot.com/9000contestaismallard
9994
9201
9301
9015
9102

http://scp-wiki.wikidot.com/9000contestaldi-shopper
9005
9055
9555
9500
9XYZ

http://scp-wiki.wikidot.com/9000contestalexdiflip
9109
9099
9025
9250
9101

http://scp-wiki.wikidot.com/9000contestalphaastrox
9500
9200
9100
9050
9028

http://scp-wiki.wikidot.com/9000contestampyrreference
9140
9000
9014
9410
9041

http://scp-wiki.wikidot.com/9000contestanactualcrow
9999
9001
9500
9900

http://scp-wiki.wikidot.com/9000contestanimalhospital
9XYZ

http://scp-wiki.wikidot.com/9000contestanorrack
9016
9018
9326
9720
9929

http://scp-wiki.wikidot.com/9000contestanyar
900X
9X00
9682
9333
9339

http://scp-wiki.wikidot.com/9000contestape5
9001
9998
9008
9888
9808

http://scp-wiki.wikidot.com/9000contestarclund
9008
9100
9800
9042
9014

http://scp-wiki.wikidot.com/9000contestariadnesthread
9028
9900
9500
9800
9200

http://scp-wiki.wikidot.com/9000contestastersynth
9231
9876
9X00
900X

http://scp-wiki.wikidot.com/9000contestastralnavigator
9X00
9090
9X80
9X30
9540
9XYZ

http://scp-wiki.wikidot.com/9000contestawhiteboy
9001
9002
9003
9100
9343

http://scp-wiki.wikidot.com/9000contestbaddata
9102
9202
9302
9902
9X02

http://scp-wiki.wikidot.com/9000contestbigslothonmyface
9001
9002
999X highest
9X00
900X

http://scp-wiki.wikidot.com/9000contestblackmonday
9006
9009
9XX9
9990
9914

http://scp-wiki.wikidot.com/9000contestblankfellowplace
9001
9500
9002
9179
9876

http://scp-wiki.wikidot.com/9000contestblazingpie
900X highest
999X highest
9X00 highest
9X9X
9923

http://scp-wiki.wikidot.com/9000contestblueeyedfox
9X0X
9013
9626
9912
9XYZ

http://scp-wiki.wikidot.com/9000contestcalibold
900X
9X00
9XYZ palindrome highest
9XYZ

http://scp-wiki.wikidot.com/9000contestcathyautumn
9001
9002
9500
900X
9X00
9XYZ

http://scp-wiki.wikidot.com/9000contestcelestialtophat
900X
90X0
9XYZ

http://scp-wiki.wikidot.com/9000contestchoccoman
900X
9666
9500
9X99 highest
9404

http://scp-wiki.wikidot.com/9000contestcircledot
9009
9X9X
99XX
9801
9990

http://scp-wiki.wikidot.com/9000contestclutterarranger
9009
9001
9006
9X00
9966

http://scp-wiki.wikidot.com/9000contestcoccolithophor
9090
9130
9X9X
9XX9
9XYZ

http://scp-wiki.wikidot.com/9000contestdappleddaspletosaur
9111
9779
9222
9993
9191

http://scp-wiki.wikidot.com/9000contestdaveyoufool
9002
9005
9900
9901
9902

http://scp-wiki.wikidot.com/9000contestdeadcanons
9001
9009
9500
9998
9023

http://scp-wiki.wikidot.com/9000contestdemolitionderpy
9444
9777
9200
9222
9XYZ

http://scp-wiki.wikidot.com/9000contestdinotroutrosy
9990
9900
9009
9090
9099

http://scp-wiki.wikidot.com/9000contestdiogenes
9X00
900X
999X highest
9111
9222
9333
9444
9555
9666
9777
9888
9137

http://scp-wiki.wikidot.com/9000contestdjkaktus
9001
9998
9935
9889
9900

http://scp-wiki.wikidot.com/9000contestdmonist
9876
9678
9117
9404
9104

http://scp-wiki.wikidot.com/9000contestdoctorcimmerian
9001
9X00
9X13

http://scp-wiki.wikidot.com/9000contestdoctorlilithsophia
9000
9X00 highest
9408
9049

http://scp-wiki.wikidot.com/9000contestdoctorlovelace
9001
9002
9003
9004
9471

http://scp-wiki.wikidot.com/9000contestdoctorzurvan
9109
9101
9500
9876
9901

http://scp-wiki.wikidot.com/9000contestdrbalthazaar
9004
9400
9X00
900X
9444

http://scp-wiki.wikidot.com/9000contestdreadnoughtgalaxy
900X
9X00
9010
9020
9050
9030
9995
999X highest
9099
9399
9199
9031
9233

http://scp-wiki.wikidot.com/9000contestdr-lutwin
9333
9033
9051
9388
9191

http://scp-wiki.wikidot.com/9000contestdr-talcite
900X
9X00
9111
9222
9333
9444
9555
9666
9777
9888

http://scp-wiki.wikidot.com/9000contestdysadron
9998
9001
9002
9XXX
999X

http://scp-wiki.wikidot.com/9000contestesquirezel
9601
9272
9091
9009

http://scp-wiki.wikidot.com/9000contestesther619
9004
9400
9499
9449
9404

http://scp-wiki.wikidot.com/9000contestethagon
9341
9990
9019
9900
9XYZ

http://scp-wiki.wikidot.com/9000contestfairydoctor
9555
9005
9995
9055
9955

http://scp-wiki.wikidot.com/9000contestfermentating
9494
9944
9449
9210

http://scp-wiki.wikidot.com/9000contestfiref1y
9886
9007
9048
9003
9335

http://scp-wiki.wikidot.com/9000contestfireknight
9024
9924
9124
9824
9X24

http://scp-wiki.wikidot.com/9000contestfiretamer
9240
9261
9604
9061
9100

http://scp-wiki.wikidot.com/9000contestfloorboards
9173
9666
9012
9998
9433
9069

http://scp-wiki.wikidot.com/9000contestfrankentropy
9231
9317
9462
9777
9797
97X7
97XX

http://scp-wiki.wikidot.com/9000contestfrozenfoxb
9990
9333
9989
9555
9899
9XYZ

http://scp-wiki.wikidot.com/9000contestgravelenthusiast
9003
9030
9300
9993
9393

http://scp-wiki.wikidot.com/9000contestgreenwolftawny
9666
9088
9988
9876
9630

http://scp-wiki.wikidot.com/9000contestgrigorikarpin
9001
9009
9500
9002
9003
9XYZ

http://scp-wiki.wikidot.com/9000contestgunpowdr
9500
9900
9003
9010
9005

http://scp-wiki.wikidot.com/9000contestharmacy
9184
900X highest
9X00 highest
90X0 highest
9XYZ

http://scp-wiki.wikidot.com/9000contestharrietfarrar
9892
9876
9191
9342
9966

http://scp-wiki.wikidot.com/9000contesthenzoid
900X
9090
9099

http://scp-wiki.wikidot.com/9000contesthikarinu
9009
9998
9669
900X
9X00
9XYZ

http://scp-wiki.wikidot.com/9000contesthowltomoonsuntold
9013
9127
9029
9949
9601

http://scp-wiki.wikidot.com/9000contesthufor
9669
9610
9694
9612
9712

http://scp-wiki.wikidot.com/9000contestiamtheooga
9006
9106
9016
9446
9666

http://scp-wiki.wikidot.com/9000contestindustrystandard
9001
9500
9753
9357
90XX

http://scp-wiki.wikidot.com/9000contestironshears
9630
9963
99XX

http://scp-wiki.wikidot.com/9000contestitsabadidea
9900
9009
9090
9001
9804

http://scp-wiki.wikidot.com/9000contestjdune

http://scp-wiki.wikidot.com/9000contestjeanjacket
9696
9096
9960
9X96
996X

http://scp-wiki.wikidot.com/9000contestjezixo
9500
9X00
9086
9858
9985

http://scp-wiki.wikidot.com/9000contestjtdn
9000 custom8542
9542
9642
9000 custom8742
9742

http://scp-wiki.wikidot.com/9000contestj-v-g
900X
9014
9X00
9XYZ palindrome

http://scp-wiki.wikidot.com/9000contestkaelicles
9001
9002
9003
9004
9401

http://scp-wiki.wikidot.com/9000contestkarathh
9777
9797
9002
9173
9677

http://scp-wiki.wikidot.com/9000contestkayes-eskay
9005
9009
9022
9545
9888

http://scp-wiki.wikidot.com/9000contestkilerpoyo
9914
9814
9714
9600

http://scp-wiki.wikidot.com/9000contestkothardarastrix
9314
9356
9328
9820
9775

http://scp-wiki.wikidot.com/9000contestleplante
9440
9448
9630
9864
9898

http://scp-wiki.wikidot.com/9000contestletova
9790
9001
9919
9799
9009

http://scp-wiki.wikidot.com/9000contestlocallesbiancommie
9964
9005
9967
9500
9985

http://scp-wiki.wikidot.com/9000contestlordxvnv
900X
9998
9997

http://scp-wiki.wikidot.com/9000contestlucas667
9990
9800
9005
9010
9X00
9XYZ

http://scp-wiki.wikidot.com/9000contestmaplestrip
9996
9998
9009
9006
9995

http://scp-wiki.wikidot.com/9000contestmatthgeek
9119
9889
9900
9100
9138

http://scp-wiki.wikidot.com/9000contestmerehrab
9696
9035
9500
9350
9550

http://scp-wiki.wikidot.com/9000contestmister-toasty
9X99
9876
9108
9420

http://scp-wiki.wikidot.com/9000contestmontagueetc
9500
9900
9400
9005
9555
9004
9404
9444
9055
9955

http://scp-wiki.wikidot.com/9000contestmothmanuxo
9XYZ
9682
9377

http://scp-wiki.wikidot.com/9000contestn1ght-scribe
9500
9001
9225
9888
9898

http://scp-wiki.wikidot.com/9000contestnico
9000
9001
9726
9004
9669
9725

http://scp-wiki.wikidot.com/9000contestnullscape
9500
9001
9009
9900
9822

http://scp-wiki.wikidot.com/9000contestoctiron
9001
9007
9011
9013
9017
9001
9007
9011
9013
9029
9041
9043
9049
9059
9067
9091
9103
9109
9127
9133
9137
9151
9157
9161
9173
9181
9187
9199
9203
9209
9221
9227
9239
9241
9257
9277
9281
9283
9293
9311
9319
9323
9337
9341
9343
9349
9371
9377
9391
9397
9403
9413
9419
9421
9431
9433
9437
9439
9461
9463
9467
9473
9479
9491
9497
9511
9521
9533
9539
9547
9551
9587
9601
9613
9619
9623
9629
9631
9643
9649
9661
9677
9679
9689
9697
9719
9721
9733
9739
9743
9749
9767
9769
9781
9787
9791
9803
9811
9817
9829
9833
9839
9851
9857
9859
9871
9883
9887
9901
9907
9923
9929
9931
9941
9949
9967
9973	

http://scp-wiki.wikidot.com/9000contestonlineopossum
9110
9911
9411
9X9X
9XX9

http://scp-wiki.wikidot.com/9000contestpanloque
9001
9998
9500
9900
9966

http://scp-wiki.wikidot.com/9000contestparenthesis
9003
9009
9119
9011
9013

http://scp-wiki.wikidot.com/9000contestpenumbralchoir
9595
9559
9170
9230
9889

http://scp-wiki.wikidot.com/9000contestpeter-cohen
9998
9003
9119
9500
9900

http://scp-wiki.wikidot.com/9000contestplaguepjp
9001
9595
9003
9002
9599

http://scp-wiki.wikidot.com/9000contestpoltatherian
9001
9500
9099
9111
9230

http://scp-wiki.wikidot.com/9000contestpoufypoufson
9001
9998
9002
9005
9010

http://scp-wiki.wikidot.com/9000contestpumgumgum
900X
9X00
90X0
933X
9661
9662
9663
9664
9665
9667
9668
9669

http://scp-wiki.wikidot.com/9000contestqueerious
9001
9900
9500
9100

http://scp-wiki.wikidot.com/9000contestraddagher
9001
9320
9032
9132
9632

http://scp-wiki.wikidot.com/9000contestradian628
9009
900X
9X00

http://scp-wiki.wikidot.com/9000contestralliston
9001
9500
9600
9876
9120
9372

http://scp-wiki.wikidot.com/9000contestratseerofrattesse
9125
9001
9111
9250

http://scp-wiki.wikidot.com/9000contestresolver
900X
9X00
9033
90X0
9333
9XXX

http://scp-wiki.wikidot.com/9000contestsailorenoch
9991
9992
9960
9950
9970

http://scp-wiki.wikidot.com/9000contestseekgull
900X
9090
9X00
9X9X
9966

http://scp-wiki.wikidot.com/9000contestsevencix
9X00
900X
90X0 
9760
9076

http://scp-wiki.wikidot.com/9000contestshariavanilla
9529
9000 custom529-j

http://scp-wiki.wikidot.com/9000contest-shirleysterling
9300
9003
9030
9333
9321

http://scp-wiki.wikidot.com/9000contestsigyeklette
9XYZ no_same_digits_and_doesnt_end_with_9_or_0

http://scp-wiki.wikidot.com/9000contestsimartar
9550
9500
9700
9079
9193

http://scp-wiki.wikidot.com/9000contestsimpleruins
9100
9120
9150
9200

http://scp-wiki.wikidot.com/9000contestsinkingotter
9996
9618
9669
9600
9196

http://scp-wiki.wikidot.com/9000contestsoftseal
900X
9500
9X00
9XXX
9110

http://scp-wiki.wikidot.com/9000contestsonderance
9X01
9X11

http://scp-wiki.wikidot.com/9000contestspider-jaws
9600
9696
9060
9006
9096

http://scp-wiki.wikidot.com/9000contestsprawlingstar
900X
9X00 
9XXX
9876
9929

http://scp-wiki.wikidot.com/9000conteststonephish
9891
9189
9918
9181
9898

http://scp-wiki.wikidot.com/9000contestsunnymouse
9X00
90X0 
9X88 
9881 
9882 
9883 
9884 
9885 
9886 
9887 
9889

http://scp-wiki.wikidot.com/9000contestsynent
9004
9008
9014
9019
9040

http://scp-wiki.wikidot.com/9000contestteaanddigestives
9017
9170
9171
9177
9069

http://scp-wiki.wikidot.com/9000contestthetravllr
9401
9399
9040
9080
9044

http://scp-wiki.wikidot.com/9000contesttrintavon
9000
9699
9696
9081
9037

http://scp-wiki.wikidot.com/9000contesttufto
9799
9XYZ not9005

http://scp-wiki.wikidot.com/9000contestulyssesbark
900X
9500
9048
9033

http://scp-wiki.wikidot.com/9000contestuncgriffin

http://scp-wiki.wikidot.com/9000contestuniquename
999X
9X00 
9XXX 
9013
900X

http://scp-wiki.wikidot.com/9000contestutylike
9023
9010
9XYZ 

http://scp-wiki.wikidot.com/9000contestvilsotoast
9990
9876
9900
9753
9835

http://scp-wiki.wikidot.com/9000contestwackdog
900X 
9X00 
999X highest
9750
9577

http://scp-wiki.wikidot.com/9000contestwaylandlaurencepan
9500
9888
9521
9520
9143

http://scp-wiki.wikidot.com/9000contestxextyra
900X
9X00 
9876
9777
9012

http://scp-wiki.wikidot.com/9000contestxhawk77x
9004
9007
9140
9400
9700
9280
9417
9046
9548
9XYZ lowest_4_and_7
9XYZ lowest_4_or_7

http://scp-wiki.wikidot.com/9000contesty0ssarian
9101
9445
9495
9222

http://scp-wiki.wikidot.com/9000contestzeekyboogydoog
9001
9002
9003
9004
9005
900X
90X0
9X00
9XY0
9X0Y
90XY

http://scp-wiki.wikidot.com/9000contestzoempaws
9001
9666
9333
9173
9XX9

http://scp-wiki.wikidot.com/9000contestzyn
9333
9233
9332
9323
9223

http://scp-wiki.wikidot.com/9000drchandra
9090
9099
9909
9099
9742

http://scp-wiki.wikidot.com/9000katyastrangelove
9140
9280
9980
9400
9014

http://scp-wiki.wikidot.com/9000contestbattlecruiser12
9003
9100
9300
9154
9303

http://scp-wiki.wikidot.com/9000contestpliltdrgrimoire
9600
9X00
9663
9333

http://scp-wiki.wikidot.com/9000contestdoctorscrappy
9876
9001
9666
9900
9696

http://scp-wiki.wikidot.com/9000contestpuriora

http://scp-wiki.wikidot.com/9000contestperdoh

http://scp-wiki.wikidot.com/9000contestpinoccappuccino
9931
9317
9901
9311

http://scp-wiki.wikidot.com/9000contestmrmcguffin
9005
9007
9011
9021
9099

http://scp-wiki.wikidot.com/9000contestjackike

http://scp-wiki.wikidot.com/9000contestalexjohansson

http://scp-wiki.wikidot.com/9000contestmann
9090
9393
9099
9998
9423

http://scp-wiki.wikidot.com/9000contestuncannyon
9900
9500
9X00
9009
9090
90X0
9099
900X`;function f(o){let n=[];for(let e=0;e<o&&e<1e7;e++)n.push(e);return n}function g(o,n){let e=[],p=n.limits.reduce((i,a)=>Math.max(i,a.duration),0),c=[],t=new Set;setInterval(()=>{for(;;){let i=e.at(0);if(!i)return;let a=Date.now();if(c=c.filter(r=>(a-r.time)/1e3<=p),t.size>=n.maxConcurrentRequests)return;for(let r of n.limits){let u=0;for(let m of c)(a-m.time)/1e3<=r.duration&&u++;if(u>=r.maxRequests)return}e.shift(),c.push({time:Date.now()});let d=o(...i.params);t.add(d),(async()=>{let r=await d;i.callback(r),t.delete(d)})()}});let s=(...i)=>new Promise((a,d)=>{e.push({params:i,callback:r=>{a(r)}})});return s._throttled=!0,s}function y(o){return g(o,{maxConcurrentRequests:5,limits:[{duration:5,maxRequests:10}]})}function R(o,n){return new Promise((e,p)=>{window.OZONE.ajax.requestModule(o,n,c=>{e(c)})})}var w=new Map,b=y(R),X=y(async function(o){if(w.has(o))return w.get(o);let n=await(await fetch(o)).text(),p=new DOMParser().parseFromString(n,"text/html").querySelectorAll("head script");for(let c of Array.from(p)){let t=c.innerText.match(/WIKIREQUEST\.info\.pageId\s*\=\s*(\d+)/);if(t)return w.set(o,t[1]),t[1]}});var T='{ url: { startsWith: "http://scp-wiki.wikidot.com"}, wikidotInfo: { tags: { eq: "9000" } } }';window.getRatings=async()=>{let o=(await l(T,"{ url }")).filter(n=>!n.url.endsWith("scp9000contesthub")).map(n=>_(n.url));return await Promise.all(o)};async function _(o){let n=await X(o),e=await b("pagerate/WhoRatedPageModule",{pageId:n}),c=new DOMParser().parseFromString(e.body,"text/html").querySelectorAll(".printuser"),t=0,s=0,i=[];for(let a of Array.from(c)){let d=a.children[1]?.innerText?.trim(),r=a.nextElementSibling?.innerText?.trim();i.push({username:d,direction:r}),r==="+"?(t++,s++):r==="-"?t--:console.warn(`Unrecognized vote type '${r}' for user '${d}' and page '${o}'.`)}return{url:o,netRating:t,upvoteTotal:s,votes:i}}window.calculatePicks=async o=>{let n=o.sort((t,s)=>s.netRating*1e4+s.upvoteTotal-t.netRating*1e4-t.upvoteTotal),e=new Map,p=new Map,c=h.split(`

`).map(t=>{let s=t.split(`
`),i=s[0],a=s.slice(1).join(`
`),d=x(a);d.invalid.length>0&&console.warn(i,"had invalid preferences: ",d.invalid),p.set(i,d.prefs)});for(let t of n){let s=p.get(t.url);s||(console.warn(t.url,"has no slot preferences listed!"),s=f(998).map(a=>a+9e3).map(a=>a.toString())),s=(await Promise.all(s.map(async a=>a.startsWith("9")&&a.length===4?[a]:(await fetch(`https://scp-wiki.wikidot.com/scp-${a}`)).status===404?[a]:[]))).flat();let i=s.find(a=>!e.has(a));i===void 0&&console.warn(t.url,": no valid slot found!"),i!=="no_slot"&&i&&e.set(i,{url:t.url,netRating:t.netRating,upvoteTotal:t.upvoteTotal})}return{table:Object.fromEntries(Array.from(e.entries())),orderedResults:Array.from(e.entries()).map(([t,s])=>({...s,slot:t})).sort((t,s)=>s.netRating*1e4+s.upvoteTotal-t.netRating*1e4-t.upvoteTotal)}};async function S(o){let n=await(await fetch(o)).text();return new DOMParser().parseFromString(n,"text/html").querySelector("#discuss-button").href}function I(o,n){let e=new Map;for(let p=1;p<4;p++){let c=o[p],t=n[p];if(c.match(/\d/g)){if(c!==t)return!1}else{let s=e.get(c.toUpperCase());if(s===void 0)e.set(c.toUpperCase(),t);else if(s!==t)return!1}}return!0}function q(o){let n=[];for(let e=9e3;e<=9998;e++){let p=e.toString();I(o,p)&&n.push(p)}return n}function x(o){let n=o.split(`
`),e=["9000"],p=[];for(let c of n){if(c.trim().length===0)continue;let t=c.trim().split(/\s+/g),s=/^9[0-9xXyYzZ]{3}$/g;if(!t[0].match(s)){p.push(c);continue}let i=q(t[0]),a=!1;for(let d of t.slice(1))if(d==="highest")i.reverse();else if(d.startsWith("not")){let r=d.slice(3);i=i.filter(u=>u!==r)}else d==="palindrome"?i=i.filter(r=>r===r.split("").reverse().join("")):d==="no_same_digits_and_doesnt_end_with_9_or_0"?i=i.filter(r=>r.endsWith("9")||r.endsWith("0")?!1:new Set(r.split("")).size===4):d==="lowest_4_and_7"?i=i.filter(r=>r.includes("4")&&r.includes("7")):d==="lowest_4_or_7"?i=i.filter(r=>r.includes("4")||r.includes("7")):d==="no_slot"?i=["no_slot"]:d.startsWith("custom")?i=[d.slice(6)]:(a=!0,p.push(c));a||e.push(...i)}for(let c=9e3;c<=9998;c++)e.push(c.toString());return{prefs:e,invalid:p}}window.parsePrefs=x;async function A(o,n){let e=await S(o);console.log("discussion link",e);let p=await(await fetch(e)).text(),c=new DOMParser().parseFromString(p,"text/html");return Array.from(c.querySelectorAll("#thread-container-posts .post")).filter(t=>{let s=t.querySelector(".printuser a:nth-child(2)");return console.log(s),s&&n.includes(s.innerText)})}window.copyURLToClipboard=o=>n=>{navigator.clipboard.writeText(o).then(()=>{n.style.backgroundColor="green"}).catch(()=>{n.style.backgroundColor="red"}).finally(()=>{setTimeout(()=>{n.style.backgroundColor="#eee"},1e3)})};window.getAllAuthorComments=async()=>{let o=await l(T,"{ url, attributions { user { name } } }"),n=k(A,{limits:[{duration:10,maxRequests:3}],maxConcurrentRequests:3});console.log(o),document.body.innerHTML="",document.body.style="display: flex; flex-wrap: wrap;";for(let e of o){let p=e.url,c=await n(p,e.attributions.map(t=>t.user.name));for(let t of c){let s=t.querySelector(".content");if(t.innerText.match("9")){for(let i of Array.from(s.querySelectorAll("img")))i.parentElement.removeChild(i);if(!s)break;document.body.innerHTML+=`<div style="padding: 10px; margin: 10px; border: 1px solid black; width: 250px; font-family: sans-serif;">
      <p>
      <button style="max-width: 100%; font-size: 125%; word-wrap: break-word" onclick="window.copyURLToClipboard('${p}')(this)">${p}</button> 
      </p>
      ${s.innerHTML}</div>`}}}};})();
//# sourceMappingURL=slotpicker.user.js.map
