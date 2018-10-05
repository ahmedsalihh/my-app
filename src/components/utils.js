const execSync = window.require("child_process").execSync;

function getContainerIds() {
  let containerIds = [];
  const child = execSync("docker ps -a -q");

  console.log(child.toString());
  containerIds = child.toString().split("\n");

  return containerIds;
}

function getImages() {
  let images = [];
  const child = execSync("docker ps -a --format '{{.Image}}'");

  console.log(child.toString());
  images = child.toString().split("\n");

  return images;
}

function getCommands() {
  let commands = [];
  const child = execSync("docker ps -a --format '{{.Command}}'");

  console.log(child.toString());
  commands = child.toString().split("\n");

  return commands;
}

function getCreateTime() {
  let createTime = [];
  const child = execSync(
    "docker ps -a | awk -F '[[:space:]][[:space:]]+' '{ print $4 }'"
  );

  console.log(child.toString());
  createTime = child.toString().split("\n");

  return createTime;
}

function getStatus() {
  let status = [];
  const child = execSync("docker ps -a --format '{{.Status}}'");

  console.log(child.toString());
  status = child.toString().split("\n");

  return status;
}

function getPorts() {
  let ports = [];
  const child = execSync("docker ps -a --format '{{.Ports}}'");

  console.log(child.toString());
  ports = child.toString().split("\n");

  return ports;
}

function getNames() {
  let names = [];
  const child = execSync("docker ps -a --format '{{.Names}}'");

  console.log(child.toString());
  names = child.toString().split("\n");

  return names;
}

export function parseResult() {
  const containerIds = getContainerIds();
  const images = getImages();
  const commands = getCommands();
  const createTimes = getCreateTime();
  const status = getStatus();
  const ports = getPorts();
  const names = getNames();

  let containers = [];
  for (let i = 0; i < containerIds.length; i++) {
    containers.push({
      id: containerIds[i].replaceAll("'", ""),
      image: images[i].replaceAll("'", ""),
      command: commands[i].replaceAll("'", ""),
      createTime: createTimes[i].replaceAll("'", ""),
      status: status[i].replaceAll("'", ""),
      port: ports[i].replaceAll("'", ""),
      name: names[i].replaceAll("'", "")
    });
  }
  containers.splice(-1, 1);
  console.log(containers);
  return containers;
}

// eslint-disable-next-line
String.prototype.replaceAll = function(str1, str2, ignore) {
  return this.replace(
    new RegExp(
      // eslint-disable-next-line
      str1.replace(/([\/\,\!\\\^\$\{\}\[\]\(\)\.\*\+\?\|\<\>\-\&])/g, "\\$&"),
      ignore ? "gi" : "g"
    ),
    typeof str2 === "string" ? str2.replace(/\$/g, "$$$$") : str2
  );
};
