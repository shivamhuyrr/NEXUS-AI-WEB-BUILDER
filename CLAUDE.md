# NEXUS AI Development Manual (CLAUDE.md)

This document outlines the engineering standards, tool categories, and decision-tree logic for the NEXUS AI Website Builder.

## 🛠️ System Capabilities (15 Core Skills)

The NEXUS AI ecosystem is categorized into specialized skill-sets that handle different phases of the site generation lifecycle:

| Skill ID | Category | Description |
| :--- | :--- | :--- |
| `arch-layout-v1` | **Architecture** | Deterministic planning of HTML5 semantic hierarchy. |
| `sse-stream-v2` | **Streaming** | Server-Sent Events management with chunk-based serialization. |
| `reg-extract-3.0` | **Parsing** | High-performance regex engines for HTML/CSS extraction from raw LLM output. |
| `style-glass-7` | **Design** | Implementation of glassmorphism shaders and backdrop-blur utilities. |
| `resp-flex-grid` | **Responsiveness** | Mobile-first Flexbox and CSS Grid layout strategies. |
| `iframe-iso-std` | **Security** | Sandboxed execution of generated Javascript in isolated environments. |
| `delta-mod-diff` | **Modification** | Intelligent diffing and patching for fine-grained website updates. |
| `tailwind-opt-4` | **Styles** | Just-in-Time compilation patterns for utility-first styling. |
| `i18n-ctx-node` | **Localization** | Multi-language translation trees for worldwide deployment. |
| `asset-p-node` | **Assets** | Dynamic logo and SVG asset management. |
| `shimmer-ldr-v1` | **UX** | State-aware skeleton loading and progress visualization. |
| `csb-bridge-x` | **Export** | API bridge for CodeSandbox project instantiation. |

## 🌲 Prompt Decision Tree

When a user submits a prompt, the system routes the request through a prioritized logic tree:

1. **Intent: Generation** (`userInput` → `generateWebsite`)
    * *System Action*: Initialize `arch-layout-v1` → `sse-stream-v2` → `LiveRenderer`.
2. **Intent: Tweak/Style** (`modifyInput` → `modifyWebsite`)
    * *System Action*: Load context → `delta-mod-diff` → Update `styles/LiveRenderer.css`.
3. **Intent: Performance**
    * *System Action*: Optimize `tailwind-opt-4` classes.

## 📐 Development Rules

* **Code separation**: Always keep HTML, CSS, and JS logic separated for cleaner stream parsing.
* **Safety**: Never inject unsanitized strings directly into the DOM outside the `LiveRenderer` iframe.
* **Micro-animations**: Use `framer-motion` for all state-based transitions (see `AIStepVisualizer.js`).
