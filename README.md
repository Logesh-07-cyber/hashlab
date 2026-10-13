# Hashlab — Hash & Password Analyzer

Hashlab is a browser-based cybersecurity learning tool that suggests possible hash formats, assesses password strength, and estimates theoretical password-guessing time under different assumptions.

## Features

- Heuristic identification of common hash formats, with ambiguity notices when formats overlap.
- Password strength feedback based on length, character variety, common words, repeated characters, and predictable patterns.
- Illustrative crack-time estimates for online throttling, a single CPU, a single GPU, and a GPU cluster.
- Interactive password length and character-set controls, plus sample, copy, and clear actions.
- Responsive interface with keyboard focus states and reduced-motion support.
- Analysis runs locally in the browser; no backend or API key is required.

## Use Hashlab in either of these ways

### Option 1: Open the live website

Once this repository has been deployed, you can open the published website in any modern browser. No Node.js, npm, or VS Code is required. Add your deployed URL here after publishing:

**Live demo:** `Add your deployed website URL here`

> Pushing the repository to GitHub does not automatically publish a live website. Deploy it with GitHub Pages, Vercel, or another static-site host first.

### Option 2: Run it locally with npm and Vite

**Requirements:** Node.js and npm.

1. Clone or download this repository.
2. Open a terminal in the project root—the folder containing `package.json`.
3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open the local URL shown in the terminal (usually `http://localhost:5173/`).

Useful commands:

```bash
npm run build    # Build the production site into dist/
npm run preview  # Preview the production build locally
```

You can also open `index.html` directly for a simple static preview, although Vite is recommended for development and production builds.

## Deploying the website

You can deploy the Vite project to Vercel or Netlify by importing the GitHub repository and using:

- **Build command:** `npm run build`
- **Output directory:** `dist`

For GitHub Pages, configure a deployment workflow to publish the generated `dist/` directory. The Vite configuration uses relative asset paths (`base: './'`) to support project-site paths.

## Tech stack

HTML · CSS · Vanilla JavaScript · Vite

## Important limitations

- A hash-format match is not definitive algorithm identification. Different algorithms can share a digest length and encoding.
- Crack-time values are illustrative estimates, not measured benchmarks. They use example guessing rates and assumptions about a uniformly random password and brute-force search.
- These estimates model a hypothetical password search space; they do not predict how quickly the submitted hash itself can be cracked.
- Actual results depend on the algorithm, salt, work factor, hardware, implementation, password choice, and attack strategy. Wordlists, predictable patterns, reused passwords, and leaked credentials can change results substantially.
- Parameterized password-hashing algorithms cannot be estimated accurately without their full configuration; displayed rates for these formats are placeholders.
- Hashlab does not perform actual hash cracking or password recovery. The password-strength analyzer is a lightweight educational heuristic, not a breach-database check or a guarantee of security.
- Password analysis happens in the browser and the app does not upload or store the entered password. For safety, never enter a password you currently use into a demo tool.

## Project structure

```text
hashlab/
├── index.html
├── style.css
├── script.js
├── package.json
├── vite.config.js
├── README.md
├── LICENSE
└── .gitignore
```

## Responsible use

Use this tool for learning, defensive auditing, and data you are authorized to inspect.

---

## Connect with me

<p align="left">
  <a href="https://www.linkedin.com/in/k-logesh-prasanna-cyber/">
    <img src="https://img.shields.io/badge/LinkedIn-Connect-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white" alt="Connect on LinkedIn" />
  </a>
  <a href="mailto:logeshprasanna2007@gmail.com">
    <img src="https://img.shields.io/badge/Email-Contact%20me-EA4335?style=for-the-badge&logo=gmail&logoColor=white" alt="Email me" />
  </a>
</p>

- **LinkedIn:** [K. Logesh Prasanna](https://www.linkedin.com/in/k-logesh-prasanna-cyber/)
- **Email:** [logeshprasanna2007@gmail.com](mailto:logeshprasanna2007@gmail.com)
