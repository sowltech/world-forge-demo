const SAMPLE_WORLD = {
  name: "Ash Empire",
  concept: "A fallen solar kingdom rebuilding after machine gods collapse the old economy.",
};

const GENRE_RULES = [
  { keywords: ["dragon", "kingdom", "magic", "spell", "wizard"], genre: "Fantasy" },
  { keywords: ["ai", "machine", "cyber", "space", "robot", "solar"], genre: "Science Fiction" },
  { keywords: ["empire", "war", "revolution", "crown", "kingdom"], genre: "Political Epic" },
  { keywords: ["ancient", "lost", "ruins", "myth", "prophecy"], genre: "Mythic Adventure" },
  { keywords: ["ancestor", "griot", "ubuntu", "diaspora", "sankofa"], genre: "Afrofuturist Myth" },
];

const TONE_RULES = [
  { keywords: ["ancestor", "griot", "ubuntu", "sankofa", "diaspora"], tone: "Ancestral" },
  { keywords: ["spirit", "oracle", "dream", "sacred", "ritual"], tone: "Mystical" },
  { keywords: ["dark", "fallen", "collapse", "ruin"], tone: "Dark" },
  { keywords: ["hope", "rebuild", "healing", "dawn"], tone: "Hopeful" },
  { keywords: ["empire", "myth", "god", "crown"], tone: "Epic" },
  { keywords: ["machine", "cyber", "future", "neon"], tone: "Futuristic" },
];

const state = {
  worldBible: null,
};

function slugifyName(name) {
  return String(name || "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "") || "world";
}

function inferGenre(concept) {
  const lowered = String(concept || "").toLowerCase();
  for (const rule of GENRE_RULES) {
    if (rule.keywords.some((keyword) => lowered.includes(keyword))) {
      return rule.genre;
    }
  }
  return "Speculative Fiction";
}

function inferTone(concept) {
  const lowered = String(concept || "").toLowerCase();
  for (const rule of TONE_RULES) {
    if (rule.keywords.some((keyword) => lowered.includes(keyword))) {
      return rule.tone;
    }
  }
  return "Cinematic";
}

function makeList(items) {
  return items.slice();
}

function generateWorldBible(name, concept) {
  const safeName = String(name || "").trim();
  const safeConcept = String(concept || "").trim();

  if (!safeName) {
    throw new Error("Please enter a world name.");
  }
  if (!safeConcept) {
    throw new Error("Please enter a world concept.");
  }

  const genre = inferGenre(safeConcept);
  const tone = inferTone(safeConcept);
  const slug = slugifyName(safeName);

  const lowerConcept = safeConcept.replace(/\s+/g, " ").trim();
  const premise = `${safeName} is a ${tone.toLowerCase()} ${genre.toLowerCase()} setting where ${lowerConcept}.`;

  return {
    title: safeName,
    slug,
    concept: lowerConcept,
    genre,
    tone,
    premise,
    history: makeList([
      `The world began as a response to ${lowerConcept.toLowerCase()}.`,
      "Its earlier age shaped the laws, factions, and technology around that pressure.",
      "The present era reflects the consequences of that founding conflict.",
    ]),
    factions: makeList([
      `The Builders of ${safeName}`,
      `The Remnant Council of ${safeName}`,
      "The External Pressures",
    ]),
    powerSystem: genre === "Fantasy"
      ? "Magic is treated as a governed force with costs, limits, and inheritance rules."
      : genre === "Science Fiction"
        ? "Advanced systems, machine logic, and engineered infrastructure define capability."
        : genre === "Political Epic"
          ? "Power flows through institutions, alliances, sanctions, and managed force."
          : genre === "Mythic Adventure"
            ? "Ancient relics, inherited rites, and lost knowledge shape what is possible."
            : "A governed blend of institutions, technology, and social rules shapes power.",
    conflict: genre === "Fantasy"
      ? "Legacy power struggles collide with fragile magical order."
      : genre === "Science Fiction"
        ? "Control of the system stack determines who can survive the next collapse."
        : genre === "Political Epic"
          ? "Factions compete to shape the terms of order before the world fractures again."
          : genre === "Mythic Adventure"
            ? "Recovering truth from ruin threatens the balance of the current age."
            : "The world must reconcile its inherited system with the pressure of change.",
    locations: makeList([
      `The Heart of ${safeName}`,
      "The Outer Districts",
      "The Archive Quarter",
    ]),
    characterArchetypes: makeList([
      "The Builder who wants to make the world usable",
      "The Guardian who protects fragile systems",
      "The Challenger who exposes hidden costs",
    ]),
    storyHooks: makeList([
      `A new era begins in ${safeName} and the first decision defines the rest of the world.`,
      "An old assumption no longer holds and the characters must redesign the system.",
      "A hidden faction wants the world to stay broken.",
    ]),
    commercialUseCases: makeList([
      "Story planning and world-bible generation",
      "Campaign setting development for games or fiction",
      "Creative brief generation for teams",
    ]),
    expansionIdeas: makeList([
      "Add character sheets and relationship maps",
      "Add scene or mission generators",
      "Add export formats for PDF or structured datasets",
    ]),
    nextDevelopmentSteps: makeList([
      "Review the generated world bible for fit and tone.",
      "Expand the concept into factions, rules, and key locations.",
      "Add a later UI or API once the CLI workflow proves useful.",
    ]),
  };
}

function renderMarkdown(worldBible) {
  const lines = [
    `# ${worldBible.title} World Bible`,
    "",
    "## Title",
    "",
    worldBible.title,
    "",
    "## Core Concept",
    "",
    worldBible.concept,
    "",
    "## Genre",
    "",
    worldBible.genre,
    "",
    "## Tone",
    "",
    worldBible.tone,
    "",
    "## World Premise",
    "",
    worldBible.premise,
    "",
    "## Historical Backstory",
    "",
    ...worldBible.history.map((item) => `- ${item}`),
    "",
    "## Main Factions",
    "",
    ...worldBible.factions.map((item) => `- ${item}`),
    "",
    "## Power System or Technology Layer",
    "",
    worldBible.powerSystem,
    "",
    "## Core Conflict",
    "",
    worldBible.conflict,
    "",
    "## Main Locations",
    "",
    ...worldBible.locations.map((item) => `- ${item}`),
    "",
    "## Character Archetypes",
    "",
    ...worldBible.characterArchetypes.map((item) => `- ${item}`),
    "",
    "## Story Hooks",
    "",
    ...worldBible.storyHooks.map((item) => `- ${item}`),
    "",
    "## Commercial Use Cases",
    "",
    ...worldBible.commercialUseCases.map((item) => `- ${item}`),
    "",
    "## Expansion Ideas",
    "",
    ...worldBible.expansionIdeas.map((item) => `- ${item}`),
    "",
    "## Next Development Steps",
    "",
    ...worldBible.nextDevelopmentSteps.map((item) => `- ${item}`),
    "",
  ];
  return lines.join("\n").trim() + "\n";
}

function renderJson(worldBible) {
  return JSON.stringify(worldBible, null, 2) + "\n";
}

function downloadFile(filename, content, mimeType) {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  anchor.rel = "noopener";
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(url);
}

function setStatus(message, isError = false) {
  const status = document.getElementById("statusMessage");
  status.textContent = message;
  status.classList.toggle("is-error", isError);
}

function setPreviewVisible(hasOutput) {
  document.getElementById("previewEmpty").classList.toggle("is-hidden", hasOutput);
  document.getElementById("previewContent").classList.toggle("is-hidden", !hasOutput);
}

function updatePreview(worldBible) {
  const markdown = renderMarkdown(worldBible);
  const json = renderJson(worldBible);
  document.getElementById("markdownPreview").textContent = markdown;
  document.getElementById("jsonPreview").textContent = json;
  setPreviewVisible(true);
}

function generateFromInputs() {
  try {
    const name = document.getElementById("worldName").value;
    const concept = document.getElementById("worldConcept").value;
    const worldBible = generateWorldBible(name, concept);
    state.worldBible = worldBible;
    updatePreview(worldBible);
    setStatus(`Generated ${worldBible.title} as ${worldBible.genre}.`);
    return worldBible;
  } catch (error) {
    state.worldBible = null;
    setPreviewVisible(false);
    setStatus(error.message, true);
    return null;
  }
}

function loadSample() {
  document.getElementById("worldName").value = SAMPLE_WORLD.name;
  document.getElementById("worldConcept").value = SAMPLE_WORLD.concept;
  generateFromInputs();
}

function clearDemo() {
  document.getElementById("worldName").value = "";
  document.getElementById("worldConcept").value = "";
  document.getElementById("markdownPreview").textContent = "";
  document.getElementById("jsonPreview").textContent = "";
  state.worldBible = null;
  setPreviewVisible(false);
  setStatus("Ready for a new world concept.");
}

function downloadCurrentMarkdown() {
  if (!state.worldBible) {
    setStatus("Generate a world bible before downloading Markdown.", true);
    return;
  }
  downloadFile(`${state.worldBible.slug}_world_bible.md`, renderMarkdown(state.worldBible), "text/markdown;charset=utf-8");
  setStatus(`Downloaded ${state.worldBible.slug}_world_bible.md.`);
}

function downloadCurrentJson() {
  if (!state.worldBible) {
    setStatus("Generate a world bible before downloading JSON.", true);
    return;
  }
  downloadFile(`${state.worldBible.slug}_world_bible.json`, renderJson(state.worldBible), "application/json;charset=utf-8");
  setStatus(`Downloaded ${state.worldBible.slug}_world_bible.json.`);
}

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("generateButton").addEventListener("click", generateFromInputs);
  document.getElementById("loadSampleButton").addEventListener("click", loadSample);
  document.getElementById("clearButton").addEventListener("click", clearDemo);
  document.getElementById("downloadMarkdownButton").addEventListener("click", downloadCurrentMarkdown);
  document.getElementById("downloadJsonButton").addEventListener("click", downloadCurrentJson);
  clearDemo();
});
