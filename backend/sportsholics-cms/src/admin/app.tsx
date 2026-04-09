import type { StrapiApp } from '@strapi/strapi/admin';
import * as XLSX from 'xlsx';
import { setPluginConfig, defaultHtmlPreset } from '@_sh/strapi-plugin-ckeditor';

// This is the admin panel for the Sports Holics CMS
export default {
  config: {
    // Add custom locales if needed
    locales: [
      // 'fr',
      // 'es',
    ],
    
    // Customize authentication page
    auth: {
      logo: '/no_back.png', // Custom logo (you can add your own)
    },
    
    // Customize main navigation
    head: {
      favicon: '/no_back.png',
    },
    
    // Customize the admin panel's look and feel
    theme: {
      light: {
        colors: {
          // Primary brand color (Sports Holics Red)
          primary100: '#fef2f2',
          primary200: '#fee2e2',
          primary500: '#ef4444',
          primary600: '#dc2626',
          primary700: '#b91c1c',
          
          // Secondary color (Sports Holics Blue)
          secondary100: '#dbeafe',
          secondary200: '#bfdbfe',
          secondary500: '#1e40af',
          secondary600: '#1e3a8a',
          secondary700: '#1e3a8a',
          
          // Accent colors
          alternative100: '#f0f9ff',
          alternative200: '#e0f2fe',
          alternative500: '#0ea5e9',
          alternative600: '#0284c7',
          alternative700: '#0369a1',
          
          // Success colors
          success100: '#dcfce7',
          success200: '#bbf7d0',
          success500: '#22c55e',
          success600: '#16a34a',
          success700: '#15803d',
          
          // Danger colors
          danger100: '#fee2e2',
          danger200: '#fecaca',
          danger500: '#ef4444',
          danger600: '#dc2626',
          danger700: '#b91c1c',
          
          // Warning colors
          warning100: '#fef3c7',
          warning200: '#fde68a',
          warning500: '#f59e0b',
          warning600: '#d97706',
          warning700: '#b45309',
          
          // Neutral colors
          neutral0: '#ffffff',
          neutral100: '#f9fafb',
          neutral150: '#f3f4f6',
          neutral200: '#e5e7eb',
          neutral300: '#d1d5db',
          neutral400: '#9ca3af',
          neutral500: '#6b7280',
          neutral600: '#4b5563',
          neutral700: '#374151',
          neutral800: '#1f2937',
          neutral900: '#111827',
          neutral1000: '#000000',
        },
      },
      
      // Dark theme customization
      dark: {
        colors: {
          // Primary brand color (Sports Holics Red)
          primary100: '#7f1d1d',
          primary200: '#991b1b',
          primary500: '#ef4444',
          primary600: '#f87171',
          primary700: '#fca5a5',
          
          // Secondary color (Sports Holics Blue)
          secondary100: '#1e3a8a',
          secondary200: '#1e40af',
          secondary500: '#3b82f6',
          secondary600: '#60a5fa',
          secondary700: '#93c5fd',
          
          // Background colors for dark theme
          neutral0: '#1f2937',
          neutral100: '#111827',
          neutral150: '#0f172a',
          neutral200: '#1e293b',
          neutral300: '#334155',
          neutral400: '#475569',
          neutral500: '#64748b',
          neutral600: '#94a3b8',
          neutral700: '#cbd5e1',
          neutral800: '#e2e8f0',
          neutral900: '#f1f5f9',
          neutral1000: '#ffffff',
        },
      },
    },
    
    // Customize translations and labels
    translations: {
      en: {
        'app.components.LeftMenu.navbrand.title': 'Sports Holics',
        'app.components.LeftMenu.navbrand.workplace': 'CMS Dashboard',
        'Auth.form.welcome.title': 'Welcome to Sports Holics!',
        'Auth.form.welcome.subtitle': 'Log in to your Sports Holics CMS account',
        'HomePage.welcome': 'Welcome to Sports Holics CMS! 🏆',
        'HomePage.welcome.again': 'Welcome back to Sports Holics! ⚽',
      },
    },
    
    // Custom menu configuration
    menu: {
      logo: '/no_back.png',
    },
    
    // Tutorials configuration
    tutorials: false, // Disable default tutorials for cleaner experience
    
    // Notifications configuration
    notifications: {
      releases: false, // Disable release notifications for cleaner UI
    },
  },
  
  register(_app: StrapiApp) {
    // Customize CKEditor 5: remove the SourceEditing and htmlEmbed buttons
    // from the default toolbar. Both allow editors to insert arbitrary HTML,
    // which is an XSS vector if an admin account is ever compromised — the
    // HTML flows through dangerouslySetInnerHTML on the frontend. Every
    // other formatting feature (bold, italic, headings, links, lists,
    // tables, images, media embed, etc.) remains available.
    const cleanToolbar = (defaultHtmlPreset.editorConfig?.toolbar as unknown[])?.filter(
      (item) => typeof item !== 'string' || (item !== 'SourceEditing' && item !== 'htmlEmbed')
    );

    setPluginConfig({
      presets: [
        {
          ...defaultHtmlPreset,
          name: 'defaultHtml',
          description: 'Default HTML editor (source view disabled)',
          editorConfig: {
            ...defaultHtmlPreset.editorConfig,
            toolbar: cleanToolbar as never,
          },
        },
      ],
    });
  },

  bootstrap(app: StrapiApp) {
    // Custom styling injected on bootstrap
    const style = document.createElement('style');
    style.textContent = `
      /* Custom Sports Holics branding styles */
      
      /* Logo text styling */
      [class*="LeftMenu"] [class*="NavBrand"] {
        font-family: 'Arial Black', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        font-weight: 900;
        background: linear-gradient(135deg, #ef4444 0%, #dc2626 50%, #1e40af 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        font-size: 1.25rem;
        letter-spacing: -0.02em;
      }
      
      /* Main header styling */
      [class*="MainNav"] {
        background: linear-gradient(90deg, #fef2f2 0%, #dbeafe 100%);
        border-bottom: 2px solid #ef4444;
      }
      
      /* Button hover effects */
      button[class*="Button"]:hover {
        transform: translateY(-1px);
        transition: all 0.2s ease;
      }
      
      /* Card hover effects */
      [class*="Box"] {
        transition: all 0.3s ease;
      }
      
      [class*="Box"]:hover {
        box-shadow: 0 10px 25px -5px rgba(239, 68, 68, 0.1);
      }
      
      /* Custom scrollbar */
      ::-webkit-scrollbar {
        width: 10px;
        height: 10px;
      }
      
      ::-webkit-scrollbar-track {
        background: #f3f4f6;
        border-radius: 5px;
      }
      
      ::-webkit-scrollbar-thumb {
        background: linear-gradient(180deg, #ef4444 0%, #1e40af 100%);
        border-radius: 5px;
      }
      
      ::-webkit-scrollbar-thumb:hover {
        background: linear-gradient(180deg, #dc2626 0%, #1e3a8a 100%);
      }
      
      /* Login page customization */
      [class*="UnauthenticatedLayout"] {
        background: linear-gradient(135deg, #fef2f2 0%, #dbeafe 50%, #f0f9ff 100%);
        background-size: 400% 400%;
        animation: gradientShift 15s ease infinite;
      }
      
      @keyframes gradientShift {
        0%, 100% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
      }
      
      /* Login form styling */
      [class*="AuthPage"] [class*="Box"] {
        box-shadow: 0 20px 50px -12px rgba(0, 0, 0, 0.25);
        border: 1px solid rgba(239, 68, 68, 0.1);
      }
      
      /* Header logo area */
      [class*="MainNav"] [class*="Logo"] img {
        filter: drop-shadow(2px 2px 4px rgba(239, 68, 68, 0.2));
      }
      
      /* Success messages */
      [class*="alert-success"] {
        background: linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%);
        border-left: 4px solid #22c55e;
      }
      
      /* Error messages */
      [class*="alert-danger"] {
        background: linear-gradient(135deg, #fee2e2 0%, #fecaca 100%);
        border-left: 4px solid #ef4444;
      }
      
      /* Table row hover */
      [class*="Tbody"] [class*="Tr"]:hover {
        background: linear-gradient(90deg, #fef2f2 0%, #ffffff 100%);
        transform: scale(1.005);
        transition: all 0.2s ease;
      }
      
      /* Active navigation items */
      [class*="NavLink"][aria-current="page"] {
        background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
        box-shadow: 0 4px 12px rgba(239, 68, 68, 0.3);
      }
      
      /* Excel Import Button Styles */
      .excel-import-container {
        margin: 12px 0;
        padding: 16px;
        background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%);
        border: 2px dashed #22c55e;
        border-radius: 8px;
        text-align: center;
      }
      
      .excel-import-btn {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        padding: 12px 24px;
        background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%);
        color: white;
        border: none;
        border-radius: 8px;
        font-size: 14px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.2s ease;
        box-shadow: 0 4px 6px rgba(34, 197, 94, 0.3);
      }
      
      .excel-import-btn:hover {
        background: linear-gradient(135deg, #16a34a 0%, #15803d 100%);
        transform: translateY(-2px);
        box-shadow: 0 6px 12px rgba(34, 197, 94, 0.4);
      }
      
      .excel-import-btn svg {
        width: 20px;
        height: 20px;
      }
      
      .excel-import-input {
        display: none;
      }
      
      .excel-import-info {
        margin-top: 8px;
        font-size: 12px;
        color: #6b7280;
      }
      
      .table-preview {
        margin-top: 16px;
        padding: 12px;
        background: white;
        border-radius: 6px;
        border: 1px solid #e5e7eb;
        max-height: 200px;
        overflow: auto;
      }
      
      .table-preview table {
        width: 100%;
        border-collapse: collapse;
        font-size: 12px;
      }
      
      .table-preview th,
      .table-preview td {
        padding: 6px 10px;
        border: 1px solid #e5e7eb;
        text-align: left;
      }
      
      .table-preview th {
        background: #f9fafb;
        font-weight: 600;
      }
      
      .table-preview-label {
        font-size: 11px;
        color: #16a34a;
        font-weight: 600;
        margin-bottom: 8px;
        display: block;
      }
    `;
    document.head.appendChild(style);
    
    // Inject Excel import functionality for tableData JSON fields
    injectExcelImportForTableData();
    
    console.log('🏆 Sports Holics CMS Admin Panel Loaded!');
  },
};

/**
 * Inject Excel import UI for tableData JSON fields
 */
function injectExcelImportForTableData() {
  // Wait for DOM to be ready
  setTimeout(() => {
    const observer = new MutationObserver(() => {
      findTableDataFields();
    });
    
    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
    
    // Run immediately and periodically
    findTableDataFields();
    setInterval(findTableDataFields, 1500);
  }, 500);
}

function findTableDataFields() {
  // Method 1: Find labels containing "tableData" (case insensitive)
  const allLabels = document.querySelectorAll('label, span');
  
  allLabels.forEach((label) => {
    const labelText = label.textContent?.trim() || '';
    // Match "tableData" or "tabledata" with optional asterisk for required
    if (!labelText.match(/^tabledata\*?$/i)) return;
    
    injectImportUI(label as HTMLElement);
  });
  
  // Method 2: Find JSON editors (CodeMirror or Monaco) within Table components
  // Look for the Table component header and find JSON fields within it
  const tableHeaders = document.querySelectorAll('[class*="Component"]');
  tableHeaders.forEach((header) => {
    if (!header.textContent?.includes('Table')) return;
    
    // Find code editors within this component
    const codeEditors = header.querySelectorAll('.cm-editor, [class*="CodeMirror"], [class*="monaco"]');
    codeEditors.forEach((editor) => {
      const container = editor.closest('[class*="Field"]') || editor.parentElement?.parentElement;
      if (container && !container.querySelector('.excel-import-container')) {
        // Find the label for this field
        const fieldLabel = container.querySelector('label, span');
        if (fieldLabel) {
          injectImportUI(fieldLabel as HTMLElement);
        }
      }
    });
  });
}

function injectImportUI(label: HTMLElement) {
  // Find the parent field container
  let fieldContainer = label.closest('[class*="Field"]');
  if (!fieldContainer) {
    fieldContainer = label.parentElement?.parentElement || label.parentElement;
  }
  if (!fieldContainer) return;
  
  // Check if we already added the import UI
  if (fieldContainer.querySelector('.excel-import-container')) return;
  
  // Find the JSON editor - could be textarea, CodeMirror, or other
  const jsonInput = fieldContainer.querySelector('textarea, .cm-content, [contenteditable="true"]') as HTMLElement | null;
  
  // Create the import UI
  const importContainer = document.createElement('div');
  importContainer.className = 'excel-import-container';
  importContainer.innerHTML = `
    <button type="button" class="excel-import-btn">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
      📊 Επιλογή αρχείου Excel/CSV
    </button>
    <input type="file" class="excel-import-input" accept=".csv,.xlsx,.xls" />
    <div class="excel-import-info">
      Υποστηριζόμενες μορφές: .xlsx, .xls, .csv<br>
      Η πρώτη γραμμή θα χρησιμοποιηθεί ως επικεφαλίδες στηλών
    </div>
    <div class="table-preview" style="display: none;"></div>
  `;
  
  // Insert after the label
  if (label.parentElement) {
    label.parentElement.insertBefore(importContainer, label.nextSibling);
  } else {
    fieldContainer.insertBefore(importContainer, fieldContainer.firstChild);
  }
  
  // Get elements
  const importBtn = importContainer.querySelector('.excel-import-btn') as HTMLButtonElement;
  const fileInput = importContainer.querySelector('.excel-import-input') as HTMLInputElement;
  const previewDiv = importContainer.querySelector('.table-preview') as HTMLDivElement;
  
  // Handle button click
  importBtn.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    fileInput.click();
  });
  
  // Handle file selection
  fileInput.addEventListener('change', (e) => {
    const file = (e.target as HTMLInputElement).files?.[0];
    if (!file) return;
    
    // Find the actual input element for this field
    const actualInput = fieldContainer!.querySelector('textarea, .cm-content') as HTMLElement | null;
    processExcelFile(file, actualInput, previewDiv, fieldContainer as HTMLElement);
    fileInput.value = '';
  });
  
  console.log('📊 Excel import UI injected for tableData field');
}

/**
 * Process Excel/CSV file and populate the JSON field
 */
function processExcelFile(file: File, jsonInput: HTMLElement | null, previewDiv: HTMLDivElement, fieldContainer: HTMLElement) {
  const reader = new FileReader();
  
  reader.onload = (e) => {
    try {
      const data = e.target?.result;
      const workbook = XLSX.read(data, { type: 'binary' });
      
      // Get first sheet
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      
      // Convert to array of arrays
      const jsonData: (string | number | boolean)[][] = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
      
      if (jsonData.length === 0) {
        alert('❌ Το αρχείο είναι κενό');
        return;
      }
      
      // First row is headers, rest are data rows
      const headers = jsonData[0].map(h => String(h || '').trim());
      const rows = jsonData.slice(1)
        .filter(row => row.some(cell => cell !== undefined && cell !== ''))
        .map(row => headers.map((_, i) => String(row[i] || '').trim()));
      
      // Create the table data structure
      const tableData = {
        headers: headers,
        rows: rows
      };
      
      // Set the JSON value
      const jsonString = JSON.stringify(tableData, null, 2);
      
      // Try different methods to set the value
      if (jsonInput) {
        if (jsonInput instanceof HTMLTextAreaElement) {
          jsonInput.value = jsonString;
          jsonInput.dispatchEvent(new Event('input', { bubbles: true }));
          jsonInput.dispatchEvent(new Event('change', { bubbles: true }));
          jsonInput.dispatchEvent(new Event('blur', { bubbles: true }));
        } else if (jsonInput.classList.contains('cm-content')) {
          // CodeMirror editor - try to set content
          jsonInput.textContent = jsonString;
          jsonInput.dispatchEvent(new Event('input', { bubbles: true }));
        }
      }
      
      // Also try to find and update any hidden textarea in the field
      const hiddenTextarea = fieldContainer.querySelector('textarea');
      if (hiddenTextarea) {
        hiddenTextarea.value = jsonString;
        hiddenTextarea.dispatchEvent(new Event('input', { bubbles: true }));
        hiddenTextarea.dispatchEvent(new Event('change', { bubbles: true }));
      }
      
      // Show preview
      showTablePreview(previewDiv, headers, rows);
      
      // Copy to clipboard as backup
      navigator.clipboard.writeText(jsonString).then(() => {
        console.log('📋 JSON copied to clipboard as backup');
      }).catch(() => {});
      
      console.log('✅ Table data imported:', tableData);
      
      // Show success message with instructions
      alert(`✅ Εισαγωγή επιτυχής!\n\n${headers.length} στήλες, ${rows.length} γραμμές\n\nΤα δεδομένα έχουν αντιγραφεί στο clipboard.\nΑν δεν εμφανιστούν αυτόματα, κάντε Ctrl+V στο πεδίο JSON.`);
      
    } catch (error) {
      console.error('Import error:', error);
      alert('❌ Σφάλμα κατά την εισαγωγή του αρχείου');
    }
  };
  
  reader.readAsBinaryString(file);
}

/**
 * Show a preview of the imported table
 */
function showTablePreview(previewDiv: HTMLDivElement, headers: string[], rows: string[][]) {
  const maxRows = 5;
  const displayRows = rows.slice(0, maxRows);
  const hasMore = rows.length > maxRows;
  
  let html = `
    <span class="table-preview-label">✅ Εισαγωγή επιτυχής! (${headers.length} στήλες, ${rows.length} γραμμές)</span>
    <table>
      <thead>
        <tr>${headers.map(h => `<th>${escapeHtml(h)}</th>`).join('')}</tr>
      </thead>
      <tbody>
        ${displayRows.map(row => `<tr>${row.map(cell => `<td>${escapeHtml(cell)}</td>`).join('')}</tr>`).join('')}
        ${hasMore ? `<tr><td colspan="${headers.length}" style="text-align:center;color:#6b7280;">... και ${rows.length - maxRows} ακόμη γραμμές</td></tr>` : ''}
      </tbody>
    </table>
  `;
  
  previewDiv.innerHTML = html;
  previewDiv.style.display = 'block';
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
