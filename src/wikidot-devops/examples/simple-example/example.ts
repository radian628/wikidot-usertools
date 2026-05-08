import { createWikidotDevopsServer } from "../../server/src/index.js";

const server = createWikidotDevopsServer({
  onListen() {
    console.log("server started");
  },
});

let index = 0;

setInterval(() => {
  server.pushUpdate({
    pages: [
      {
        site: "scp-sandbox-3",
        slug: "radian628:devops-test-again",
        title: "What",
        source:
          "this index shouold count up: " +
          index +
          `
        
[[html]]        
<div>CUSTTOM IFRAME WITH IINDEX ${index}</div>
<div>PLEASE RESIZE PROPERLY TANK YOU</div>
[[/html]]
        
        `,
        tags: ["a", "b", "c"],
        files: [
          {
            type: "data",
            name: "sample69420.txt",
            data: "text file ecks dee",
          },
        ],
      },
    ],
  });
  index++;
}, 10000);
