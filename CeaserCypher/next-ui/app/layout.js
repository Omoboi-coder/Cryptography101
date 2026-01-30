import './globals.css';

export const metadata = {
  title: 'Caesar Cipher - Encrypt & Decrypt',
  description: 'A simple tool to encrypt and decrypt messages using the Caesar cipher',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
