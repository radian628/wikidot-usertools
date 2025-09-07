import { codegenSimple } from "./parse-test-utils.js";

codegenSimple(`
asdf
`);

codegenSimple(`


asdf


`);

codegenSimple(`
asdf
ghjk
`);

codegenSimple(`
[[div]]
asdf
[[/div]]  
`);

codegenSimple(`
[[div]]
**asdf**
[[/div]]  
`);

codegenSimple(`
a

b

c
`);

codegenSimple(`
[[div_]]
asdf
[[/div]]  
`);

codegenSimple(`
[[div_]]
a

b
[[/div]]  
`);

codegenSimple(`
[[div_]]
a

b

c
[[/div]]  
`);

codegenSimple(`
-----
`);
codegenSimple(`
[[$ \\frac{2}{3} $]]
`);

codegenSimple(`
[[math]]
\\frac{2}{3}
[[/math]]
`);

codegenSimple(`
[[code]]
1 + 2 + 3
[[/code]]  
`);

codegenSimple(`
[[a href="#"]]hi whats up[[/a]]  
`);

codegenSimple(`
[[span style="color: red;"]]a[[/span]]  
`);

codegenSimple(`
[[span]][[span]]a[[/span]][[/span]]  
`);

codegenSimple(`
{{test}}

**test**

--test--

^^test^^

,,test,,

//test//

__test__
`);

codegenSimple(`
[[<]]
left
[[/<]]

[[=]]
center
[[/=]]

[[>]]
right
[[/>]]
`);

codegenSimple(`
line1 _
 _
 _
this should treat the underscores as linebreaks  
  `);

codegenSimple(`

`);
