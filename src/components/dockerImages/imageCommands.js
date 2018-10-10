const execSync = window.require("child_process").execSync;

function getRepoIds() {
  let repoIds = [];
  const child = execSync("docker images --format '{{.Repository}}'");

  console.log(child.toString());
  repoIds = child.toString().split("\n");

  return repoIds;
}

function getTags() {
  let tags = [];
  const child = execSync("docker images --format '{{.Tag}}'");

  console.log(child.toString());
  tags = child.toString().split("\n");

  return tags;
}

function getImageIds() {
  let imageIds = [];
  const child = execSync("docker images --format '{{.ID}}'");

  console.log(child.toString());
  imageIds = child.toString().split("\n");

  return imageIds;
}

function getCreatTimes() {
  let createTimes = [];
  const child = execSync("docker images --format '{{.CreatedAt}}'");

  console.log(child.toString());
  createTimes = child.toString().split("\n");

  return createTimes;
}

function getSizes() {
  let sizes = [];
  const child = execSync("docker images --format '{{.Size}}'");

  console.log(child.toString());
  sizes = child.toString().split("\n");

  return sizes;
}

export function parseImageResult() {
  const repoIds = getRepoIds();
  const tags = getTags();
  const imageIds = getImageIds();
  const createTimes = getCreatTimes();
  const sizes = getSizes();

  let images = [];
  for (let i = 0; i < repoIds.length; i++) {
    images.push({
      repoIds: repoIds[i].replaceAll("'", ""),
      tags: tags[i].replaceAll("'", ""),
      imageIds: imageIds[i].replaceAll("'", ""),
      createTimes: createTimes[i].replaceAll("'", ""),
      sizes: sizes[i].replaceAll("'", "")
    });
  }
  images.splice(-1, 1);
  console.log(images);
  return images;
}

