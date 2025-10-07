#!/usr/bin/env node

/**
 * Test setup script for AMA Career Platform
 * Sets up demo environment variables and runs basic tests
 */

const fs = require('fs');
const path = require('path');

console.log('🧪 Setting up AMA Career Platform test environment...');

// Create .env.local with demo values
const envContent = `# AMA Career Platform - Demo Environment
NEXT_PUBLIC_SUPABASE_URL=http://localhost:54321
NEXT_PUBLIC_SUPABASE_ANON_KEY=demo_key
ULTRAVOX_API_KEY=demo_key
PPLX_API_KEY=demo_key
`;

const envPath = path.join(process.cwd(), '.env.local');

try {
  fs.writeFileSync(envPath, envContent);
  console.log('✅ Created .env.local with demo values');
} catch (error) {
  console.log('⚠️  Could not create .env.local:', error.message);
}

// Check if dependencies are installed
const packageJsonPath = path.join(process.cwd(), 'package.json');
const nodeModulesPath = path.join(process.cwd(), 'node_modules');

if (fs.existsSync(packageJsonPath) && fs.existsSync(nodeModulesPath)) {
  console.log('✅ Dependencies are installed');
} else {
  console.log('❌ Dependencies not found. Run: pnpm install');
}

// Check for required files
const requiredFiles = [
  'src/lib/mock-clients.ts',
  'src/lib/test-runner.ts',
  'src/components/TestPanel.tsx',
  'TESTING_GUIDE.md'
];

let allFilesExist = true;
requiredFiles.forEach(file => {
  const filePath = path.join(process.cwd(), file);
  if (fs.existsSync(filePath)) {
    console.log(`✅ ${file} exists`);
  } else {
    console.log(`❌ ${file} missing`);
    allFilesExist = false;
  }
});

if (allFilesExist) {
  console.log('\n🎉 Test environment setup complete!');
  console.log('\nNext steps:');
  console.log('1. Run: pnpm dev');
  console.log('2. Open: http://localhost:3000');
  console.log('3. Click the "🧪 Run Tests" button in the bottom-right corner');
  console.log('4. Follow the TESTING_GUIDE.md for comprehensive testing');
} else {
  console.log('\n❌ Some required files are missing. Please check the setup.');
}

console.log('\n📚 For detailed testing instructions, see TESTING_GUIDE.md');
