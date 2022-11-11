import { ref } from "vue";
import Papa from "papaparse";
import fs from "fs";
import jquery from "jquery";
import router from "@/router";

export function parse(e: Event, cb: Function) {
  if (
    !(e.target as HTMLInputElement).files![0].name.split(".").includes("csv")
  ) {
    alert("Upload only CSV Files");
    document.querySelector("input")!.value = "";
  } else {
    const file = (document.querySelector(".csvUploader") as HTMLInputElement)
      .files![0];

    Papa.parse(
      (document.querySelector(".csvUploader") as HTMLInputElement).files![0],
      {
        download: true,
        header: false,
        complete: function (results: any) {
          const headings: string[] | object[] = results.data[0];
          for (let i = 0; i < headings.length; i++) {
            const obj = { text: "", value: "" };
            obj["text"] = headings[i] as string;
            obj["value"] = headings[i] as string;

            headings.splice(i, 1, obj);
          }

          console.log("headings: ", headings);
          const items = results.data;
          items.pop();
          items.shift();

          let dataSize = 0;

          while (dataSize != items.length) {
            let headingSize: number = 0;
            const obj: any = {};
            while (headingSize != headings.length) {
              obj[(headings[headingSize] as any).value] =
                items[dataSize][headingSize];
              headingSize += 1;
            }
            items[dataSize] = obj;
            dataSize += 1;
          }
          console.log("items: ", items);
          results.data = items;
          results.data.unshift(headings);

          console.log(results.data);
          cb(results.data);
        },
      }
    );
  }
}
