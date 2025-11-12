/**
 * Trusted Types Policy Implementation
 * P0 Security Requirement: Enforces CSP require-trusted-types-for 'script'
 *
 * This policy provides secure wrappers for DOM manipulation APIs
 * that could be exploited for XSS attacks (innerHTML, eval, etc.)
 */

// Declare Trusted Types interfaces (for TypeScript)
declare global {
  interface Window {
    trustedTypes?: {
      createPolicy: (
        name: string,
        rules: TrustedTypePolicyOptions
      ) => TrustedTypePolicy;
      defaultPolicy?: TrustedTypePolicy;
    };
  }

  interface TrustedTypePolicyOptions {
    createHTML?: (input: string) => string;
    createScript?: (input: string) => string;
    createScriptURL?: (input: string) => string;
  }

  interface TrustedTypePolicy {
    createHTML: (input: string) => TrustedHTML;
    createScript: (input: string) => TrustedScript;
    createScriptURL: (input: string) => TrustedScriptURL;
  }

  type TrustedHTML = { __brand: 'TrustedHTML' } & string;
  type TrustedScript = { __brand: 'TrustedScript' } & string;
  type TrustedScriptURL = { __brand: 'TrustedScriptURL' } & string;
}

/**
 * Creates the default Trusted Types policy
 *
 * Policy Rules:
 * - createHTML: Sanitizes HTML input (blocks <script>, on* attributes)
 * - createScript: Allows only safe scripts (no eval, Function constructor)
 * - createScriptURL: Allows only same-origin script URLs
 */
export function createTrustedTypesPolicy(): TrustedTypePolicy | null {
  if (!window.trustedTypes) {
    console.warn('Trusted Types not supported in this browser');
    return null;
  }

  // Check if policy already exists
  if (window.trustedTypes.defaultPolicy) {
    return window.trustedTypes.defaultPolicy;
  }

  try {
    return window.trustedTypes.createPolicy('default', {
      createHTML: (input: string): string => {
        // Sanitize HTML: Remove dangerous elements and attributes
        // For production, consider using DOMPurify or similar
        const dangerous = /<script|on\w+\s*=/gi;

        if (dangerous.test(input)) {
          console.error('Trusted Types: Blocked dangerous HTML:', input);
          return '';
        }

        return input;
      },

      createScript: (input: string): string => {
        // For static site, we shouldn't dynamically create scripts
        // Block eval, Function, and other dangerous patterns
        const dangerous = /eval\(|Function\(|import\(/gi;

        if (dangerous.test(input)) {
          console.error('Trusted Types: Blocked dangerous script:', input);
          return '';
        }

        return input;
      },

      createScriptURL: (input: string): string => {
        // Only allow same-origin scripts (self-hosted)
        const url = new URL(input, window.location.origin);

        if (url.origin !== window.location.origin) {
          console.error('Trusted Types: Blocked external script URL:', input);
          return '';
        }

        return input;
      },
    });
  } catch (error) {
    console.error('Failed to create Trusted Types policy:', error);
    return null;
  }
}

/**
 * Safe wrapper for setting innerHTML with Trusted Types
 */
export function safeSetInnerHTML(
  element: Element,
  html: string,
  policy: TrustedTypePolicy | null
): void {
  if (policy && window.trustedTypes) {
    element.innerHTML = policy.createHTML(html) as unknown as string;
  } else {
    // Fallback for browsers without Trusted Types
    element.innerHTML = html;
  }
}

/**
 * Safe wrapper for eval-like operations (should be avoided)
 */
export function safeEval(
  code: string,
  policy: TrustedTypePolicy | null
): unknown {
  if (policy && window.trustedTypes) {
    // Still discouraged, but if absolutely necessary:
    return eval(policy.createScript(code) as unknown as string);
  } else {
    throw new Error('Trusted Types: eval() is blocked by policy');
  }
}

/**
 * Initialize Trusted Types policy on page load
 * This should be called as early as possible
 */
export function initTrustedTypes(): TrustedTypePolicy | null {
  if (typeof window === 'undefined') {
    return null;
  }

  return createTrustedTypesPolicy();
}

// Auto-initialize if this module is imported
let globalPolicy: TrustedTypePolicy | null = null;

if (typeof window !== 'undefined') {
  globalPolicy = initTrustedTypes();
}

export { globalPolicy };
