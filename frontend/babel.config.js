module.exports = {
    presets: [
      ['@babel/preset-env', { targets: { node: 'current' } }],  // For current Node version
      '@babel/preset-typescript',  // For TypeScript
      '@babel/preset-react'  // For React, if you're using it
    ],
    plugins: [
      '@babel/plugin-transform-runtime'  // Helps with async/await
    ]
  };
  