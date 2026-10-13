# Hashlab — Hash Identifier & Crack-Time Estimator

A responsive, browser-based security learning tool that identifies **likely** hash formats from common signatures and estimates theoretical brute-force search time for a hypothetical password.

## Features

- Heuristic recognition for common digest and password-hash formats.
- Explicit ambiguity messaging when formats overlap (for example, MD5 and NTLM).
- Crack-time estimates for online throttling, a single CPU, a single GPU, and a GPU cluster.
- Interactive password length and character-set controls.
- Copy, clear, and sample-input actions.
- Responsive layout, keyboard focus states, and reduced-motion support.
- All analysis runs locally in the browser. No backend or API key is required.

## Run locally with Vite

**Requirements:** Node.js 20.19+ (or 22.12+) and npm. Node.js 24 works.

1. Download or clone this repository.
2. Open a terminal in the project folder — the folder containing `package.json`.
3. Install the dependencies:

   ```bash
   npm install
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open the local URL printed in the terminal (usually `http://localhost:5173/`).

Useful commands:

```bash
npm run build    # Create the production site in dist/
npm run preview  # Preview the production build locally
```

If npm reports that `package.json` cannot be found, check that your terminal is in the project root. In PowerShell, you can navigate there with `cd "$HOME\Downloads\hashlab"` if that is where you extracted the project. If the extracted archive created an extra nested folder, `cd` into the inner folder that contains `package.json`.

## Deploy with GitHub Pages

1. Push the project files to your GitHub repository.
2. Run `npm install` and `npm run build` locally.
3. Publish the contents of the generated `dist/` folder using your preferred GitHub Pages deployment workflow.
4. The Vite configuration uses relative asset paths (`base: './'`) to support project-site paths.

You can still open `index.html` directly in a browser, but using `npm run dev` is recommended for development.

## Important limitations

- **A format match is not definitive algorithm identification.** Multiple algorithms can share a digest length and encoding. Real identification may require metadata, the source application, or known parameters.
- **Crack times are illustrative estimates, not measured benchmarks.** The app uses hard-coded example rates and assumes a uniform random password, brute-force search, and an average search of half the keyspace.
- The estimate is a password search-space model. It is **not a prediction of how quickly the submitted hash itself can be cracked**. Real performance depends on the exact algorithm, salt, work factor, hardware, implementation, and attack strategy.
- Wordlists, rules, reused passwords, and leaked credentials can make real-world recovery much faster than a full brute-force model.
- Argon2 and other parameterized password-hashing schemes cannot be estimated accurately without their full configuration; the rates for these formats are only placeholders.
- No hash cracking, password recovery, upload, or server-side processing is performed.

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

## Tech stack

HTML · CSS · Vanilla JavaScript · Vite

## Responsible use

Use this tool for learning, defensive auditing, and data you are authorized to inspect. Do not paste secrets or production credentials into tools unless you are authorized and understand the handling of that data.
