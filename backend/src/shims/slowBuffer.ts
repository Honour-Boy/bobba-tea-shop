// Node >= 24 removed `buffer.SlowBuffer`, but some old transitive dependencies
// (e.g. buffer-equal-constant-time, pulled in by jsonwebtoken) still read
// `require("buffer").SlowBuffer.prototype` at load time and crash without it.
// SlowBuffer was always just an unpooled Buffer, so aliasing it to Buffer is safe.
//
// Use `import = require` so we mutate the real cached `buffer` module object
// rather than an esModuleInterop namespace copy.
import buffer = require("buffer");

const bufferModule = buffer as unknown as { SlowBuffer?: unknown; Buffer: unknown };
if (typeof bufferModule.SlowBuffer === "undefined") {
    bufferModule.SlowBuffer = bufferModule.Buffer;
}
