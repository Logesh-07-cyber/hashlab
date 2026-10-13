(() => {
  "use strict";

  const PATTERNS = [
    { name: "bcrypt", test: s => /^\$2[aby]?\$\d{2}\$[./A-Za-z0-9]{53}$/.test(s), note: "Adaptive password hash with a configurable work factor.", bits: null, rates: { online: 10, cpu: 2e4, gpu: 6e4, cluster: 5e5 } },
    { name: "MD5-crypt", test: s => /^\$1\$[./A-Za-z0-9]{0,8}\$[./A-Za-z0-9]{22}$/.test(s), note: "Unix modular format using a salt and MD5-based rounds.", bits: 128, rates: { online: 10, cpu: 5e6, gpu: 2e8, cluster: 3e9 } },
    { name: "SHA-256 crypt", test: s => /^\$5\$(rounds=\d+\$)?[^$]+\$[./A-Za-z0-9]+$/.test(s), note: "Unix modular format based on SHA-256; rounds and salt affect speed.", bits: 256, rates: { online: 10, cpu: 1e6, gpu: 3e7, cluster: 4e8 } },
    { name: "SHA-512 crypt", test: s => /^\$6\$(rounds=\d+\$)?[^$]+\$[./A-Za-z0-9]+$/.test(s), note: "Unix modular format based on SHA-512; rounds and salt affect speed.", bits: 512, rates: { online: 10, cpu: 4e5, gpu: 1e7, cluster: 1.5e8 } },
    { name: "Argon2", test: s => /^\$argon2(id|i|d)\$/.test(s), note: "Memory-hard password hashing format. Parameters are required for a meaningful estimate.", bits: null, rates: { online: 10, cpu: 1e3, gpu: 3e3, cluster: 1e4 } },
    { name: "PBKDF2 (encoded format)", test: s => /^(pbkdf2|sha256:|sha512:)/i.test(s), note: "Likely a PBKDF2 or application-specific encoded format; inspect its parameters.", bits: null, rates: { online: 10, cpu: 1e5, gpu: 5e5, cluster: 2e6 } },
    { name: "MySQL 4.1+", test: s => /^\*[A-F0-9]{40}$/.test(s), note: "MySQL double-SHA-1 password format.", bits: 160, rates: { online: 10, cpu: 8e8, gpu: 3e10, cluster: 5e11 } },
    { name: "SHA-512", test: s => /^[a-f0-9]{128}$/i.test(s), note: "128 hexadecimal characters; format alone cannot prove the algorithm.", bits: 512, rates: { online: 10, cpu: 3e8, gpu: 9e9, cluster: 1.5e11 } },
    { name: "SHA-384", test: s => /^[a-f0-9]{96}$/i.test(s), note: "96 hexadecimal characters; format alone cannot prove the algorithm.", bits: 384, rates: { online: 10, cpu: 3e8, gpu: 9e9, cluster: 1.5e11 } },
    { name: "SHA-256", test: s => /^[a-f0-9]{64}$/i.test(s), note: "64 hexadecimal characters; commonly SHA-256, but other formats can overlap.", bits: 256, rates: { online: 10, cpu: 5e8, gpu: 1.2e10, cluster: 2e11 } },
    { name: "SHA-224", test: s => /^[a-f0-9]{56}$/i.test(s), note: "56 hexadecimal characters; a likely SHA-224 digest.", bits: 224, rates: { online: 10, cpu: 5e8, gpu: 1.2e10, cluster: 2e11 } },
    { name: "SHA-1", test: s => /^[a-f0-9]{40}$/i.test(s), note: "40 hexadecimal characters; likely SHA-1, but format is not conclusive.", bits: 160, rates: { online: 10, cpu: 8e8, gpu: 3e10, cluster: 5e11 } },
    { name: "MD5 / NTLM", test: s => /^[a-f0-9]{32}$/i.test(s), note: "32 hexadecimal characters. MD5 and NTLM commonly share this appearance.", bits: 128, rates: { online: 10, cpu: 1e9, gpu: 5e10, cluster: 1e12 }, ambiguous: true },
    { name: "SHA-256 (Base64)", test: s => /^[A-Za-z0-9+/]{43}=$/.test(s), note: "44-character Base64 representation consistent with a SHA-256 digest.", bits: 256, rates: { online: 10, cpu: 5e8, gpu: 1.2e10, cluster: 2e11 } }
  ];

  const CHARSETS = {
    lower: { size: 26, label: "lowercase letters" },
    alnum: { size: 36, label: "lowercase letters and digits" },
    mixed: { size: 62, label: "uppercase, lowercase and digits" },
    full: { size: 95, label: "letters, digits and common symbols" }
  };
  const SCENARIOS = [
    { key: "online", label: "Online, throttled", color: "var(--teal)", defaultRate: 10 },
    { key: "cpu", label: "Offline, single CPU", color: "var(--orange)" },
    { key: "gpu", label: "Offline, single GPU", color: "var(--red)" },
    { key: "cluster", label: "Offline, GPU cluster", color: "#b6a4ff" }
  ];

  const $ = id => document.getElementById(id);
  const input = $("hashInput");
  const results = $("results");
  const emptyState = $("emptyState");
  const errorMessage = $("errorMessage");
  let currentResult = null;

  function identify(raw) {
    const value = raw.trim();
    return { value, matches: PATTERNS.filter(pattern => pattern.test(value)) };
  }

  function addDetail(list, label, value) {
    const row = document.createElement("div");
    row.className = "detail-row";
    const dt = document.createElement("dt");
    dt.textContent = label;
    const dd = document.createElement("dd");
    dd.textContent = value;
    row.append(dt, dd);
    list.appendChild(row);
  }

  function renderAnalysis(result) {
    const list = $("detailList");
    list.replaceChildren();
    const matches = result.matches;
    const primary = matches[0];

    $("algorithmName").textContent = primary ? primary.name : "Not recognized";
    $("algorithmNote").textContent = primary
      ? primary.note
      : "No known pattern matched this input. Check for extra spaces, truncation, or a format not covered by this tool.";

    if (primary) {
      const tag = document.createElement("span");
      tag.className = "confidence" + ((primary.ambiguous || matches.length > 1) ? " ambiguous" : "");
      tag.textContent = (primary.ambiguous || matches.length > 1) ? "AMBIGUOUS" : "LIKELY";
      $("algorithmName").appendChild(tag);
      if (primary.bits) addDetail(list, "Digest size", `${primary.bits} bits`);
      if (matches.length > 1) addDetail(list, "Other matches", matches.slice(1).map(item => item.name).join(", "));
      addDetail(list, "Format", /^\$/.test(result.value) ? "Modular crypt-style" : (/^\*/.test(result.value) ? "Database-specific" : (/^[a-f0-9]+$/i.test(result.value) ? "Hexadecimal" : "Base64 / encoded")));
      addDetail(list, "Assessment", primary.ambiguous || matches.length > 1 ? "Multiple possible interpretations" : "Pattern match only — not verified");
    } else {
      addDetail(list, "Input length", `${result.value.length} characters`);
      addDetail(list, "Encoding", /^[a-f0-9]+$/i.test(result.value) ? "Hexadecimal" : "Unknown / encoded");
      addDetail(list, "Assessment", "No matching signature in this tool");
    }

    $("inputLength").textContent = `${result.value.length} chars`;
    $("ambiguityNotice").hidden = !(primary && (primary.ambiguous || matches.length > 1));
    results.hidden = false;
    emptyState.hidden = true;
    renderEstimate();
  }

  function formatLarge(value) {
    if (!Number.isFinite(value)) return "effectively unlimited";
    if (value < 1e3) return Math.round(value).toLocaleString("en-US");
    const units = [
      [1e18, "quintillion"], [1e15, "quadrillion"], [1e12, "trillion"],
      [1e9, "billion"], [1e6, "million"], [1e3, "thousand"]
    ];
    for (const [size, label] of units) if (value >= size) return `${(value / size).toLocaleString("en-US", { maximumFractionDigits: 2 })} ${label}`;
    return String(value);
  }

  function formatDuration(seconds) {
    if (!Number.isFinite(seconds) || seconds > 1e25) return "effectively unlimited";
    if (seconds < 1) return "under 1 second";
    const units = [
      ["century", 3155760000], ["year", 31557600], ["day", 86400],
      ["hour", 3600], ["minute", 60], ["second", 1]
    ];
    for (const [label, size] of units) {
      if (seconds >= size) {
        const amount = seconds / size;
        if (amount >= 1e6) return `${amount.toExponential(1)} ${label}s`;
        const rounded = amount >= 100 ? Math.round(amount) : amount >= 10 ? Math.round(amount) : Math.round(amount * 10) / 10;
        return `${rounded.toLocaleString("en-US")} ${label}${rounded === 1 ? "" : "s"}`;
      }
    }
    return "under 1 second";
  }

  function renderEstimate() {
    if (!currentResult) return;
    const length = Number($("lengthRange").value);
    const charset = document.querySelector('input[name="charset"]:checked').value;
    const size = CHARSETS[charset].size;
    const keyspace = Math.pow(size, length);
    $("lengthOutput").textContent = `${length} ${length === 1 ? "character" : "characters"}`;
    $("keyspaceValue").textContent = formatLarge(keyspace);
    $("keyspaceExact").textContent = `${size}^${length} possible combinations`;
    $("averageSearch").textContent = "50% of space";

    const primary = currentResult.matches[0];
    const rates = primary ? primary.rates : { online: 10, cpu: 5e8, gpu: 1.2e10, cluster: 2e11 };
    const times = SCENARIOS.map(scenario => {
      const rate = rates[scenario.key] || scenario.defaultRate;
      return { ...scenario, rate, seconds: (keyspace / 2) / rate };
    });
    const maxLog = Math.max(...times.map(item => Math.log10(item.seconds + 1)), 1);
    const list = $("rateList");
    list.replaceChildren();

    times.forEach(item => {
      const row = document.createElement("div");
      row.className = "rate-row";
      const left = document.createElement("div");
      const name = document.createElement("div");
      name.className = "rate-name";
      name.textContent = item.label;
      const speed = document.createElement("span");
      speed.className = "rate-speed";
      speed.textContent = `${formatRate(item.rate)} guesses/sec`;
      const bar = document.createElement("div");
      bar.className = "rate-bar";
      const fill = document.createElement("span");
      fill.style.width = `${Math.max(3, Math.min(100, Math.log10(item.seconds + 1) / maxLog * 100))}%`;
      fill.style.background = item.color;
      bar.appendChild(fill);
      left.append(name, speed, bar);
      const time = document.createElement("div");
      time.className = "rate-time";
      time.textContent = formatDuration(item.seconds);
      row.append(left, time);
      list.appendChild(row);
    });
  }

  function formatRate(rate) {
    if (rate >= 1e9) return `${(rate / 1e9).toLocaleString("en-US", { maximumFractionDigits: 1 })}B`;
    if (rate >= 1e6) return `${(rate / 1e6).toLocaleString("en-US", { maximumFractionDigits: 1 })}M`;
    if (rate >= 1e3) return `${(rate / 1e3).toLocaleString("en-US", { maximumFractionDigits: 1 })}K`;
    return rate.toLocaleString("en-US");
  }

  function analyze() {
    errorMessage.hidden = true;
    const raw = input.value.trim();
    if (!raw) {
      errorMessage.textContent = "Enter a hash or digest to analyze.";
      errorMessage.hidden = false;
      input.focus();
      return;
    }
    if (raw.length > 4096) {
      errorMessage.textContent = "Input is longer than 4,096 characters. Check that you pasted only the hash.";
      errorMessage.hidden = false;
      return;
    }
    currentResult = identify(raw);
    renderAnalysis(currentResult);
  }

  $("analyzeBtn").addEventListener("click", analyze);
  input.addEventListener("keydown", event => {
    if ((event.ctrlKey || event.metaKey) && event.key === "Enter") analyze();
  });
  $("clearBtn").addEventListener("click", () => {
    input.value = "";
    currentResult = null;
    results.hidden = true;
    emptyState.hidden = false;
    errorMessage.hidden = true;
    input.focus();
  });
  $("sampleBtn").addEventListener("click", () => {
    input.value = "5f4dcc3b5aa765d61d8327deb882cf99";
    analyze();
  });
  $("lengthRange").addEventListener("input", renderEstimate);
  document.querySelectorAll('input[name="charset"]').forEach(radio => radio.addEventListener("change", renderEstimate));
  $("copyHashBtn").addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(currentResult.value);
      $("copyHashBtn").textContent = "✓";
      $("copyHashBtn").setAttribute("aria-label", "Hash copied");
      setTimeout(() => {
        $("copyHashBtn").textContent = "⧉";
        $("copyHashBtn").setAttribute("aria-label", "Copy input hash");
      }, 1300);
    } catch {
      errorMessage.textContent = "Clipboard access is unavailable. Select and copy the input manually.";
      errorMessage.hidden = false;
    }
  });
})();
