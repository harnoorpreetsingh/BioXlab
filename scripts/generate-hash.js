const bcrypt = require('bcryptjs');

async function generateHash() {
  const password = 'admin123';
  const hash = await bcrypt.hash(password, 10);
  console.log('\n=== Password Hash Generator ===');
  console.log('Password:', password);
  console.log('Hash:', hash);
  console.log('\n=== Verification ===');
  const isValid = await bcrypt.compare(password, hash);
  console.log('Verification result:', isValid);
  console.log('\n=== SQL UPDATE ===');
  console.log(`UPDATE users SET password = '${hash}' WHERE email = 'admin@bioxlab.com';`);
}

generateHash();
