# ReExt AI Demo: Ext JS to React Migration POC

This repository is a **Proof of Concept (POC)** demonstrating a seamless migration path from **Ext JS to React** using the **ReExt wrapper**. It highlights how developers can modernize enterprise applications by embedding advanced **AI capabilities**—specifically natural language filtering and sorting—directly into Ext JS Grid components.

---

## 🚀 Overview

The primary goal of this application is to showcase how organizations can move to React without a "big bang" rewrite. By using the **ReExt library**, you can:
* **Bridge the Gap:** Run Ext JS components natively within a React functional architecture.
* **Modernize with AI:** Enhance standard Ext JS Grids with AI-driven logic, allowing users to filter and sort complex datasets using natural language instead of manual UI controls.
* **Incremental Migration:** Prove the feasibility of a phased transition from Sencha-based architectures to a modern React stack.

## 🛠️ Key AI Features

* **AI-Powered Filtering:** Users can type phrases like *"Show me all pending invoices over $500 from last month"* to instantly update the Ext JS Grid store.
* **Smart Sorter:** Natural language commands for complex multi-column sorting (e.g., *"Sort by region then by highest priority"*).
* **Semantic Understanding:** Leveraging LLMs to map user intent to Ext JS `proxy` filters and `sorters`.

---

## 📦 Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/CelestialSystem/reext_ai_demo.git](https://github.com/CelestialSystem/reext_ai_demo.git)
    cd reext_ai_demo
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Environment Configuration:**
    Create a `.env` file and add your AI provider credentials:
    ```env
    OPENAI_API_KEY=your_openai_api_key_here
    reextkey = "your_reext_trial_key_here"
    ```

4.  **Run the App:**
    ```bash
    npm start
    ```

---

## 🏗️ Architecture: The ReExt Approach

This POC follows a specific pattern for migration:
1.  **The Wrapper:** Using `<ReExt />` to render existing Ext JS Grid definitions.
2.  **The React Controller:** A React "Parent" component manages the AI input state.
3.  **The Bridge:** AI outputs are parsed into standard Ext JS `filter` and `sort` objects and applied to the Grid Store via React props.

---

**Developed with ❤️ by [Celestial Systems](https://www.celestialsys.com)**
