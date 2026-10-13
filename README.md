# HashLab — Hash & Password Analyzer

HashLab is a browser-based cybersecurity learning tool built with HTML, CSS, JavaScript, and Vite. It helps users explore possible hash formats, evaluate password strength, and understand theoretical password-guessing time under different assumptions.

## Features

- **Hash identification:** Suggests possible formats for common hashes and highlights ambiguity when multiple algorithms may match.
- **Password strength analysis:** Evaluates length, character variety, common passwords, repeated characters, and predictable patterns.
- **Crack-time estimation:** Illustrates theoretical guessing times for online throttling, a single CPU, a single GPU, and a GPU cluster.
- **Interactive controls:** Adjust password length and character sets, use sample inputs, and access copy and clear actions.
- **Responsive interface:** Supports different screen sizes, keyboard focus states, and reduced-motion preferences.
- **Privacy-focused design:** Performs analysis locally in the browser without requiring a backend or API key.

## Live Demo

**Live website:** Add your deployed website URL here.

> The GitHub repository is not automatically a live website. Deploy the project using GitHub Pages, Vercel, or Netlify before adding your public URL.

## Run Locally

### Requirements

- Node.js
- npm

### Installation

1. Clone or download this repository.
2. Open a terminal in the project root, where `package.json` is located.
3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open the local URL printed in the terminal, usually `http://localhost:5173/`.

### Useful Commands

```bash
npm run dev      # Start the development server
npm run build    # Build the production site into dist/
npm run preview  # Preview the production build locally
```

## Deployment

You can deploy this Vite project using Vercel or Netlify by importing the GitHub repository.

| Setting | Value |
|---|---|
| Build command | `npm run build` |
| Output directory | `dist` |
| Install command | `npm install` |

For GitHub Pages, configure a deployment workflow to publish the generated `dist/` directory. Ensure the Vite base path matches your deployment URL.

## Tech Stack

- HTML5
- CSS3
- Vanilla JavaScript
- Vite

## Project Structure

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

## Important Limitations

- Hash-format identification is heuristic. A matching digest length or encoding does not prove which algorithm generated a hash.
- Crack-time values are illustrative estimates based on assumed guessing rates and search spaces. They are not measured benchmarks.
- These estimates do not predict how quickly a particular submitted hash can be cracked.
- Real attack times depend on the algorithm, salt, work factor, hardware, implementation, password choice, and attack strategy.
- Wordlists, predictable patterns, reused passwords, and leaked credentials can significantly affect password security.
- Parameterized password-hashing algorithms require their full configuration for meaningful estimates. Placeholder rates must not be interpreted as accurate benchmarks.
- HashLab does not perform actual hash cracking or password recovery.
- Password strength results are educational heuristics, not a guarantee of security or a breach-database check.
- Password analysis runs locally in the browser. The application is designed not to upload or store entered passwords. Avoid entering passwords you currently use.

## Responsible Use

Use HashLab for cybersecurity education, defensive auditing, and data you are authorized to inspect. Do not use it to access accounts or data without permission.

## Connect With Me

**K. Logesh Prasanna**

[Connect with me on LinkedIn](https://www.linkedin.com/in/k-logesh-prasanna-cyber/)
