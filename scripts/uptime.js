// Run by .github/workflows/uptime.yml once a day on GitHub's servers.
// Checks the site; if it's down, opens a GitHub issue (which emails you).
const { SITE_URL, GITHUB_TOKEN, GITHUB_REPOSITORY } = process.env;
const ATTEMPTS = 3;
const TIMEOUT_MS = 90_000; // free Render services sleep and take ~1 min to wake

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function check() {
  let status = "no response";
  for (let i = 1; i <= ATTEMPTS; i++) {
    try {
      const res = await fetch(SITE_URL, { signal: AbortSignal.timeout(TIMEOUT_MS) });
      status = res.status;
      console.log(`Attempt ${i}: HTTP ${status}`);
      if (res.ok) return { up: true, status };
    } catch (err) {
      status = err.name;
      console.log(`Attempt ${i}: ${err.name}`);
    }
    if (i < ATTEMPTS) await sleep(30_000);
  }
  return { up: false, status };
}

async function github(path, options = {}) {
  const res = await fetch(`https://api.github.com/repos/${GITHUB_REPOSITORY}${path}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${GITHUB_TOKEN}`,
      Accept: "application/vnd.github+json",
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) throw new Error(`GitHub API ${res.status}: ${await res.text()}`);
  return res.json();
}

const { up, status } = await check();
if (up) {
  console.log("Site is up.");
} else {
  const open = await github("/issues?labels=site-down&state=open");
  if (open.length === 0) {
    const [owner] = GITHUB_REPOSITORY.split("/");
    await github("/issues", {
      method: "POST",
      body: JSON.stringify({
        title: `Site down: ${SITE_URL}`,
        body: `Uptime check got \`${status}\` after ${ATTEMPTS} attempts at ${new Date().toISOString()}.`,
        labels: ["site-down"],
        assignees: [owner],
      }),
    });
    console.log("Opened issue.");
  }
  process.exit(1); // mark the run as failed too
}
