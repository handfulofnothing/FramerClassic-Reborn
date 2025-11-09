const fs = require("fs");
const zlib = require("zlib");
const { join, extname } = require("path");
const { exec } = require("child_process");

const _ = require("lodash");
const knox = require("knox");
const mime = require("mime");
const mustache = require("mustache");

const Config = {
  bucket: "builds.framerjs.com",
  region: "us-east-1",
  input: "extras/builds.framerjs.com",
  output: "build/builds.framerjs.com",
  maxAge: 60 * 60 * 24, // One day
  gzipExtensions: [".js", ".html", ".css", ".map"],
  startAt: "2e97990",
};

//##############################################################
// Parse the command line
const main = () =>
  exec("git config --local --get remote.origin.url", function (err, output) {
    output = output.trim();
    output = output.toLowerCase();
    if (
      ![
        "git@github.com:koenbok/framer.git",
        "https://github.com/koenbok/framer.git",
      ].includes(output)
    ) {
      throw Error(`Not the right repo: '${output}'`);
    }
    return _main();
  });

var _main = function () {
  const COMMANDS = {
    upload() {
      return uploadDir(Config.output);
    },
    build() {
      return build();
    },
  };

  const command = process.argv[2];

  console.log(`Command: ${command}`);

  if (!COMMANDS.hasOwnProperty(command)) {
    throw Error(`No command available: ${command}`);
  } else {
    return COMMANDS[command]();
  }
};

//##############################################################
// Methods

var build = function () {
  // Render the html file
  const indexData = fs.readFileSync(`${Config.input}/index.html`, "utf8");

  // Build up a context
  const context = { commits: [] };

  return exec(
    'git log --pretty=format:"%h\t%an\t%ad\t%s" --first-parent master',
    function (err, output) {
      if (err) {
        throw err;
      }

      let start = false;

      for (var line of output.split("\n")) {
        var fields = line.split("\t");

        if (fields[0] === Config.startAt) {
          start = true;
        }

        if (start === false) {
          context.commits.push({
            hash: fields[0],
            author: fields[1],
            date: fields[2],
            message: fields[3],
          });
        }
      }

      const indexOutput = mustache.render(indexData, context);

      return fs.writeFileSync(`${Config.output}/index.html`, indexOutput);
    }
  );
};

const uploadFile = function (path, remotePath) {
  let needle;
  if (remotePath == null) {
    remotePath = "";
  }
  console.log(`Upload ${path} -> ${remotePath}`);

  const client = knox.createClient({
    key: process.env.AWS_ACCESS_KEY_ID,
    secret: process.env.AWS_SECRET_ACCESS_KEY,
    bucket: Config.bucket,
  });

  let buffer = fs.readFileSync(path);
  const headers = {
    "Content-Type": mime.lookup(path),
    "Cache-Control": `max-age=${Config.maxAge}, public`,
    "x-amz-acl": "public-read",
  };

  const upload = () =>
    client.putBuffer(buffer, remotePath, headers, function (err, response) {
      if (err) {
        throw err;
      }
    });

  if (
    ((needle = extname(remotePath)), Config.gzipExtensions.includes(needle))
  ) {
    return zlib.gzip(buffer, function (err, data) {
      buffer = Buffer.from(data);
      headers["Content-Encoding"] = "gzip";
      return upload();
    });
  } else {
    return upload();
  }
};

var uploadDir = function (path, remotePath) {
  if (remotePath == null) {
    remotePath = "";
  }
  return (function () {
    const result = [];
    for (const fileName of fs.readdirSync(path)) {
      if (fileName[0] === ".") continue;

      const filePath = join(path, fileName);

      if (fs.statSync(filePath).isDirectory()) {
        result.push(uploadDir(filePath, join(remotePath, fileName)));
      } else {
        result.push(uploadFile(filePath, join(remotePath, fileName)));
      }
    }
    return result;
  })();
};

main();
