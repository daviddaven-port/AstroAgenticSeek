# Security Documentation - WesternOS

## Overview

WesternOS is designed with security in mind, implementing multiple layers of protection against common web vulnerabilities including XSS, clickjacking, and memory leaks.

## Browser Security (Wild West Component)

### Iframe Sandboxing

The Wild West browser component uses an iframe with the following sandbox attributes:

```html
<iframe sandbox="allow-scripts allow-same-origin allow-forms" />
```

**What this protects against:**
- ✅ Prevents iframe from accessing parent window
- ✅ Blocks automatic downloads
- ✅ Prevents popup windows
- ✅ Blocks plugin execution
- ✅ Prevents top-level navigation

**What is allowed (necessary for functionality):**
- ⚠️ JavaScript execution (required for modern websites)
- ⚠️ Same-origin requests (required for choppd.beauty functionality)
- ⚠️ Form submissions (required for interactive sites)

### URL Input Sanitization

**Current Implementation:**
- URL input is controlled via React state
- No direct DOM manipulation
- React automatically escapes HTML entities

**Recommendations for Production:**
- Implement URL whitelist for allowed domains
- Add protocol validation (only https://)
- Consider adding URL reputation checking
- Log all navigation attempts for security monitoring

### Content Security Policy (CSP)

**Recommended CSP Headers:**

```
Content-Security-Policy: 
  default-src 'self';
  script-src 'self' 'unsafe-inline';
  style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
  img-src 'self' data: https:;
  font-src 'self' https://fonts.gstatic.com;
  frame-src https://choppd.beauty;
  connect-src 'self' https://choppd.beauty;
```

**To implement:** Add these headers in your hosting configuration (Vercel, Netlify, etc.)

## XSS Prevention

### Input Validation

All user inputs are handled through React's controlled components:

1. **URL Bar** - React state management prevents direct HTML injection
2. **Terminal Input** - Command parsing with whitelist approach
3. **Text Editor** - Content stored in state, not rendered as HTML

### Output Encoding

- React automatically escapes all text content
- No use of `dangerouslySetInnerHTML`
- All dynamic content rendered through JSX

### Recommendations

- Never use `eval()` or `Function()` constructors
- Validate all user input on both client and server
- Use TypeScript for type safety
- Regular dependency audits with `npm audit`

## Memory Leak Prevention

### React Best Practices Implemented

1. **Event Listeners**
   - All event listeners are React-managed
   - Automatic cleanup on component unmount
   - No manual `addEventListener` calls

2. **Timers**
   ```tsx
   useEffect(() => {
     const timer = setInterval(() => setTime(new Date()), 1000);
     return () => clearInterval(timer); // Cleanup
   }, []);
   ```

3. **State Management**
   - Local state for component-specific data
   - No global mutable state
   - Proper dependency arrays in useEffect

### Monitoring for Memory Leaks

**Manual Testing:**
1. Open Chrome DevTools → Memory tab
2. Take heap snapshot
3. Perform actions (open/close windows)
4. Take another snapshot
5. Compare for retained objects

**Automated Testing (Future):**
- Consider adding Puppeteer tests with memory profiling
- Set up CI/CD memory regression tests

## Clickjacking Protection

### X-Frame-Options

**Recommended Header:**
```
X-Frame-Options: DENY
```

This prevents WesternOS from being embedded in an iframe on other sites.

**Note:** This doesn't affect the Wild West browser's iframe (internal to the app).

## Data Storage Security

### Current Implementation

- No persistent storage currently implemented
- All data stored in React state (memory only)
- Data cleared on page refresh

### Future Considerations

If implementing localStorage/sessionStorage:
- Encrypt sensitive data before storage
- Never store tokens or credentials
- Implement data expiration
- Clear storage on logout

## Dependency Security

### Current Dependencies

Key security-relevant packages:
- `react` - UI framework (regularly updated)
- `react-draggable` - Window dragging (audit for DOM manipulation)
- `astro` - Build framework (server-side rendering)

### Security Practices

1. **Regular Updates**
   ```bash
   npm audit
   npm audit fix
   ```

2. **Dependency Review**
   - Review package permissions
   - Check for known vulnerabilities
   - Prefer well-maintained packages

3. **Lock Files**
   - Commit `package-lock.json`
   - Ensures consistent builds
   - Prevents supply chain attacks

## Agent Workbench Security

### Integration Points

The `agent-workbench-hook` div is designed for external agent integration:

```html
<div id="agent-workbench-hook" className="flex-1 p-4 overflow-auto">
  <!-- External agents inject here -->
</div>
```

### Security Considerations

1. **Sandboxing**
   - Consider using Shadow DOM for isolation
   - Validate all messages from external agents
   - Implement message authentication

2. **Permissions**
   - Limit agent capabilities
   - Implement permission system
   - Log all agent actions

3. **Communication**
   - Use postMessage for cross-origin communication
   - Validate message origins
   - Implement message signing

## Reporting Security Issues

If you discover a security vulnerability:

1. **DO NOT** open a public GitHub issue
2. Email security concerns to: [your-email]
3. Include:
   - Description of the vulnerability
   - Steps to reproduce
   - Potential impact
   - Suggested fix (if any)

## Security Checklist for Deployment

- [ ] Enable HTTPS only
- [ ] Configure CSP headers
- [ ] Set X-Frame-Options header
- [ ] Set X-Content-Type-Options: nosniff
- [ ] Enable HSTS (HTTP Strict Transport Security)
- [ ] Configure CORS properly
- [ ] Remove console.log statements
- [ ] Minify and obfuscate code
- [ ] Regular dependency updates
- [ ] Security audit before major releases

## Additional Resources

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [React Security Best Practices](https://react.dev/learn/security)
- [MDN Web Security](https://developer.mozilla.org/en-US/docs/Web/Security)
- [Content Security Policy Reference](https://content-security-policy.com/)
