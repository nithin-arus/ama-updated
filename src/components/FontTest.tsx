'use client';

/**
 * Font test component to verify Geist font is applied correctly
 * This component can be temporarily added to test font rendering
 */

export function FontTest() {
  return (
    <div className="p-4 bg-white border rounded-lg shadow-sm">
      <h1 className="text-4xl font-bold mb-4">Geist Font Test</h1>
      <h2 className="text-2xl font-semibold mb-3">Headings</h2>
      <h3 className="text-xl font-medium mb-2">Subheadings</h3>
      <p className="text-base mb-4">
        This is a paragraph with regular text to test the Geist font family. 
        The font should be clean, modern, and highly readable.
      </p>
      <p className="text-sm text-gray-600 mb-4">
        Small text for captions and secondary information.
      </p>
      <div className="font-mono text-sm bg-gray-100 p-2 rounded">
        Monospace text: const geist = 'beautiful';
      </div>
      <div className="mt-4 text-xs text-gray-500">
        Font family: Geist Sans (primary), Geist Mono (monospace)
      </div>
    </div>
  );
}
