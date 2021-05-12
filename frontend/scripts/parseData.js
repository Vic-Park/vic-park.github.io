const csv = require("csv-parser");
const fs = require("fs");
const path = require("path");
const pkgDir = require("pkg-dir");
const { paramCase } = require("param-case");
const yaml = require("yaml");
const outdent = require("outdent");

const rootPath = path.join(pkgDir.sync(__dirname), "..");
const csvFile = path.join(rootPath, "assets/data.csv");

async function parseData() {
  const clubs = await new Promise((resolve, reject) => {
    const results = [];
    fs.createReadStream(csvFile)
      .pipe(
        csv({
          skipLines: 1,
          headers: false,
        })
      )
      .on("data", (d) => {
        /*
          0: "Timestamp"
          1: "Club Name"
          2: "Short Club Description (1-2 sentences)"
          3: "Full Club Description"
          4: "Prerequisite knowledge needed (If none, please leave blank)"
          5: "Meeting Times (Example: Mondays at 5 pm)"
          6: "Meeting Platform Info (Google meet, Zoom, etc. Do NOT include your meet link here! It will be publicly accessible!!)"
          7: "Any extra information you want to include on your club's webpage. (Remember, don't put emails)"
        */
        results.push({
          timestamp: d[0],
          clubName: d[1],
          clubBlurb: d[2],
          clubDescription: d[3],
          prerequisiteKnowledge: d[4],
          meetingTimes: d[5],
          meetingInfo: d[6],
          extraInfo: d[7],
        });
      })
      .on("error", (e) => reject(e))
      .on("end", () => {
        resolve(results);
      });
  });

  const rootClubsPageFolder = path.join(rootPath, "_clubs");
  for (const club of clubs) {
    const {
      clubName,
      clubBlurb,
      clubDescription,
      prerequisiteKnowledge,
      meetingTimes,
      meetingInfo,
      extraInfo,
    } = club;
    const clubFileMetadata = {
      name: clubName,
      "short-description": clubBlurb,
      "long-description": clubDescription,
      prerequisites: prerequisiteKnowledge,
      "meeting-times": meetingTimes,
      "meeting-platform": meetingInfo,
      "more-info": extraInfo === undefined ? false : extraInfo,
    };

    const clubFileContent = outdent`
      ---
      ${yaml.stringify(clubFileMetadata).trim()}
      ---
    `;

    const clubSlug = paramCase(clubName);
    const clubFilePath = path.join(rootClubsPageFolder, `${clubSlug}.md`);

    fs.writeFileSync(clubFilePath, clubFileContent);
  }
}

parseData();
