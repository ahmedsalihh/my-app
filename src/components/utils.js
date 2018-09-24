// function getContainerIds() {
//   const exec = window.require("child_process").exec;
//   let containerIds = [];
//   exec("docker ps -a | awk '{ print $1 }'", function(error, stdout, stderr) {
//     containerIds = stdout.split("\n");
//     console.log("contArray: \n" + containerIds);
//     console.log("stderr: " + stderr);
//     if (error !== null) {
//       console.log("exec error: " + error);
//     }
//   });
//   return containerIds;
// }

// function getImages() {
//   const exec = window.require("child_process").exec;
//   let images = [];
//   exec("docker ps -a | awk '{ print $2 }'", function(error, stdout, stderr) {
//     images = stdout.split("\n");
//     console.log("imageArray: \n" + images);
//     console.log("stderr: " + stderr);
//     if (error !== null) {
//       console.log("exec error: " + error);
//     }
//   });
//   return images;
// }

// function getCommands() {
//   const exec = window.require("child_process").exec;
//   let commands = [];
//   exec("docker ps -a | awk '{ print $3 }'", function(error, stdout, stderr) {
//     commands = stdout.split("\n");
//     console.log("commandsArray: \n" + commands);
//     console.log("stderr: " + stderr);
//     if (error !== null) {
//       console.log("exec error: " + error);
//     }
//   });
//   return commands;
// }

// function getCreateTime() {
//   const exec = window.require("child_process").exec;
//   let createTime = [];
//   exec("docker ps -a | awk '{ print $4 }'", function(error, stdout, stderr) {
//     createTime = stdout.split("\n");
//     console.log("createTimeArray: \n" + createTime);
//     console.log("stderr: " + stderr);
//     if (error !== null) {
//       console.log("exec error: " + error);
//     }
//   });
//   return createTime;
// }

// function getStatus() {
//   const exec = window.require("child_process").exec;
//   let status = [];
//   exec("docker ps -a | awk '{ print $5 }'", function(error, stdout, stderr) {
//     status = stdout.split("\n");
//     console.log("statusArray: \n" + status);
//     console.log("stderr: " + stderr);
//     if (error !== null) {
//       console.log("exec error: " + error);
//     }
//   });
//   return status;
// }

// function getPorts() {
//   const exec = window.require("child_process").exec;
//   let ports = [];
//   exec("docker ps -a | awk '{ print $6 }'", function(error, stdout, stderr) {
//     ports = stdout.split("\n");
//     console.log("portsArray: \n" + ports);
//     console.log("stderr: " + stderr);
//     if (error !== null) {
//       console.log("exec error: " + error);
//     }
//   });
//   return ports;
// }

// function getNames() {
//   const exec = window.require("child_process").exec;
//   let names = [];
//   exec("docker ps -a | awk '{ print $7 }'", function(error, stdout, stderr) {
//     names = stdout.split("\n");
//     console.log("namesArray: \n" + names);
//     console.log("stderr: " + stderr);
//     if (error !== null) {
//       console.log("exec error: " + error);
//     }
//   });
//   return names;
// }

export function parseResult() {
  // const containerIds = getContainerIds();
  // const images = getImages();
  // const commands = getCommands();
  // const createTimes = getCreateTime();
  // const status = getStatus();
  // const ports = getPorts();
  // const names = getNames();

  const exec = window.require("child_process").exec;

  let containerIds = [];
  exec("docker ps -a | awk '{ print $1 }'", function(error, stdout, stderr) {
    containerIds = stdout.split("\n");
    console.log("contArray: \n" + containerIds);
    console.log("stderr: " + stderr);
    if (error !== null) {
      console.log("exec error: " + error);
    }
  });
  let images = [];
  exec("docker ps -a | awk '{ print $2 }'", function(error, stdout, stderr) {
    images = stdout.split("\n");
    console.log("imageArray: \n" + images);
    console.log("stderr: " + stderr);
    if (error !== null) {
      console.log("exec error: " + error);
    }
  });
  let commands = [];
  exec("docker ps -a | awk '{ print $3 }'", function(error, stdout, stderr) {
    commands = stdout.split("\n");
    console.log("commandsArray: \n" + commands);
    console.log("stderr: " + stderr);
    if (error !== null) {
      console.log("exec error: " + error);
    }
  });
  let createTimes = [];
  exec("docker ps -a | awk '{ print $4 }'", function(error, stdout, stderr) {
    createTimes = stdout.split("\n");
    console.log("createTimeArray: \n" + createTimes);
    console.log("stderr: " + stderr);
    if (error !== null) {
      console.log("exec error: " + error);
    }
  });
  let status = [];
  exec("docker ps -a | awk '{ print $5 }'", function(error, stdout, stderr) {
    status = stdout.split("\n");
    console.log("statusArray: \n" + status);
    console.log("stderr: " + stderr);
    if (error !== null) {
      console.log("exec error: " + error);
    }
  });
  let ports = [];
  exec("docker ps -a | awk '{ print $6 }'", function(error, stdout, stderr) {
    ports = stdout.split("\n");
    console.log("portsArray: \n" + ports);
    console.log("stderr: " + stderr);
    if (error !== null) {
      console.log("exec error: " + error);
    }
  });
  let names = [];
  exec("docker ps -a | awk '{ print $7 }'", function(error, stdout, stderr) {
    names = stdout.split("\n");
    console.log("namesArray: \n" + names);
    console.log("stderr: " + stderr);
    if (error !== null) {
      console.log("exec error: " + error);
    }
  });

  let containers = [];
  for (let i = 0; i < containerIds.length; i++) {
    containers.push({
      id: containerIds[i],
      image: images[i],
      command: commands[i],
      createTime: createTimes[i],
      status: status[i],
      port: ports[i],
      name: names[i]
    });
  }
  console.log(containers);
  return containers;
}
