const got = require("got");
const { ensureDir, writeFile } = require("fs-extra");
const { join, resolve } = require("path");
const Figma = require("figma-js");
const PQueue = require("p-queue");
require("dotenv").config();
const { FIGMA_PAGE, FIGMA_TOKEN, FIGMA_FILE_URL } = process.env;

const options = {
  format: "svg",
  outputDir: "./src/",
  scale: "1",
};

for (const arg of process.argv.slice(2)) {
  const [param, value] = arg.split("=");
  if (options[param]) {
    options[param] = value;
  }
}

if (!FIGMA_TOKEN) {
  throw Error("Cannot find FIGMA_TOKEN in process!");
}

const client = Figma.Client({
  personalAccessToken: FIGMA_TOKEN,
});

// Fail if there's no figma file key
let fileId = null;
if (!fileId) {
  try {
    // Also support URLs with or without trailing project name
    const match = FIGMA_FILE_URL.match(/(?:file|design)\/([a-z0-9]+)(?:\/|$)/i);
    if (match) {
      fileId = match[1];
    } else {
      throw new Error("Invalid Figma URL format");
    }
  } catch (e) {
    throw Error("Cannot find FIGMA_FILE_URL key in process!");
  }
}

console.log(`Exporting ${FIGMA_FILE_URL} components`);
client
  .file(fileId)

  .then(({ data }) => {
    console.log("Processing response");
    const components = {};

    function check(c, pageName) {
      if (c.type === "COMPONENT") {
        const { name, id } = c;
        const { description = "", key } = data.components[c.id];
        const { width, height } = c.absoluteBoundingBox;

        components[id] = {
          name,
          id,
          key,
          file: fileId,
          description,
          width,
          height,
          page: pageName,
        };
      } else if (c.children) {
        c.children.forEach((child) => check(child, pageName));
      }
    }

    data.document.children.forEach((page) => {
      const pageName = page.name;
      console.log(`Found page: ${pageName}`);
      // 如果指定了 FIGMA_PAGE，只处理匹配的页面
      if (FIGMA_PAGE) {
        if (pageName.toLowerCase().includes(FIGMA_PAGE.toLowerCase())) {
          console.log(`✅ Processing page: ${pageName}`);
          check(page, pageName);
        } else {
          console.log(`⏭️  Skipping page: ${pageName}`);
        }
      } else {
        // 如果没有指定页面，处理所有页面
        console.log(`✅ Processing page: ${pageName}`);
        check(page, pageName);
      }
    });
    if (Object.values(components).length === 0) {
      throw Error("No components found!");
    }
    console.log(
      `${Object.values(components).length} components found in the figma file`
    );
    return components;
  })
  .then((components) => {
    console.log("Getting export urls");
    return client
      .fileImages(fileId, {
        format: options.format,
        ids: Object.keys(components),
        scale: options.scale,
      })
      .then(({ data }) => {
        for (const id of Object.keys(data.images)) {
          components[id].image = data.images[id];
        }
        return components;
      });
  })
  .then((components) => {
    return ensureDir(join(options.outputDir))
      .then(() =>
        writeFile(
          resolve(options.outputDir, "data.json"),
          JSON.stringify(components),
          "utf8"
        )
      )
      .then(() => components);
  })
  .then((components) => {
    const contentTypes = {
      svg: "image/svg+xml",
      png: "image/png",
      jpg: "image/jpeg",
    };
    return queueTasks(
      Object.values(components).map((component) => () => {
        return got
          .get(component.image, {
            headers: {
              "Content-Type": contentTypes[options.format],
            },
            encoding: options.format === "svg" ? "utf8" : null,
          })
          .then((response) => {
            return ensureDir(join(options.outputDir, options.format)).then(() =>
              writeFile(
                join(
                  options.outputDir,
                  options.format,
                  `${component.name}.${options.format}`
                ),
                response.body,
                options.format === "svg" ? "utf8" : "binary"
              )
            );
          });
      })
    );
  })
  .catch((error) => {
    throw Error(`Error fetching components from Figma: ${error}`);
  });

function queueTasks(tasks, options) {
  const queue = new PQueue(Object.assign({ concurrency: 3 }, options));
  for (const task of tasks) {
    queue.add(task);
  }
  queue.start();
  return queue.onIdle();
}
