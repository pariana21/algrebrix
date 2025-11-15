import fetch from 'node-fetch';

const API_BASE = 'http://localhost:3000';

async function testChat() {
  console.log('🧪 Testing Chat Endpoint...');

  try {
    const response = await fetch(`${API_BASE}/api/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: 'What is 5 + 3?',
        history: []
      })
    });

    const data = await response.json();

    if (data.success) {
      console.log('✅ Chat test passed!');
      console.log('Response:', data.response.substring(0, 100) + '...');
    } else {
      console.log('❌ Chat test failed:', data.error);
    }
  } catch (error) {
    console.log('❌ Chat test error:', error.message);
  }

  console.log('');
}

async function testAgent() {
  console.log('🧪 Testing Agent Endpoint...');
  console.log('⏱️  This may take 20-40 seconds...\n');

  try {
    const response = await fetch(`${API_BASE}/api/agent`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        topic: 'best budget laptops 2025'
      })
    });

    const data = await response.json();

    if (data.success) {
      console.log('✅ Agent test passed!');
      console.log('Summary:', data.summary.substring(0, 150) + '...');
      console.log('Results count:', data.results.length);
      console.log('CSV URL:', data.csvUrl);
      console.log('\nFirst result:');
      console.log('  URL:', data.results[0].url);
      console.log('  Title:', data.results[0].title);
      console.log('  Excerpt:', data.results[0].excerpt.substring(0, 100) + '...');
    } else {
      console.log('❌ Agent test failed:', data.error);
    }
  } catch (error) {
    console.log('❌ Agent test error:', error.message);
  }

  console.log('');
}

async function runTests() {
  console.log('🚀 Algebrix.ai Beta - API Test Suite\n');
  console.log('Make sure the server is running on port 3000!\n');

  await testChat();
  await testAgent();

  console.log('✨ Tests complete!');
}

runTests();
