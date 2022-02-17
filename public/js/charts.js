// base css
import "billboard.js/dist/theme/insight.css";
import bb from "billboard.js";

// for ESM environment, need to import modules as:
// import bb, {line, bar} from "billboard.js"

var chart = bb.generate({
  data: {
    url: "./data/test.csv",
    type: "line", // for ESM specify as: line()
  },
  bindto: "#dataFromURL",
});

setTimeout(function () {
  chart.load({
    url: "./data/test.json",
    mimeType: "json",
    type: "bar", // for ESM specify as: bar()
  });
}, 1000);
