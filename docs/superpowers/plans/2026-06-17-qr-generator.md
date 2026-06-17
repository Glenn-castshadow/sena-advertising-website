# QR Code Generator Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a standalone `qr-generator.html` page for Sunroad Auto dealership staff to generate print-ready QR codes (3" × 3") from vehicle URLs, with PNG (900×900px) and SVG export.

**Architecture:** Single self-contained HTML file with inline CSS and JS — no dependency on SENA's shared styles or scripts, no nav bar. Uses `qr-code-styling` via CDN for QR generation and both export formats. Dark header with Sunroad Auto logo, centered white card on gray body, URL input with 300ms debounce live preview, export buttons disabled until a valid URL is entered.

**Tech Stack:** Plain HTML/CSS/JS, `qr-code-styling@1.6.0-rc1` (CDN via unpkg)

---

## File Map

| Action | Path | Responsibility |
|---|---|---|
| Create | `qr-generator.html` | Entire page — HTML structure, inline CSS, inline JS |

---

### Task 1: Page scaffold — header, card shell, all base CSS

**Files:**
- Create: `qr-generator.html`

- [ ] **Step 1: Create `qr-generator.html` with this exact content**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>QR Code Generator | Sunroad Auto</title>
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    body {
      background: #f0f0f0;
      font-family: -apple-system, 'Inter', Helvetica, sans-serif;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
    }

    .page-header {
      background: #1a1a1a;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 20px 16px 16px;
      gap: 8px;
    }

    .logo {
      max-height: 48px;
      max-width: 220px;
      display: block;
    }

    .page-title {
      font-size: 10px;
      letter-spacing: .18em;
      text-transform: uppercase;
      color: #666;
    }

    .main {
      flex: 1;
      display: flex;
      align-items: flex-start;
      justify-content: center;
      padding: 32px 16px 48px;
    }

    .card {
      width: 100%;
      max-width: 420px;
      background: #fff;
      border-radius: 12px;
      box-shadow: 0 4px 24px rgba(0,0,0,0.10), 0 1px 4px rgba(0,0,0,0.06);
      padding: 28px 28px 24px;
    }

    .field-label {
      display: block;
      font-size: 11px;
      font-weight: 600;
      letter-spacing: .08em;
      text-transform: uppercase;
      color: #666;
      margin-bottom: 6px;
    }

    .url-input {
      width: 100%;
      border: 1.5px solid #ddd;
      border-radius: 7px;
      padding: 11px 14px;
      font-size: 14px;
      color: #222;
      background: #fafafa;
      outline: none;
      transition: border-color .2s;
      font-family: inherit;
    }
    .url-input:focus { border-color: #555; background: #fff; }
    .url-input.error { border-color: #e53e3e; }
    .url-input::placeholder { color: #bbb; }

    .error-msg {
      display: none;
      font-size: 11.5px;
      color: #e53e3e;
      margin-top: 5px;
    }
    .error-msg.visible { display: block; }

    .qr-area {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin: 24px 0 20px;
      gap: 10px;
    }

    .qr-box {
      width: 160px;
      height: 160px;
      border: 1.5px solid #e0e0e0;
      border-radius: 8px;
      background: #f8f8f8;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
    }

    #qr-preview svg { display: block; }

    .qr-placeholder {
      font-size: 12px;
      color: #bbb;
      text-align: center;
      padding: 0 16px;
      line-height: 1.6;
    }

    .qr-meta {
      font-size: 11px;
      color: #aaa;
      letter-spacing: .04em;
    }

    .divider {
      border: none;
      border-top: 1px solid #eee;
      margin: 4px 0 20px;
    }

    .export-row { display: flex; gap: 10px; }

    .btn {
      flex: 1;
      padding: 11px 0;
      border: none;
      border-radius: 7px;
      font-size: 13px;
      font-weight: 600;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 7px;
      transition: opacity .15s, background .15s;
      font-family: inherit;
    }
    .btn:disabled { opacity: .35; cursor: not-allowed; }
    .btn-png { background: #1a1a1a; color: #fff; }
    .btn-png:not(:disabled):hover { background: #333; }
    .btn-svg { background: #f0f0f0; color: #333; border: 1.5px solid #ddd; }
    .btn-svg:not(:disabled):hover { background: #e6e6e6; }

    .btn-label { line-height: 1; text-align: left; }
    .btn-sub {
      display: block;
      font-size: 9px;
      font-weight: 400;
      letter-spacing: .06em;
      text-transform: uppercase;
      color: #888;
      margin-top: 2px;
    }
    .btn-png .btn-sub { color: #aaa; }
    .btn-icon { font-size: 14px; }

    .card-footer {
      margin-top: 16px;
      text-align: center;
      font-size: 10.5px;
      color: #bbb;
    }

    .lib-error {
      color: #e53e3e;
      text-align: center;
      padding: 20px;
      font-size: 14px;
      line-height: 1.6;
    }
  </style>
</head>
<body>

  <div class="page-header">
    <img
      src="https://www.sunroadauto.com/wp-content/themes/DealerInspireDealerTheme/images/logo.png"
      alt="Sunroad Auto"
      class="logo"
      onerror="this.style.display='none'"
    >
    <div class="page-title">QR Code Generator</div>
  </div>

  <main class="main">
    <div class="card">
      <p style="color:#bbb;text-align:center;padding:20px 0;">Scaffold — content coming</p>
    </div>
  </main>

</body>
</html>
```

- [ ] **Step 2: Open `qr-generator.html` directly in a browser (File → Open or drag to browser)**

Expected:
- Dark header at top (`#1a1a1a`)
- Sunroad Auto logo visible (white logo on dark strip)
- "QR CODE GENERATOR" in small gray uppercase below logo
- Light gray body (`#f0f0f0`)
- White rounded card centered with placeholder text
- No console errors

- [ ] **Step 3: Commit**

```bash
git add qr-generator.html
git commit -m "feat: add qr generator page scaffold with header and base css"
```

---

### Task 2: URL input with validation

**Files:**
- Modify: `qr-generator.html`

- [ ] **Step 1: Replace the scaffold placeholder `<p>` inside `.card` with the input HTML**

Replace:
```html
      <p style="color:#bbb;text-align:center;padding:20px 0;">Scaffold — content coming</p>
```

With:
```html
      <label class="field-label" for="url-input">Vehicle URL</label>
      <input
        type="url"
        id="url-input"
        class="url-input"
        placeholder="https://sunroadauto.com/inventory/…"
        autocomplete="off"
        spellcheck="false"
      >
      <div class="error-msg" id="error-msg">Please enter a valid URL</div>
```

- [ ] **Step 2: Add a `<script>` block just before `</body>` with the validation logic**

```html
  <script>
    const urlInput = document.getElementById('url-input');
    const errorMsg = document.getElementById('error-msg');

    function isValidUrl(str) {
      if (!str) return false;
      try {
        const url = new URL(str);
        return url.protocol === 'http:' || url.protocol === 'https:';
      } catch {
        return false;
      }
    }

    function setInputState(value) {
      const hasValue = value.length > 0;
      const valid = isValidUrl(value);
      urlInput.classList.toggle('error', hasValue && !valid);
      errorMsg.classList.toggle('visible', hasValue && !valid);
    }

    let debounceTimer;
    urlInput.addEventListener('input', () => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        const val = urlInput.value.trim();
        setInputState(val);
      }, 300);
    });
  </script>
```

- [ ] **Step 3: Reload and verify validation**

| Input | Expected |
|---|---|
| `hello` | Red border + "Please enter a valid URL" |
| `https://sunroadauto.com/inventory/car` | Normal border, no error |
| Clear the field | No error shown (empty is not invalid) |
| `ftp://example.com` | Red border (only http/https are valid) |

- [ ] **Step 4: Commit**

```bash
git add qr-generator.html
git commit -m "feat: add url input with debounced validation"
```

---

### Task 3: QR preview with live update

**Files:**
- Modify: `qr-generator.html`

- [ ] **Step 1: Add the `qr-code-styling` CDN script tag in `<head>`, directly after the closing `</style>` tag**

```html
  <script src="https://unpkg.com/qr-code-styling@1.6.0-rc1/lib/qr-code-styling.js"></script>
```

- [ ] **Step 2: Add the QR area HTML inside `.card`, after the `error-msg` div**

```html
      <div class="qr-area">
        <div class="qr-box">
          <div class="qr-placeholder" id="qr-placeholder">Enter a URL<br>to generate a QR code</div>
          <div id="qr-preview" style="display:none"></div>
        </div>
        <div class="qr-meta">3&Prime; &times; 3&Prime; &nbsp;&middot;&nbsp; Print-ready &nbsp;&middot;&nbsp; Error correction: High</div>
      </div>

      <hr class="divider">
```

- [ ] **Step 3: At the very top of the `<script>` block (before the `urlInput` line), add the library guard**

```javascript
    if (typeof QRCodeStyling === 'undefined') {
      document.querySelector('.card').innerHTML =
        '<p class="lib-error">Failed to load QR library.<br>Please check your internet connection and reload.</p>';
      throw new Error('QRCodeStyling not loaded');
    }
```

- [ ] **Step 4: After the `let debounceTimer;` line, add QR preview variables and the preview instance**

```javascript
    const qrPlaceholder = document.getElementById('qr-placeholder');
    const qrPreview = document.getElementById('qr-preview');

    const previewQR = new QRCodeStyling({
      width: 160,
      height: 160,
      type: 'svg',
      data: 'placeholder',
      margin: 4,
      dotsOptions: { color: '#000000', type: 'square' },
      backgroundOptions: { color: '#ffffff' },
      qrOptions: { errorCorrectionLevel: 'H' }
    });
    let previewAppended = false;
```

- [ ] **Step 5: After the `previewAppended` line, add the `updatePreview` function**

```javascript
    function updatePreview(url) {
      const valid = isValidUrl(url);
      if (valid) {
        if (!previewAppended) {
          previewQR.append(qrPreview);
          previewAppended = true;
        }
        previewQR.update({ data: url });
        qrPlaceholder.style.display = 'none';
        qrPreview.style.display = 'block';
      } else {
        qrPlaceholder.style.display = '';
        qrPreview.style.display = 'none';
      }
    }
```

- [ ] **Step 6: Update the debounce handler to also call `updatePreview`**

Replace the existing `urlInput.addEventListener` block with:
```javascript
    urlInput.addEventListener('input', () => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        const val = urlInput.value.trim();
        setInputState(val);
        updatePreview(val);
      }, 300);
    });
```

- [ ] **Step 7: Reload and verify QR preview**

| Action | Expected |
|---|---|
| Load page | Gray box with "Enter a URL to generate a QR code" |
| Paste `https://sunroadauto.com/inventory/2024-toyota-camry` | QR code renders in box after ~300ms |
| Scan QR with phone | Phone opens `https://sunroadauto.com/inventory/2024-toyota-camry` |
| Clear the input | Placeholder text returns |
| Check browser console | No errors |

- [ ] **Step 8: Commit**

```bash
git add qr-generator.html
git commit -m "feat: add live qr preview with qr-code-styling"
```

---

### Task 4: Export buttons — PNG and SVG download

**Files:**
- Modify: `qr-generator.html`

- [ ] **Step 1: Add export row HTML inside `.card`, after the `<hr class="divider">` line**

```html
      <div class="export-row">
        <button class="btn btn-png" id="btn-png" disabled>
          <span class="btn-icon">&#8595;</span>
          <span class="btn-label">Export PNG<span class="btn-sub">900 &times; 900 px</span></span>
        </button>
        <button class="btn btn-svg" id="btn-svg" disabled>
          <span class="btn-icon">&#8595;</span>
          <span class="btn-label">Export SVG<span class="btn-sub">Scalable vector</span></span>
        </button>
      </div>

      <div class="card-footer">QR code updates live as you type</div>
```

- [ ] **Step 2: In the `<script>` block, insert button references and export functions AFTER the `previewAppended` declaration and BEFORE the `updatePreview` function**

```javascript
    const btnPng = document.getElementById('btn-png');
    const btnSvg = document.getElementById('btn-svg');

    const EXPORT_CONFIG = {
      dotsOptions: { color: '#000000', type: 'square' },
      backgroundOptions: { color: '#ffffff' },
      qrOptions: { errorCorrectionLevel: 'H' }
    };

    function exportPng() {
      const url = urlInput.value.trim();
      if (!isValidUrl(url)) return;
      try {
        new QRCodeStyling({
          width: 900, height: 900,
          type: 'canvas',
          data: url,
          margin: 28,
          ...EXPORT_CONFIG
        }).download({ name: 'qr-code', extension: 'png' });
      } catch (e) {
        alert('PNG export failed. Please try again.');
      }
    }

    function exportSvg() {
      const url = urlInput.value.trim();
      if (!isValidUrl(url)) return;
      try {
        new QRCodeStyling({
          width: 900, height: 900,
          type: 'svg',
          data: url,
          margin: 28,
          ...EXPORT_CONFIG
        }).download({ name: 'qr-code', extension: 'svg' });
      } catch (e) {
        alert('SVG export failed. Please try again.');
      }
    }

    btnPng.addEventListener('click', exportPng);
    btnSvg.addEventListener('click', exportSvg);
```

- [ ] **Step 3: Replace the existing `updatePreview` function with this updated version that also toggles button state**

```javascript
    function updatePreview(url) {
      const valid = isValidUrl(url);

      btnPng.disabled = !valid;
      btnSvg.disabled = !valid;

      if (valid) {
        if (!previewAppended) {
          previewQR.append(qrPreview);
          previewAppended = true;
        }
        previewQR.update({ data: url });
        qrPlaceholder.style.display = 'none';
        qrPreview.style.display = 'block';
      } else {
        qrPlaceholder.style.display = '';
        qrPreview.style.display = 'none';
      }
    }
```

- [ ] **Step 4: Reload and verify exports**

| Action | Expected |
|---|---|
| Load page | Both buttons grayed out (disabled) |
| Enter `https://sunroadauto.com/inventory/2024-ford-f150` | Both buttons become active |
| Click **Export PNG** | Browser downloads `qr-code.png` |
| Open `qr-code.png` | Image is 900 × 900 pixels, black QR on white |
| Scan `qr-code.png` with phone | Opens `https://sunroadauto.com/inventory/2024-ford-f150` |
| Click **Export SVG** | Browser downloads `qr-code.svg` |
| Open `qr-code.svg` in browser | Renders as a valid QR code |
| Clear the input | Both buttons gray out again |

- [ ] **Step 5: Commit**

```bash
git add qr-generator.html
git commit -m "feat: add png and svg export with disabled state"
```

---

### Task 5: Error handling verification

**Files:**
- No code changes — verification only (error handling was built in Tasks 1–4)

- [ ] **Step 1: Verify logo failure is graceful**

In browser DevTools (F12) → Network tab → right-click the logo image request → "Block request URL". Reload.

Expected: Logo `<img>` disappears (no broken image icon). Dark header still shows the "QR CODE GENERATOR" label. Card is fully functional.

Unblock the URL when done.

- [ ] **Step 2: Verify library failure message**

Temporarily edit the CDN script `src` in `qr-generator.html` to a bad URL:
```html
  <script src="https://unpkg.com/qr-code-styling@1.6.0-rc1/lib/qr-code-styling-BROKEN.js"></script>
```

Reload the page.

Expected: Card shows red text — "Failed to load QR library. Please check your internet connection and reload."

Restore the correct URL:
```html
  <script src="https://unpkg.com/qr-code-styling@1.6.0-rc1/lib/qr-code-styling.js"></script>
```

- [ ] **Step 3: Commit**

```bash
git add qr-generator.html
git commit -m "feat: complete qr generator proof of concept for sunroad auto"
```

---

### Task 6: Final verification checklist

**Files:**
- No changes — read-only verification

- [ ] **Step 1: Full happy-path in Chrome**

1. Open `qr-generator.html` in Chrome
2. Sunroad Auto logo visible on dark header
3. Type `https://sunroadauto.com/inventory/2024-toyota-camry-xse` — QR renders after ~300ms
4. Click **Export PNG** → `qr-code.png` downloads
5. Check file dimensions: must be 900 × 900 pixels
6. Scan `qr-code.png` with a phone → must open `https://sunroadauto.com/inventory/2024-toyota-camry-xse`
7. Click **Export SVG** → `qr-code.svg` downloads
8. Open `qr-code.svg` in a browser tab → must render as a scannable QR code

- [ ] **Step 2: Repeat in Firefox and Edge**

Both PNG and SVG exports must work in all three browsers.

- [ ] **Step 3: Edge case sweep**

| Input | Expected |
|---|---|
| Empty field on load | Placeholder shown, both buttons disabled |
| `not a url` | Red border, error message, buttons disabled |
| `ftp://example.com` | Red border (protocol not http/https), buttons disabled |
| `https://a` | Valid — QR renders, buttons active |
| A URL with 400+ characters | QR renders (error correction H handles density) |

- [ ] **Step 4: Confirm the file is self-contained**

Copy `qr-generator.html` to your Desktop. Open it from there (no project context). The page should load and work identically (assuming internet access for the CDN).
